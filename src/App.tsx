import { Suspense } from "react";
import router from "./app/router";
import { RouterProvider } from "react-router/dom";
import Loader from "./components/loader";

function App() {

  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router}/>
    </Suspense>
  )
}

export default App
