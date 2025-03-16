"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { Label } from "@/components/ui/label"
import LoaderComponent from "@/app/loader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"


export default function OpRegisterPage() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("Male")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("") // Optional field
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/op-patient", {
        name,
        age,
        gender,
        phoneNumber,
        email,
        address,
        medicalHistory, // Optional field
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Registered successfully");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering OP Patient");
      setLoading(false)
    }
  }

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500 p-6"
        style={
          {
            backgroundImage: "url('https://img.freepik.com/free-vector/heart-with-cardiograph-line-medical-blue-background_1017-24816.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        }
      >
        <Card className="w-[550px] shadow-lg rounded-lg border border-gray-300">
          <CardHeader className="bg-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold text-center">Register OP Patient</CardTitle>
            <CardDescription className="text-center text-gray-600">Fill in the details to register</CardDescription>
          </CardHeader>
          <CardContent className="bg-gray-50 rounded-b-lg">
            <form onSubmit={handleRegister}>
              <div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <Label htmlFor="name">Name<span className="text-red-600">*</span></Label>
                    <Input
                      id="name"
                      placeholder="ex:Pandi Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="age">Age<span className="text-red-600">*</span></Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="ex:23"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <Label htmlFor="gender">Gender<span className="text-red-600">*</span></Label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <Label htmlFor="phoneNumber">Phone Number<span className="text-red-600">*</span></Label>
                    <Input
                      id="phoneNumber"
                      placeholder="ex:9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <Label htmlFor="email">Email<span className="text-red-600">*</span></Label>
                    <Input
                      id="email"
                      placeholder="ex:pandi@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="address">Address<span className="text-red-600">*</span></Label>
                    <Input
                      id="address"
                      placeholder="ex:123,Main Street,Chennai"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-full">
                    <Label htmlFor="medicalHistory">Medical History <span className="text-[10px]"> ( optional ) </span></Label>
                    <Input
                      id="medicalHistory"
                      placeholder="ex:I have a headache and a cold"
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="primary" className="mt-4 w-full">Register</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end bg-white rounded-b-lg">
            <Link href="/" className="text-blue-500 hover:underline">Cancel</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
