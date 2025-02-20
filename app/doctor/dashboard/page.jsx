"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", patients: 4 },
  { name: "Tue", patients: 3 },
  { name: "Wed", patients: 5 },
  { name: "Thu", patients: 2 },
  { name: "Fri", patients: 6 },
  { name: "Sat", patients: 3 },
  { name: "Sun", patients: 1 },
]

const patientList = [
  { id: 1, name: "John Doe", date: "2023-06-15", time: "10:00 AM", status: "Pending" },
  { id: 2, name: "Jane Smith", date: "2023-06-15", time: "11:00 AM", status: "Approved" },
  { id: 3, name: "Bob Johnson", date: "2023-06-16", time: "09:00 AM", status: "Pending" },
]

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(patientList)

  const handleApprove = (id) => {
    setPatients(patients.map(
      (patient) => (patient.id === id ? { ...patient, status: "Approved" } : patient)
    ))
  }

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Patient Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="patients" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doctor Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name:</strong> Dr. Jane Doe
              </p>
              <p>
                <strong>Specialty:</strong> Cardiology
              </p>
              <p>
                <strong>Phone:</strong> (123) 456-7890
              </p>
              <p>
                <strong>Email:</strong> jane.doe@example.com
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Patient Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.date}</TableCell>
                    <TableCell>{patient.time}</TableCell>
                    <TableCell>{patient.status}</TableCell>
                    <TableCell>
                      {patient.status === "Pending" && <Button onClick={() => handleApprove(patient.id)}>Approve</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

