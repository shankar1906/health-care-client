"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

const forgotPasswordCode = [
  "67890123",
  "89012345",
  "12345678",
  "45678901",
  "23456789",
  "34567890",
  "56789012",
  "78901234"
];

export default function AdminLoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)
  const [code, setCode] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("role-admin")
    if (role) {
      router.replace("/admin/dashboard")
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/admin/login", { userName, password });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Login successful")
        sessionStorage.setItem("token", response.data.token)
        localStorage.setItem("admin", JSON.stringify(response.data.data))
        sessionStorage.setItem("role-admin", "admin")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 3000)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const forgotPasswordCode = async (e) => {
    e.preventDefault()
    try {

      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match")
        return
      }

      if (!forgotPasswordCode.includes(code)) {
        toast.error("Invalid Code")
        return
      }

      const response = await axios.post(`http://localhost:5000/admin/${"IPRMS-Admin"}`, { password });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Login successful")
        sessionStorage.setItem("token", response.data.token)
        localStorage.setItem("admin", JSON.stringify(response.data.data))
        sessionStorage.setItem("role-admin", "admin")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 3000)
      } else {
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
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
        style={{
          backgroundImage: "url('https://thumbs.dreamstime.com/b/ai-medical-background-concept-155234616.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!forgotPassword && <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="username"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
              <button className="flex items-center gap-2" onClick={() => setForgotPassword(true)}>Forgot Password?</button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>}
        {forgotPassword && <Card className="w-[350px]">
          <CardHeader className="pb-3">
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription><span className="text-red-500">Note:</span> must enter the code </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={forgotPasswordCode}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="code"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
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
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-end text-sm text-blue-500 mt-2">
              <button className="flex items-center gap-2" onClick={() => setForgotPassword(false)}><ArrowLeftIcon />Back to Login</button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
            <Button variant="primary" onClick={handleLogin} ><ArrowRightIcon />Reset Password</Button>
          </CardFooter>
        </Card>}
      </div>
    </>
  )
}

