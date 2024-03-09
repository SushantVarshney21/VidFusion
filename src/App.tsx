import React, { useEffect, useState } from "react";
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import "@elastic/eui/dist/eui_theme_dark.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./app/hooks";
import CreateMeeting from "./pages/CreateMeeting";

const App = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoom360) => zoom360.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("dark");
  const [isInitialTheme, setIsInitialTheme] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("zoom360-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom360-theme", "dark");
    }
  }, []);

  useEffect(() => {
    if (isInitialTheme) {
      setIsInitialTheme(false);
    } else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };
  return (
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting/>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
  );
};

export default App;
