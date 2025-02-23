"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DoctorSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    doctorId: "",
    specialization: "",
    yearsOfExperience: "",
    hospitalClinicName: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    const role = sessionStorage.getItem("role-doctor")
    if (role) {
      router.replace("/doctor/dashboard")
    }
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, licenseFile: e.target.files[0] });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Simple validation (Add backend validation for better security)
    if (formData.password !== formData.confirmPassword) {
      toast.info("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/doctors/register", formData);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Doctor signed up successfully");
        setTimeout(() => {
          router.push("/doctor/signin");
        }, 3000);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);


  return (
    <>
      <ToastContainer />
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
        style={{
          backgroundImage: "url('https://aihms.in/blog/wp-content/uploads/2020/04/healthcare1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card className="w-[600px] bg-white p-6 rounded-lg shadow-lg border-black">
          <CardHeader>
            <CardTitle>Doctor Signup</CardTitle>
            <CardDescription className="text-red-600" >Register as a doctor to access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="lg:w-1/2 w-full ">
                  <Label htmlFor="fullName">Full Name <span className="text-red-600">*</span></Label>
                  <Input id="fullName" placeholder="Ex : Saravana Kumar K" type="text" value={formData.fullName} onChange={handleChange} required />
                </div>

                {/* Email */}

                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="email">Email <span className="text-red-600">*</span></Label>
                  <Input id="email" type="email" placeholder="Ex : saravana@gmail.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>


              {/* Phone */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="phoneNumber">Phone Number <span className="text-red-600">*</span></Label>
                  <Input id="phoneNumber" type="tel" placeholder="Ex :  9876543210" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                {/* Specialization */}
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="specialization">Specialization <span className="text-red-600">*</span></Label>
                  <Select id="specialization" value={formData.specialization} onValueChange={(value) => setFormData({ ...formData, specialization: value })} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                      <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                      <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="yearsOfExperience">Years of Experience <span className="text-red-600">*</span></Label>
                  <Input id="yearsOfExperience" type="number" placeholder="5" value={formData.yearsOfExperience} onChange={handleChange} required />
                </div>

                {/* Hospital Name */}
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="hospitalClinicName">Hospital/Clinic Name <span className="text-red-600">*</span></Label>
                  <Input id="hospitalClinicName" placeholder="Ex : A BC Hospital" value={formData.hospitalClinicName} onChange={handleChange} required />
                </div>
              </div>

              {/* Medical License Upload */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                {/* <div className="w-1/2">
                <Label htmlFor="licenseFile">Medical License</Label>
              <Input id="licenseFile" type="file" onChange={handleFileChange} required />
            </div> */}

                {/* Password */}
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="password">Password <span className="text-red-600">*</span></Label>
                  <Input id="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="lg:w-1/2 w-full">
                  <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-600">*</span></Label>
                  <Input id="confirmPassword" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>


              <CardFooter className="flex justify-between p-0">
                <Button variant="outline" onClick={() => router.push("/doctor/signin")}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">Sign Up</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

