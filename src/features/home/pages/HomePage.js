import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../../../slices/authentication";
import Home from "../components/Home";

export default function HomePage() {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutSuccess())
    localStorage.removeItem('auth-token')
  }
  return (
    <>
      <Home></Home>
      <Link to="/auth/login">Login
      </Link>
      <Button onClick={logout} variant="contained" color="secondary">Log out</Button>
    </>
  );
}
