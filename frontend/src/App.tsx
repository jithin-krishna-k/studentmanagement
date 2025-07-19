import { AppSidebar } from "@/components/app-sidebar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Staffs from "./pages/Staffs"
import Students from "./pages/Students"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner"

function App() {
  const location = useLocation();

  const isAuthRoute = ["/auth/login", "/auth/register"].includes(location.pathname);

  return (
    <div className="min-h-screen w-full">
      <Toaster richColors position="top-right" />
      {isAuthRoute ? (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 p-6 bg-sidebar rounded-2xl my-5 mx-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/staff" element={<Staffs />} />
              <Route path="/students" element={<Students />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}

export default App