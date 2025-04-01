import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/mainPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/companies/organizations" replace />} />
      <Route path="/companies" element={<Navigate to="/companies/organizations" replace />} />
      <Route path="/companies/organizations" element={<MainPage />} />
      <Route path="/companies/contractors" element={<MainPage />} />
      <Route path="/companies/clients" element={<MainPage />} />
      <Route path="/search" element={<MainPage />} />
      <Route path="/settings" element={<MainPage />} />
      <Route path="/signout" element={<MainPage />} />
    </Route>
  )
);

export default router;