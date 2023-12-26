import { useState, useEffect, useContext } from "react";
import PageScroll from "react-page-scroll";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./App.css";
import Footer from "./components/footer/Footer";
import Loader from "./components/loader/Loader";

import Navbar from "./components/navbar/Navbar";
import RunningText from "./components/runningText/RunningText ";
import { pageContext } from "./contexts/PageContext/PageContext";
import MainRoutes from "./routes/Routes";

function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userScrollEnabled, setUserScrollEnabled] = useState(true);

  const [isHomePage, setIsHomePage] = useState(false);

  const { main } = useContext(pageContext);

  // Добавьте состояние для отслеживания, разрешен ли пользовательский скролл

  const [loaderVisible, setLoaderVisible] = useState(true);
  const [firstMount] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the loader for 1500ms and then hide it
    setLoaderVisible(true);
    const loaderTimeout = setTimeout(() => {
      setLoaderVisible(false);
    }, 6000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(loaderTimeout);
  }, []);

  return (
    <>
      {!loaderVisible ? (
        <>
          <Navbar />
          <ScrollRestoration />
          <MainRoutes />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
