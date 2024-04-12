import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { changeTheme, setUser } from "../app/slices/AuthSlice";
import useAuth from "../hooks/useAuth";

const Header = () => { 
  useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const username = useAppSelector((zoom360)=>zoom360.auth.userInfo?.name); 
  const [breadcrumbs, setBreadCrumbs] = useState([
    {
      text: "Dashboard",
      href: "#",
      onclick: () => {
        navigate("/");
      },
    },
  ]);
  const [isResponsive, setIsResponsive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/create") {
      setBreadCrumbs([
        {
          text: "Dashboard",
          href: "/",
          onclick: () => {
            navigate("/");
          },
        },
        {
          text: "Create Meeting",
          href: "",
          onclick: () => {
            navigate("");
          },
        },
      ]);
    }
    if (pathname === "/create1on1") {
      setBreadCrumbs([
        {
          text: "Dashboard",
          href: "/",
          onclick: () => {
            navigate("/");
          },
        },
        {
          text: "Create Meeting",
          href: "/create",
          onclick: () => {
            navigate("/create");
          },
        },
        {
          text: "Create 1 on 1 meeting",
          href: "",
          onclick: () => {
            navigate("");
          },
        },
      ]);
    }
    if (pathname === "/videoconference") {
      setBreadCrumbs([
        {
          text: "Dashboard",
          href: "/",
          onclick: () => {
            navigate("/");
          },
        },
        {
          text: "Create Meeting",
          href: "/create",
          onclick: () => {
            navigate("/create");
          },
        },
        {
          text: "Create video conference",
          href: "",
          onclick: () => {
            navigate("");
          },
        },
      ]);
    }
    if (pathname === "/mymeeting") {
      setBreadCrumbs([
        {
          text: "Dashboard",
          href: "/",
          onclick: () => {
            navigate("/");
          },
        },
        {
          text: "My Meetings",
          href: "",
          onclick: () => {
            navigate("");
          },
        },
      ]);
    }
    if (pathname === "/meeting") {
      setBreadCrumbs([
        {
          text: "Dashboard",
          href: "/",
          onclick: () => {
            navigate("/");
          },
        },
        {
          text: "Meeting",
          href: "",
          onclick: () => {
            navigate("");
          },
        },
      ]);
    }
  }, [location, navigate]);




 

  const isDarkTheme = useAppSelector((zoom360) => zoom360.auth.isDarkTheme);

  const logout = () => {
    signOut(firebaseAuth);
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
 
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom360-theme");
    localStorage.setItem("zoom360-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
    console.log(changeTheme);
  };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor style={{fontFamily:"monospace"}} color="#0b5cff">VidFusion</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello,</EuiTextColor>
                <EuiTextColor color="#0b5cff"> {username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {localStorage.getItem("zoom360-theme") == "dark" ? (
              <EuiButtonIcon
                iconType="sun"
                onClick={invertTheme}
                display="fill"
                size="s"
                color="warning"
                aria-label="invert-theme-button"
              />
            ) : (
              <EuiButtonIcon
                iconType="moon"
                onClick={invertTheme}
                display="fill"
                size="s"
                style={{ color: "black", backgroundColor: "white" }}
                aria-label="invert-theme-button"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              iconType="lock"
              onClick={logout}
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor style={{fontSize:"15px"}} color="#0b5cff">VidFusion</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor style={{fontSize:"15px"}} color="#0b5cff"> {username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {localStorage.getItem("zoom360-theme") == "dark" ? (
              <EuiButtonIcon
                iconType="sun"
                onClick={invertTheme}
                display="fill"
                size="s"
                color="warning"
                aria-label="invert-theme-button"
                style={{width:"20px" }}
              />
            ) : (
              <EuiButtonIcon
                iconType="moon"
                onClick={invertTheme}
                display="fill"
                size="s"
                style={{ color: "black", backgroundColor: "white", width:"20px" }}
                aria-label="invert-theme-button"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              iconType="lock"
              onClick={logout}
              display="fill"
              size="s"
              aria-label="logout-button"
              style={{width:"25px"}}
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 520) {
      setIsResponsive(true);
    }
  });
  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[{ breadcrumbs: breadcrumbs }]}
      />
    </>
  );
};

export default Header;
