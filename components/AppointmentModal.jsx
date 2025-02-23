"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AppointmentModal({ isOpen, onClose, patientId }) {
    // Ensure the modal is not rendered if not open
    if (!isOpen) return null;

    const [doctors, setDoctors] = useState([]);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        let isMounted = true;
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/doctors");
                setDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, []);
    const handleBookAppointment = async (doctorId) => {
        console.log("doctorId", doctorId, "patientId", patientId);

        // Validate IDs before making the API call
        if (!doctorId || !patientId) {
            console.error("Doctor ID or Patient ID is missing");
            toast.error("Doctor or Patient information is missing.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/appointments", {
                doctorId,
                patientId,
                appointmentDate: new Date().toISOString(),
                notes,
            });

            console.log("Appointment booked successfully:", response.data);
            toast.success("Appointment booked successfully!");

            // Delay closing the modal to avoid state update issues
            setTimeout(() => {
                onClose();
            }, 300); // Small delay to ensure smooth closing
        } catch (error) {
            console.error("Error booking appointment:", error);

            // Show user-friendly error message
            if (error.response) {
                toast.error(error.response.data.message || "Failed to book appointment.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg h-auto relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <X className="h-6 w-6 text-gray-500" />
                </button>
                <h2 className="text-xl font-bold mb-4">Book New Appointment</h2>
                <div className="overflow-x-auto">
                    <div className="p-3">
                        {Array.isArray(doctors) && doctors.length > 0 ? (
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Specialization</th>
                                        <th className="border border-gray-300 p-2">Email</th>
                                        <th className="border border-gray-300 p-2">Phone Number</th>
                                        <th className="border border-gray-300 p-2">Experience (Years)</th>
                                        <th className="border border-gray-300 p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map((doctor) => (
                                        <tr key={doctor._id}>
                                            <td className="border border-gray-300 p-2">{doctor.fullName}</td>
                                            <td className="border border-gray-300 p-2">{doctor.specialization}</td>
                                            <td className="border border-gray-300 p-2">{doctor.email}</td>
                                            <td className="border border-gray-300 p-2">{doctor.phoneNumber}</td>
                                            <td className="border border-gray-300 p-2">{doctor.yearsOfExperience}</td>
                                            <td className="border border-gray-300 p-2">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button >Book</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Book Appointment</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                <div className="flex flex-col gap-2">
                                                                    <label htmlFor="notes">Notes</label>
                                                                    <textarea 
                                                                        className="w-full border border-gray-300 rounded-md p-2"
                                                                        id="notes" 
                                                                        value={notes} 
                                                                        onChange={(e) => setNotes(e.target.value)}
                                                                    ></textarea>
                                                                </div>
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleBookAppointment(doctor._id)}>Book Appointment</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No doctors available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 