import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import logo2 from "../../public/logo2.png";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img src={isDarkMode ? logo : logo2} alt="logo" className="h-14" />
        </Link>
        <div className="flex gap-4">
          {/* Search */}
          <CitySearch />
          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDarkMode ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
