import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/admin-layout";

const HomePage = lazy(() => import('./pages/home'));
const AboutPage = lazy(() => import('./pages/about'));
const ProductPage = lazy(() => import('./pages/product'));
const ContactPage= lazy(() => import('./pages/contact'));
const ServicePage = lazy(() => import('./pages/service'));

// admin 
const AdminPage = lazy(() => import('./pages/admin/admin-home'));
const AdminProducts = lazy(() => import('./pages/admin/admin-products'));
const AdminCategories = lazy(() => import('./pages/admin/admin-category'));

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


      <Route path="/admin" element={<AdminLayout/>}>
        <Route index  element={
            <Suspense fallback={<>Loading...</>}>
              <AdminPage/>
            </Suspense>
        }/>
        <Route path="products" element={
            <Suspense fallback={<>Loading...</>}>
              <AdminProducts/>
            </Suspense>
        }/>
        <Route path="categories" element={
            <Suspense fallback={<>Loading...</>}>
              <AdminCategories/>
            </Suspense>
        }
        />
      </Route>

    </Routes>
    </>
  )
}

export default App
