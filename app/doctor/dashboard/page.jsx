"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import UnAuth from "@/components/UnAuth"
import { Button } from "@/components/ui/button"
import { User, Phone, Plus, Mail, Calendar, Bell, X, Edit, DeleteIcon, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import axios from "axios"
import Loader from "@/app/loader"

export default function DoctorDashboard() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false)
  const [showPrescriptions, setShowPrescriptions] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [prescription, setPrescription] = useState({
    patient: "",
    doctor: "",
    medication: "",
    dosage: "",
    frequency: "",
    notes: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [auth, setAuth] = useState({
    role: "",
    token: ""
  })
  const [doctor, setDoctor] = useState();
  const router = useRouter()

  const data = [
    { name: "Mon", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 1).length },
    { name: "Tue", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 2).length },
    { name: "Wed", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 3).length },
    { name: "Thu", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 4).length },
    { name: "Fri", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 5).length },
    { name: "Sat", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 6).length },
    { name: "Sun", appointments: appointments.filter(appointment => new Date(appointment.createdAt).getDay() === 0).length },
  ]

  useEffect(() => {
    setLoading(true)
    const doctor = JSON.parse(localStorage.getItem("doctor"))
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role-doctor")
    setAuth({ role, token })
    // console.log(auth)
    // console.log(doctor)
    // console.log(doctor)
    setDoctor(doctor)

    const fetchAppointments = async () => {
      if (!doctor?._id) {
        return
      }
      console.log("in fetch appointments")
      const response = await axios.get(`http://localhost:5000/appointments/doctor/${doctor?._id}`)
      // console.log(response.data.data)
      setAppointments(response.data.data)
    }

    const fetchNotifications = async () => {
      if (!doctor?._id) {
        return
      }
      try {
        const response = await axios.get(`http://localhost:5000/notifications/${doctor._id}`)
        console.log("response --> ", response.data.data)
        setNotifications(response.data.data)
      } catch (error) {
        console.log("error --> ", error)
      }
    }

    const fetchPrescriptions = async () => {
      if (!doctor?._id) {
        return
      }
      try {
        const response = await axios.get(`http://localhost:5000/prescriptions/doctor/${doctor._id}`)
        console.log("response --> ", response.data.data)
        setPrescriptions(response.data.data)
      } catch (error) {
        console.log("error --> ", error)
      }
    }
    fetchAppointments()
    fetchNotifications()
    fetchPrescriptions()
    setLoading(false)
  }, [])


  const handleAddPrescription = async (doctorId, patientId) => {
    if (!doctorId || !patientId) {
      return
    }
    try {
      const response = await axios.post(`http://localhost:5000/prescriptions/`, {
        patient: patientId,
        doctor: doctorId,
        medication: prescription?.medication,
        dosage: prescription?.dosage,
        frequency: prescription?.frequency,
        notes: prescription?.notes
      })
      if (response.status !== 200 && response.status !== 201) {
        toast.error(response.data.message)
        return
      }
      toast.success("Prescription Added")
      setPrescriptionModalOpen(false)
      setPrescription({
        medication: "",
        dosage: "",
        frequency: "",
        notes: ""
      })

      router.refresh()
    } catch (error) {
      console.log("error --> ", error)
      toast.error("Something went wrong")
    }
  }


  const handleApprove = async (id, date, time) => {
    const timeConverted = new Date(`${date}T${time}`);
    const result = timeConverted.toLocaleString({ timeZone: 'Asia/Kolkata' }, { hour: '2-digit', minute: '2-digit', hour12: true });
    // console.log("timeConverted", timeConverted);
    // console.log("result", result);
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${id}`, {
        status: "Confirmed",
        date: date ?? new Date(),
        time: result ?? new Date().toLocaleString({ timeZone: 'Asia/Kolkata' }, { hour: '2-digit', minute: '2-digit', hour12: true }),
      })
      if (response.status !== 200 && response.status !== 201) {
        toast.error(response.data.message)
        return
      }
      toast.success("Appointment Confirmed")
      setIsModalOpen(false)

      setAppointments(appointments.map(
        (appointment) => (appointment.id === id ? { ...appointment, status: "Confirmed" } : appointment)
      ))
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const handleCancel = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${id}`, {
        status: "Cancelled",
      })
      if (response.status !== 200 && response.status !== 201) {
        toast.error(response.data.message)
        return
      }
      toast.success("Appointment Cancelled")
      router.refresh()
      setAppointments(appointments.filter(appointment => appointment.id !== id))
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const handleAppointmentCompleted = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${id}`, {
        status: "Completed",
      })
      if (response.status !== 200 && response.status !== 201) {
        toast.error(response.data.message)
        return
      }
      toast.success("Appointment Completed")
      router.refresh()
      setAppointments(appointments.map(
        (appointment) => (appointment.id === id ? { ...appointment, status: "Completed" } : appointment)
      ))
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
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


  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  if (loading) {
    return <Loader />
  }

  if (auth.role !== "doctor") {
    return <UnAuth />
  }

  if (!auth.token || auth.token === "") {
    return <UnAuth />
  }

  return (
    <>
      <Navbar login={true} name={doctor?.fullName || "Doctor"} />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Patient Appointments Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#2192FF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
            </CardHeader>
            <CardContent style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="mr-2 text-blue-600" />
                  <span className="font-bold mr-2">Name:</span>
                  <span>{doctor?.fullName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 text-green-600" />
                  <span className="font-bold mr-2">Phone:</span>
                  <span>{doctor?.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 text-red-600" />
                  <span className="font-bold mr-2">Email:</span>
                  <span>{doctor?.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-orange-600" />
                  <span className="font-bold mr-2">Years of Experience:</span>
                  <span>{doctor?.yearsOfExperience}</span>
                </div>
                <div className="flex items-center w-full mt-4">
                  <Calendar className="mr-2 text-orange-600" />
                  <span className="font-bold mr-2">Hospital/Clinic:</span>
                  <span>{doctor?.hospitalClinicName || "N/A"}</span>
                </div>
                <div className="flex items-center w-full mt-4">
                  <span className="font-bold mr-2">Specialization:</span>
                  <span>{doctor?.specialization || "N/A"}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full mt-4 overflow-y-auto border-t-2 border-gray-200 pt-4">
                <div className="flex items-center">
                  <Bell className="mr-2 text-black-600" />
                  <h3 className="font-bold mr-2">
                    Notifications Center</h3>
                </div>
                <div className="flex items-center mt-4 w-full" >
                  {notifications.length > 0 ? (
                    <div className="w-full">
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
                </div>
              </div>
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
                  <TableHead className="text-center">S.No</TableHead>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Phone Number</TableHead>
                  <TableHead className="text-center">Note</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments?.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{appointment?.patient?.fullName || "-"}</TableCell>
                    <TableCell className="text-center">{appointment?.patient?.phoneNumber || "-"}</TableCell>
                    <TableCell className="text-center">{appointment?.notes || "-"}</TableCell>
                    <TableCell className="text-center">{appointment?.status || "-"}</TableCell>
                    <TableCell className="text-center">
                      {capitalize(appointment?.status) === "Pending" && (
                        <Button onClick={() => setIsModalOpen(true)}>Approve</Button>
                      )}
                      {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full" onClick={() => setIsModalOpen(false)}>
                          <div className="bg-white rounded-lg shadow-lg p-6 w-[40%] h-auto relative" onClick={(e) => e.stopPropagation()}>
                            <button className="absolute top-4 right-4" onClick={() => setIsModalOpen(false)}>
                              <X className="h-6 w-6 text-gray-500" />
                            </button>
                            <h2 className="text-xl font-bold mb-4">Confirm Appointment</h2>
                            <div>
                              <div className="p-3">
                                <form>
                                  <div className="mb-4">
                                    <label htmlFor="date" className="block text-lg font-semibold mb-1 text-left">Date<span className="text-red-500">*</span></label>
                                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor="time" className="block text-lg font-semibold mb-1 text-left">Time<span className="text-red-500">*</span></label>
                                    <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                </form>
                                <Button onClick={() => handleApprove(appointment?._id, date, time)}>Confirm</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {prescriptionModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full" onClick={() => setPrescriptionModalOpen(false)}>
                          <div className="bg-white rounded-lg shadow-lg p-6 w-[40%] h-auto relative" onClick={(e) => e.stopPropagation()}>
                            <button className="absolute top-4 right-4" onClick={() => setPrescriptionModalOpen(false)}>
                              <X className="h-6 w-6 text-gray-500" />
                            </button>
                            <h2 className="text-xl font-bold mb-4">Add Prescription</h2>
                            <div>
                              <div className="p-3">
                                <form>
                                  <div className="mb-4">
                                    <label htmlFor="medication" className="block text-lg font-semibold mb-1 text-left">Medication<span className="text-red-500">*</span></label>
                                    <input type="text" id="medication" placeholder="Paracetamol, Crocin, etc." value={prescription?.medication} onChange={(e) => setPrescription({ ...prescription, medication: e.target.value })} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor="dosage" className="block text-lg font-semibold mb-1 text-left">Dosage<span className="text-red-500">*</span></label>
                                    <input type="text" id="dosage" placeholder="10mg, 1000mg, etc." value={prescription?.dosage} onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor="frequency" className="block text-lg font-semibold mb-1 text-left">Frequency<span className="text-red-500">*</span></label>
                                    <input type="text" id="frequency" placeholder="10mg, 1000mg, etc." value={prescription?.frequency} onChange={(e) => setPrescription({ ...prescription, frequency: e.target.value })} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor="notes" className="block text-lg font-semibold mb-1 text-left">Notes<span className="text-red-500">*</span></label>
                                    <input type="text" id="notes" placeholder="Notes about the medication" value={prescription?.notes} onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })} className="border border-gray-300 rounded p-2 w-full" required />
                                  </div>
                                </form>
                                <Button onClick={() => handleAddPrescription(doctor?._id, appointment?.patient?._id)}>Add Prescription</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        {capitalize(appointment?.status) === "Confirmed" &&
                          <Button onClick={() => setIsModalOpen(true)}><Edit className="h-4 w-4" />Edit</Button>}
                        {capitalize(appointment?.status) === "Confirmed" &&
                          <Button variant="destructive" onClick={() => handleCancel(appointment?._id)}>Cancel<DeleteIcon className="h-4 w-4" /></Button>}
                        {capitalize(appointment?.status) === "Cancelled" &&
                          <Button variant="destructive" className="pointer-events-none">Cancelled</Button>}
                        {capitalize(appointment?.status) === "Confirmed" &&
                          <Button variant="destructive" className="bg-green-500" onClick={() => handleAppointmentCompleted(appointment?._id)}><Check className="h-4 w-4" /></Button>}
                        {capitalize(appointment?.status) === "Completed" &&
                          <Button onClick={() => setPrescriptionModalOpen(true)}><Plus className="h-4 w-4" />Add Prescription</Button>}

                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
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
                    <TableHead className='text-center'>Patient Name</TableHead>
                    <TableHead className='text-center'>Patient Phone</TableHead>
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
                          <TableCell>{prescription?.patient?.fullName}</TableCell>
                          <TableCell>{prescription?.patient?.phoneNumber}</TableCell>
                          <TableCell>{prescription?.medication}</TableCell>
                          <TableCell>{prescription?.dosage}</TableCell>
                          <TableCell>{prescription?.frequency}</TableCell>
                          <TableCell>{prescription?.notes}</TableCell>
                          <TableCell>{new Date(prescription?.createdAt).toLocaleDateString({ timeZone: 'Asia/Kolkata' }, { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
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
  );
}

