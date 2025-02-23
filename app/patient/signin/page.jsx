"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios"
import { toast , ToastContainer } from "react-toastify"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Navbar from "@/components/Navbar"

export default function PatientLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("role-patient")
    if (role) {
      router.replace("/patient/dashboard")
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/patients/login", { email, password });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Login successful")
        sessionStorage.setItem("token", response.data.token)
        localStorage.setItem("patient", JSON.stringify(response.data.data))
        sessionStorage.setItem("role-patient","patient")
        setTimeout(() => {
          router.push("/patient/dashboard")
        }, 3000)
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
    <ToastContainer />
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
      style={{
        backgroundImage: "url('https://cdn.dribbble.com/userupload/5887764/file/original-25749087a1feca2a54419a10cd6d9ed5.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Patient Login</CardTitle>
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
            <Link href="/patient/signup">Signup</Link>
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

