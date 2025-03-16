"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ToastContainer, toast } from "react-toastify"
import axios , { AxiosError } from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("role-doctor")
    if (role) {
      router.replace("/doctor/dashboard")
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    // Here you would typically validate the credentials against a backend
    // For this example, we'll use some dummy logic
    try {
      const response = await axios.post("http://localhost:5000/doctors/login", {email, password});
      // console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Doctor signed up successfully");
        localStorage.setItem("doctor", JSON.stringify(response.data.data));
        sessionStorage.setItem("role-doctor", "doctor");
        sessionStorage.setItem("token", response.data.token);
        setTimeout(() => {
          router.push("/doctor/dashboard");
        }, 3000);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error->",error);
      console.log("error.AxiosError.data.message",error.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
    <Navbar/>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
     style={{
      backgroundImage: "url('https://aihms.in/blog/wp-content/uploads/2020/04/healthcare1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
     }}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Doctor Login</CardTitle>
          <CardDescription>Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end text-sm text-blue-500 mt-2">
            <Link href="/doctor/signup">Signup</Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

