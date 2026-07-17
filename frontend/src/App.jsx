import AskOutPage from "./pages/AskOutPage";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import SetDateFirstPage from "./pages/SetDateFirstPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AskOutPage />} />
          <Route path="/set-date" element={<SetDateFirstPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
