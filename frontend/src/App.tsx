import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";
import Header from "./Components/Header";
import { useUpdateImageItems } from "./hooks/useUpdateImageItems";
import LoadingPage from "./Components/LoadingPage";

const lazyLoader = (path: string) => React.lazy(() => import(path));

const AboutPage = lazyLoader("./Pages/AboutPage");
const ContentPage = lazyLoader("./Pages/ContentPage");
const UploadPage = lazyLoader("./Pages/UploadPage");
const UpdatePage = lazyLoader("./Pages/UpdatePage");
const HomePage = lazyLoader("./Pages/HomePage");

function App() {
  const updateImageItems = useUpdateImageItems();

  useEffect(() => {
    updateImageItems();
  }, [updateImageItems]);

  return (
    <BrowserRouter>

      <div className={classes["column-wrapper"]}>
        <div className={classes.column}>
          <Header />

          <Routes>
            <Route element={<Suspense><HomePage /></Suspense>} path="/" />

            <Route element={<Suspense fallback={<LoadingPage />}><AboutPage /></Suspense>} path="/about" />
            <Route element={<Suspense fallback={<LoadingPage />}><ContentPage /></Suspense>} path="/views/*" />
            <Route element={<Suspense fallback={<LoadingPage />}><UploadPage /></Suspense>} path="/upload" />
            <Route element={<Suspense fallback={<LoadingPage />}><UpdatePage /></Suspense>} path="/update" />
          </Routes>
        </div>

      </div>

    </BrowserRouter>
  )
}

export default App
