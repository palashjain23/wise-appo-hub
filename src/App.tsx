import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UserPortal from "./pages/UserPortal";
import DoctorPortal from "./pages/DoctorPortal";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/user-portal" element={<UserPortal />} />
      <Route path="/doctor-portal" element={<DoctorPortal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
