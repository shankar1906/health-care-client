"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PatientSignupPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        age: "",
        gender: "",
        medicalHistory: "",
        password: "",
        confirmPassword: "",
        patientIdFile: null,
    });

    const router = useRouter();

    useEffect(() => {
        const role = sessionStorage.getItem("role-patient")
        if (role) {
            router.replace("/patient/dashboard")
        }
    }, [])
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, patientIdFile: e.target.files[0] });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.info("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/patients/register", formData);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                toast.success("Patient signed up successfully");
                setTimeout(() => {
                    router.push("/patient/signin");
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

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div
                className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-green-500"
                style={{
                    backgroundImage: "url('https://cdn.dribbble.com/userupload/5887764/file/original-25749087a1feca2a54419a10cd6d9ed5.gif')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Card className="w-[700px] bg-[#98E4FF] border-black p-6 rounded-lg shadow-lg flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle>Patient Signup</CardTitle>
                        <CardDescription className="text-red-600">Register to access healthcare services</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-4">
                            {/* Name */}
                            <div className="flex flex-col lg:flex-row justify-between gap-3">
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required className='bg-white' />
                                </div>

                                {/* Email */}
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" className="bg-white" type="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-between gap-3">
                                {/* Phone */}
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" className="bg-white" type="tel" placeholder="9234567890" value={formData.phoneNumber} onChange={handleChange} required />
                                </div>

                                {/* Age */}
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" className="bg-white" type="number" placeholder="25" value={formData.age} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col lg:flex-row justify-between gap-3">
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select id="gender" value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Gender" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Medical History */}
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="medicalHistory">Medical History / Allergies</Label>
                                    <Input id="medicalHistory" className="bg-white" placeholder="E.g., Asthma, Diabetes" value={formData.medicalHistory} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Patient ID Upload */}
                            <div className="flex flex-col lg:flex-row justify-between gap-3">
                                {/* <div className="lg:w-1/2 w-full ">
                                <Label htmlFor="patientIdFile">Upload ID Proof</Label>
                                <Input id="patientIdFile" type="file" onChange={handleFileChange} required />
                            </div> */}

                                {/* Password */}
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" className="bg-white" type="password" placeholder="********" value={formData.password} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col lg:flex-row justify-between gap-3">
                                <div className="lg:w-1/2 w-full">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" className="bg-white" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
                                </div>
                            </div>
                            <CardFooter className="flex justify-between p-0">
                                <Button variant="outline" onClick={() => router.push("/patient/signin")}>
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
