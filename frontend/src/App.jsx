import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
