"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import UnAuth from "@/components/UnAuth"
import Loader from "@/app/loader"
import axios from "axios"
import { Bell, Download, Users, UserCog, Calendar, Pill } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { toast, ToastContainer } from "react-toastify"
import { DoctorTable } from "@/components/DoctorTable"
import { PatientTable } from "@/components/PatientTable"
import { AppointmentTable } from "@/components/AppointmentTable"
import { Prescriptions } from "@/components/Prescriptions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [notifications, setNotifications] = useState([])
  const [chartData, setChartData] = useState([
    { name: "Patients", value: 0 },
    { name: "Doctors", value: 0 },
  ])
  const [patientsCount, setPatientsCount] = useState(0)
  const [doctorsCount, setDoctorsCount] = useState(0)
  const [appointmentsCount, setAppointmentsCount] = useState(0)
  const [prescriptionsCount, setPrescriptionsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState({
    token: "",
    role: "",
  })
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role-admin")
    setAuth({ role, token })
    setLoading(false)

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notifications/admin")
        // console.log(response.data)
        setNotifications(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchAllCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/get-all-counts")
        console.log(response.data)
        setPatientsCount(response.data.data.patients)
        setDoctorsCount(response.data.data.doctors)
        setAppointmentsCount(response.data.data.appointments)
        setPrescriptionsCount(response.data.data.prescriptions)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNotifications()
    fetchAllCounts()
  }, [])


  // Establish WebSocket connection
  const socket = new WebSocket('ws://localhost:5000'); // Replace PORT with your actual port

  socket.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  socket.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      if (notification.read === false) {
        toast.info(`New notification: ${notification.title}`);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
      toast.error('Failed to process notification');
    }
  };

  socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
  };

  useEffect(() => {
    setChartData([
      { name: "Patients", value: patientsCount },
      { name: "Doctors", value: doctorsCount },
    ])
  }, [patientsCount, doctorsCount])

  const handleMarkAsRead = async (notificationId) => {
    if (!notificationId) {
      return
    }
    try {
      const response = await axios.put(`http://localhost:5000/notifications/${notificationId}`)
      console.log("response --> ", response.data.data)
      window.location.reload()
    } catch (error) {
      console.log("error --> ", error)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (auth.role !== "admin") {
    return <UnAuth />
  }

  if (!auth.token || auth.token === "") {
    router.push("/")
  }

  return (
    <>
      <ToastContainer />
      <Navbar login={true} name={"Admin"} />
      <div className="p-8" style={{backgroundColor: "#f0f0f0"}}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard </h1>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">
              👋 Welcome back, Admin!
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-r from-[#FF6F61] to-[#D55A3C] border-b-[8px] border-b-[#ff947a] shadow-md hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{patientsCount}</div>
              <p className="text-xs text-gray-200">Registered users</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#6BBF59] to-[#4DAA3D] border-b-[8px] border-b-[#92fa80] shadow-md hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Doctors</CardTitle>
              <UserCog className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{doctorsCount}</div>
              <p className="text-xs text-gray-200">Active practitioners</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#F39C12] to-[#D68A10] border-b-[8px] border-b-[#ffd28a] shadow-md hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{appointmentsCount}</div>
              <p className="text-xs text-gray-200">Scheduled today</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#8E44AD] to-[#732D91] border-b-[8px] border-b-[#d47cfa] shadow-md hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{prescriptionsCount}</div>
              <p className="text-xs text-gray-200">Issued today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
          <Card className="col-span-4 bg-gradient-to-b from-[#ffffff] to-[#8dffff] shadow-md">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription className="text-black">Overview of registered users by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent system updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex flex-col space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <time className="text-sm text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </time>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex justify-end">
                        <Button 
                          variant={notification.read ? "outline" : "default"} 
                          size="sm"
                          onClick={() => handleMarkAsRead(notification._id)}
                          disabled={notification.read}
                        >
                          {notification.read ? "Viewed" : "Mark as Read"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No notifications found</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="doctors" className="space-y-4 bg-white rounded-lg p-4">
          <TabsList className="py-7 px-3">
            <TabsTrigger value="doctors" className="py-2 px-3">Doctors</TabsTrigger>
            <TabsTrigger value="patients" className="py-2 px-3">Patients</TabsTrigger>
            <TabsTrigger value="appointments" className="py-2 px-3">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions" className="py-2 px-3">Prescriptions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="border rounded-lg p-4">
            <DoctorTable />
          </TabsContent>
          
          <TabsContent value="patients" className="border rounded-lg p-4">
            <PatientTable />
          </TabsContent>
          
          <TabsContent value="appointments" className="border rounded-lg p-4">
            <AppointmentTable />
          </TabsContent>
          
          <TabsContent value="prescriptions" className="border rounded-lg p-4">
            <Prescriptions />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

