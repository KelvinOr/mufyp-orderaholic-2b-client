import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SelectLoginPage from "./Pages/SelectLoginPage/SelectLoginPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SelectLoginPage />
    },
  ]);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
