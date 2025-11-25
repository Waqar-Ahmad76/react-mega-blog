import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components/index.js";
import { Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // checking whether user is logged in on pag load
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(userData);
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block ">
        <Header />
        <main>TODO: {/* <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}
