import { RouterProvider } from "react-router-dom";
import { authRouter } from "./utils/routes";

function App() {
  return <RouterProvider router={authRouter}></RouterProvider>;
}

export default App;
