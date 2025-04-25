import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Failed to fetch weather data, please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        {/* <div>favorite button</div> */}
      </div>

      {/* Current and Hourly Weather */}
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* current weather */}
          <CurrentWeather data={weatherQuery.data} />
          {/* hourly temp */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md: grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
