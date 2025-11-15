import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import('./pages/home'));
const AboutPage = lazy(() => import('./pages/about'));
const ProductPage = lazy(() => import('./pages/product'));
const ContactPage= lazy(() => import('./pages/contact'));
const ServicePage = lazy(() => import('./pages/service'));


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<>Loading...</>}>
          <HomePage/>
        </Suspense>
      }/>

      <Route path="/about" element={
        <Suspense fallback={<>Loading...</>}>
          <AboutPage/>
        </Suspense>
      }/>

      <Route path="/service" element={
        <Suspense fallback={<>Loading...</>}>
          <ServicePage/>
        </Suspense>
      }/>

       <Route path="/product" element={
        <Suspense fallback={<>Loading...</>}>
          <ContactPage/>
        </Suspense>
      }/>

       <Route path="/contact" element={
        <Suspense fallback={<>Loading...</>}>
          <ProductPage/>
        </Suspense>
      }/>
    </Routes>
    </>
  )
}

export default App
