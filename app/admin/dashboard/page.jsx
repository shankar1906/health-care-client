"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const userStats = [
  { name: "Patients", value: 500 },
  { name: "Doctors", value: 50 },
  { name: "Staff", value: 30 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const recentActivity = [
  { id: 1, action: "New patient registered", timestamp: "2023-06-15 10:30 AM" },
  { id: 2, action: "Appointment scheduled", timestamp: "2023-06-15 11:15 AM" },
  { id: 3, action: "Doctor added to system", timestamp: "2023-06-14 3:00 PM" },
]

const pendingApprovals = [
  { id: 1, name: "Dr. Jane Smith", specialty: "Neurology", status: "Pending" },
  { id: 2, name: "Dr. Mike Johnson", specialty: "Pediatrics", status: "Pending" },
]

export default function AdminDashboard() {
  const [showApprovals, setShowApprovals] = useState(false)

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>System Management</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>Manage Users</Button>
          <Button>Manage Appointments</Button>
          <Button asChild>
            <Link href="/admin/generate-reports">Generate Reports</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {showApprovals ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>{approval.name}</TableCell>
                    <TableCell>{approval.specialty}</TableCell>
                    <TableCell>{approval.status}</TableCell>
                    <TableCell>
                      <Button size="sm">Approve</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Click the button below to view pending approvals.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowApprovals(!showApprovals)}>
            {showApprovals ? "Hide Approvals" : "View Approvals"}
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

