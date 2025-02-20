"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const healthData = [
  { date: "2023-01", weight: 70, bloodPressure: 120 },
  { date: "2023-02", weight: 69, bloodPressure: 118 },
  { date: "2023-03", weight: 68, bloodPressure: 115 },
  { date: "2023-04", weight: 67, bloodPressure: 117 },
  { date: "2023-05", weight: 66, bloodPressure: 116 },
  { date: "2023-06", weight: 65, bloodPressure: 114 },
]

const appointments = [
  { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", date: "2023-06-20", time: "10:00 AM" },
  { id: 2, doctor: "Dr. Johnson", specialty: "Dermatology", date: "2023-06-25", time: "2:00 PM" },
]

const prescriptions = [
  { id: 1, medication: "Aspirin", dosage: "100mg", frequency: "Once daily" },
  { id: 2, medication: "Lisinopril", dosage: "10mg", frequency: "Twice daily" },
]

export default function PatientDashboard() {
  const [showPrescriptions, setShowPrescriptions] = useState(false)

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Age:</strong> 35
            </p>
            <p>
              <strong>Gender:</strong> Male
            </p>
            <p>
              <strong>Blood Type:</strong> A+
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button>Book New Appointment</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {showPrescriptions ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.medication}</TableCell>
                    <TableCell>{prescription.dosage}</TableCell>
                    <TableCell>{prescription.frequency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Click the button below to view your prescriptions.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowPrescriptions(!showPrescriptions)}>
            {showPrescriptions ? "Hide Prescriptions" : "View Prescriptions"}
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

