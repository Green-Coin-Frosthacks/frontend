import { RouterProvider } from "react-router-dom"
import "./global/styles/global.style.scss"
import { router } from "./App.routes"
import useAuth from "./features/Auth/hooks/useAuth"
function App() {
  const { loading } = useAuth();
  if(loading){
    return null;
  }
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
