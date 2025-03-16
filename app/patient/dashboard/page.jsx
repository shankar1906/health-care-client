"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import UnAuth from "@/components/UnAuth"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Mail, User, Calendar, Mars, Venus, Transgender } from 'lucide-react';
import Loader from "@/app/loader"

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true)
  const [showPrescriptions, setShowPrescriptions] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [auth, setAuth] = useState({
    role: "",
    token: ""
  })
  const [patient, setPatient] = useState();
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patient"))
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role-patient")
    setAuth({ role, token })
    // console.log(patient)
    setPatient(patient)

    const fetchAppointments = async () => {
      if (!patient?._id) {
        return
      }
      const response = await axios.get(`http://localhost:5000/appointments/patient/${patient._id}`)
      // console.log("response --> ", response.data.data.appointments)
      localStorage.setItem("appointments", JSON.stringify(response.data.data.appointments))
    }

    const fetchPrescriptions = async () => {
      if (!patient?._id) {
        return
      }
      const response = await axios.get(`http://localhost:5000/prescriptions/patient/${patient._id}`)
      setPrescriptions(response.data.data)
    }

    const fetchNotifications = async () => {
      if (!patient?._id) {
        return
      }
      try {
        const response = await axios.get(`http://localhost:5000/notifications/${patient._id}`)
        console.log("response --> ", response.data.data)
        setNotifications(response.data.data)
      } catch (error) {
        console.log("error --> ", error)
      }
    }

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

    fetchAppointments()
    fetchPrescriptions()
    fetchNotifications()
    setLoading(false)

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, [])

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

  if (auth.role !== "patient") {
    return <UnAuth />
  }

  if (!auth.token || auth.token === "") {
    return <UnAuth />
  }


  return (
    <>
      <ToastContainer autoClose={3000} />
      <Navbar login={true} name={patient?.fullName || "Patient"} />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Patient Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="mr-2 text-blue-500" />
                  <span className="font-bold mr-2">Name:</span>
                  <span>{patient?.fullName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 text-green-500" />
                  <span className="font-bold mr-2">Phone:</span>
                  <span>{patient?.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 text-red-500" />
                  <span className="font-bold mr-2">Email:</span>
                  <span>{patient?.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-yellow-500" />
                  <span className="font-bold mr-2">Age:</span>
                  <span>{patient?.age}</span>
                </div>
                <div className="flex items-center">
                  {patient?.gender === "Male" && <Mars className="mr-2 text-blue-500" />}
                  {patient?.gender === "Female" && <Venus className="mr-2 text-pink-500" />}
                  {patient?.gender === "Other" && <Transgender className="mr-2 text-purple-500" />}
                  <span className="font-bold mr-2">Gender:</span>
                  <span>{patient?.gender}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentsGrid />
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/patient/book-appointment?patientId=${patient?._id}`)}>Book New Appointment</Button>
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
                    <TableHead className='text-center'>S.No</TableHead>
                    <TableHead className='text-center'>Medication</TableHead>
                    <TableHead className='text-center'>Dosage</TableHead>
                    <TableHead className='text-center'>Frequency</TableHead>
                    <TableHead className='text-center'>Notes</TableHead>
                    <TableHead className='text-center'>Prescription Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.length > 0 ? (
                    <>
                      {prescriptions?.map((prescription, index) => (
                        <TableRow key={prescription?._id} className='text-center'>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{prescription?.medication || "-"}</TableCell>
                          <TableCell>{prescription?.dosage || "-"}</TableCell>
                          <TableCell>{prescription?.frequency || "-"}</TableCell>
                          <TableCell>{prescription?.notes || "-"}</TableCell>
                          <TableCell>{prescription?.prescriptionDate || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className='text-center'>No prescriptions found</TableCell>
                    </TableRow>
                  )}
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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
  {
    field: 'doctor',
    headerName: 'Doctor',
    width: 160,
    editable: false,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
  {
    field: 'specialty',
    headerName: 'Specialty',
    type: 'number',
    width: 160,
    headerAlign: "center",
    align: "center",
    editable: false,
    filterable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
    width: 160,
    headerAlign: "center",
    align: "center",
    editable: false,
    filterable: false,
  },
  {
    field: 'date',
    headerName: 'Date',
    sortable: false,
    width: 160,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
  {
    field: 'time',
    headerName: 'Time',
    sortable: false,
    width: 160,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    sortable: false,
    width: 160,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    sortable: false,
    width: 160,
    headerAlign: "center",
    align: "center",
    filterable: false,
  },
];


export function AppointmentsGrid() {

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem("appointments"))
    if (!appointments) {
      return
    }
    const appointmentsData = appointments.map((appointment, index) => ({
      id: index + 1,
      doctor: appointment.doctor.fullName,
      status: appointment.status,
      specialty: appointment.doctor.specialization,
      date: new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) ?? "-",
      time: appointment.time ?? "-",
      notes: appointment.notes ?? "-",
      createdAt: new Date(appointment.createdAt).toLocaleString({timeZone: 'Asia/Kolkata'}, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) ?? "-"
    }))
    console.log("appointmentsData --> ", appointmentsData)
    setAppointments(appointmentsData)
    // console.log("appointments --> ", appointments)
  }, [])

  // console.log("appointmentsData --> ", appointments)

  return (
    <Box sx={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={appointments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[3]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#d3d3d3", // Light Gray Background
            color: "#000000", // Black Text
            fontSize: "16px",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            textAlign: "center", // Centers column header text
            justifyContent: "center",
            display: "flex",
            width: "100%",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "center", // Centers cell text
          },
        }}
      />
    </Box>
  );
}

