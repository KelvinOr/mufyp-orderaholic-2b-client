import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SelectLoginPage from "./Pages/SelectLoginPage/SelectLoginPage";
import CreateInfoPage from "./Pages/CreateInfoPage/CreateInfoPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SelectLoginPage />
    },
    {
      path: "/create-info",
      element: <CreateInfoPage />
    }
  ]);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
