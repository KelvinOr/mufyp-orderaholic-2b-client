import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectLoginPage from "./Pages/SelectLoginPage/SelectLoginPage";
import CreateInfoPage from "./Pages/CreateInfoPage/CreateInfoPage";
import MainPage from "./Pages/MainPage/MainPage";

function App() {

  return (
    <div className="App">
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SelectLoginPage />} />
            <Route path="/create-info" element={<CreateInfoPage />} />
            <Route path="/disboard" element={<MainPage />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
