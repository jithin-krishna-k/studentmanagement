import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "@/components/auth/loginForm";
import { loginUser } from "@/api/authService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (!response.token) {
        throw new Error("Login failed: No token returned");
      }

      const token = response.token;
      console.log("✅ Token received:", token);

      await login(token);
      navigate(response.role === "SuperAdmin" ? "/" : "/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-8 flex justify-center gap-2">
          <a href="#" className="text-xl font-bold text-primary">
            Student Management
          </a>
        </div>
        <div className="mx-auto w-full max-w-xs md:max-w-md">
          <LoginForm
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            buttonText="Login"
            showNameField={false}
          />
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-primary underline hover:text-primary/80">Register here</a>.
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="/images/signup2.svg"
          alt="Login background"
          className="absolute inset-0 h-full w-full object-contain object-center brightness-90 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
