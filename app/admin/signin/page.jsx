"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { toast,ToastContainer } from "react-toastify"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("Admin123")
  const [password, setPassword] = useState("Admin123")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    // Here you would typically validate the credentials against a backend
    // For this example, we'll use some dummy logic
    if (username === "Admin123" && password === "Admin123") {
      toast.success("Login successful")
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1000)
    }
    else {
      toast.error("Invalid credentials")
    }
  }

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
      style={{
        backgroundImage: "url('https://thumbs.dreamstime.com/b/ai-medical-background-concept-155234616.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-[350px]">
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Link href="/admin/signup">Signup</Link>
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

