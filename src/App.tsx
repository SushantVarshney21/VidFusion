import React, { useEffect, useState } from "react";
import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./app/hooks";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import ThemeSelector from "./components/ThemeSelector";
import { setToasts } from "./app/slices/MeetingSlice";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";

const App = () => {
  const toasts = useAppSelector((zoom360)=>zoom360.meetings.toasts)
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

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting/>} />
          <Route path="/create1on1" element={<OneOnOneMeeting/>} />
          <Route path="/videoconference" element={<VideoConference/>} />
          <Route path="/mymeeting" element={<MyMeetings/>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />

      </EuiThemeProvider>
    </EuiProvider>
    </ThemeSelector>
  );
};

export default App;
