import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import('./pages/home'));

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<>Loading...</>}>
          <HomePage/>
        </Suspense>
      }/>
    </Routes>
    </>
  )
}

export default App
