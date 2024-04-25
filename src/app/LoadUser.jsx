"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { setUser, clearUser } from "../store/reducer/auth/login";

function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    function checkUser() {
      const userCookie = getCookie("user");
      if (userCookie) {
        const user = JSON.parse(userCookie);
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    }
    checkUser();

    const interval = setInterval(checkUser, 1500);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}

export default LoadUser;
