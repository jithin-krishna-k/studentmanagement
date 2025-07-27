import DashboardStats from "@/components/dashboard/dashboard-stats"
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getAllStudents } from "@/api/student";
import { getAllStaff } from "@/api/staff";

export default function Home() {
    const { user} = useAuth();
    const [studentCount, setStudentCount] = useState<number | null>(null);
    const [staffCount, setStaffCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            setLoading(true);

            try {

                if (user?.role === "SuperAdmin") {
                    const [studentsRes, staffRes] = await Promise.all([
                        getAllStudents(),
                        getAllStaff(),
                    ]);
                    setStudentCount(studentsRes.data.length);
                    setStaffCount(staffRes.data.length);
                } else {

                    const studentsRes = await getAllStudents();
                    setStudentCount(studentsRes.data.length);
                    setStaffCount(0);
                }
            } catch (err) {
                console.error("Error fetching dashboard counts", err);
                setStudentCount(0);
                setStaffCount(0);
            } finally {
                setLoading(false);
            }
        }

        fetchCounts();
    }, [user]);


    if (!user) return null;
    if (loading) return <div>Loading dashboard...</div>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            <p className="text-gray-600 mb-4">Welcome back, {user?.name}</p>
            <DashboardStats studentCount={studentCount ?? 0} staffCount={staffCount ?? 0} userRole={user?.role || ""} />
        </div>
    )
}