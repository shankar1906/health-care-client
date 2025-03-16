"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const appointmentData = [
  { month: "Jan", appointments: 120 },
  { month: "Feb", appointments: 150 },
  { month: "Mar", appointments: 200 },
  { month: "Apr", appointments: 180 },
  { month: "May", appointments: 220 },
  { month: "Jun", appointments: 250 },
]

const patientDemographics = [
  { name: "0-18", value: 250 },
  { name: "19-35", value: 300 },
  { name: "36-50", value: 200 },
  { name: "51-65", value: 150 },
  { name: "65+", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function GenerateReports() {
  const [reportType, setReportType] = useState("appointments")
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Generate Reports</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Select the type of report and date range</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Select onValueChange={(value) => setReportType(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appointments">Appointments</SelectItem>
              <SelectItem value="patient-demographics">Patient Demographics</SelectItem>
              <SelectItem value="doctor-performance">Doctor Performance</SelectItem>
            </SelectContent>
          </Select>
          {/* <DatePickerWithRange className="w-full md:w-auto" /> */}
        </CardContent>
        <CardFooter>
          <Button>Generate Report</Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientDemographics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {patientDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}

