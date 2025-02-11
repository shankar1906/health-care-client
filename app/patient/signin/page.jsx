"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function PatientLoginPage() {
  const [username, setUsername] = useState("Patient123")
  const [password, setPassword] = useState("Patient123")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    // Here you would typically validate the credentials against a backend
    // For this example, we'll use some dummy logic
    if (username === "Patient123" && password === "Patient123") {
      toast.success("Login successful")
      setTimeout(() => {
        router.push("/patient-dashboard?role=patient")
      }, 1000)
    }
    else {
      toast.error("Invalid credentials")
    }
  }

  return (
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
            <Link href="/patient/signup">Signup</Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

