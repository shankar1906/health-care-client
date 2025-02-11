"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DoctorSignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    doctorId: "",
    specialization: "",
    experience: "",
    hospitalName: "",
    licenseFile: null,
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, licenseFile: e.target.files[0] });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Simple validation (Add backend validation for better security)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Proceed with form submission (API call or router push)
    console.log("Doctor Signup Data:", formData);
    router.push("/doctor-dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-500"
      style={{
        backgroundImage: "url('https://aihms.in/blog/wp-content/uploads/2020/04/healthcare1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Doctor Signup</CardTitle>
          <CardDescription>Register as a doctor to access the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}

            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Dr. John Doe" value={formData.fullName} onChange={handleChange} required />
            </div>

            {/* Email */}

            <div className="w-1/2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
            </div>
            </div>


            {/* Phone */}
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1234567890" value={formData.phone} onChange={handleChange} required />
            </div>

            {/* Specialization */}
            <div className="w-1/2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select id="specialization" value={formData.specialization} onChange={handleChange} required>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="dermatologist">Dermatologist</SelectItem>
                  <SelectItem value="neurologist">Neurologist</SelectItem>
                  <SelectItem value="orthopedic">Orthopedic</SelectItem>
                  <SelectItem value="pediatrician">Pediatrician</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>

            {/* Experience */}
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" placeholder="5" value={formData.experience} onChange={handleChange} required />
            </div>

            {/* Hospital Name */}
            <div className="w-1/2">
              <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
              <Input id="hospitalName" placeholder="ABC Hospital" value={formData.hospitalName} onChange={handleChange} required />
            </div>
            </div>

            {/* Medical License Upload */}
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Label htmlFor="licenseFile">Medical License</Label>
              <Input id="licenseFile" type="file" onChange={handleFileChange} required />
            </div>

            {/* Password */}
            <div className="w-1/2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required />
            </div>
            </div>

            {/* Confirm Password */}
            <div className="flex justify-between gap-3">
              <div className="w-1/2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
  );
}
