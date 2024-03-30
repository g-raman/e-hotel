import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Hotel from "./pages/Hotel";
import { SearchProvider } from "./contexts/SearchContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="hotel" element={<Hotel />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
