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
import { getCreateMeetingBreadCrumbs } from "../utils/breadCrumbs";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("name");
  const [breadcrumbs, setBreadCrumbs] = useState([{ text: "Dashboard" }]);
  const [isResponsive, setIsResponsive] = useState(false);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   const {pathname}= location;
  //  if (pathname === "/create")
  //   setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));

  // },[location,navigate])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      const serializedUser = JSON.stringify(currentUser?.displayName);
      localStorage.setItem("name", serializedUser);
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const isDarkTheme = useAppSelector((zoom360) => zoom360.auth.isDarkTheme);

  const logout = () => {
    signOut(firebaseAuth);
    localStorage.removeItem("name");
    if (localStorage.getItem("zoom360-theme") == "light") {
      localStorage.removeItem("zoom360-theme");
    }
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
              <EuiTextColor color="#0b5cff">Zoom360</EuiTextColor>
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
              <EuiTextColor color="#0b5cff">Zoom360</EuiTextColor>
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

  useEffect(() => {
    if (window.innerWidth < 480) {
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
