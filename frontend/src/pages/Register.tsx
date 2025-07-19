import { registerUser } from "@/api/authService";
import LoginForm from "@/components/auth/loginForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type formDataType = {
    name?: string;
    email: string;
    password: string;
    role?: string;
}
export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async ({ name, email, password }: formDataType) => {
        const formData = {
            name: name || "",
            email,
            password,
            role: "SuperAdmin"
        };

        setLoading(true);
        setError("");

        try {
            const response = await registerUser(formData);


            if (!response.accessToken) {
                throw new Error("Registration failed: No token returned");
            }

            const token = response.accessToken;
            console.log("✅ Token received:", token);

            login(token);
            navigate(formData.role === "SuperAdmin" ? "/" : "/login");
        } catch (err: any) {
            console.error("❌ Register error", err);
            setError(err?.response.data.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-10">
                <div className="mb-8 flex justify-center gap-2">
                    <a href="#" className="text-xl font-bold  text-primary">
                        Student Management
                    </a>
                </div>

                <div className="mx-auto w-full max-w-xs md:max-w-md">
                    <LoginForm
                        onSubmit={handleSubmit}
                        error={error}
                        loading={loading}
                        buttonText="Register"
                        showNameField={true}
                    />
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-primary underline hover:text-primary/80">Login here</a>.
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
}
