"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role")

  const renderDashboard = () => {
    switch (role) {
      case "doctor":
        return (
          (<Card>
            <CardHeader>
              <CardTitle>Doctor Dashboard</CardTitle>
              <CardDescription>Manage your appointments and patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mr-2">View Appointments</Button>
              <Button>Manage Prescriptions</Button>
            </CardContent>
          </Card>)
        );
      case "patient":
        return (
          (<Card>
            <CardHeader>
              <CardTitle>Patient Dashboard</CardTitle>
              <CardDescription>View your appointments and medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mr-2">Book Appointment</Button>
              <Button>View Medical Records</Button>
            </CardContent>
          </Card>)
        );
      case "admin":
        return (
          (<Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage system users and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mr-2">Manage Users</Button>
              <Button>System Settings</Button>
            </CardContent>
          </Card>)
        );
      default:
        return <div>Invalid role</div>;
    }
  }

  return (
    (<div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to IPRMS</h1>
      {renderDashboard()}
    </div>)
  );
}

