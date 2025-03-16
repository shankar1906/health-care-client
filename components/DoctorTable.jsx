import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library

const columns = [
    {
        field: "sno",
        headerName: "S.No",
        width: 90,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: "id",
        headerName: "ID",
        width: 90,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: "fullName",
        headerName: "Full Name",
        width: 110,
        editable: false,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "email",
        headerName: "Email",
        sortable: false,
        width: 110,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "specialization",
        headerName: "Specialization",
        width: 150,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "yearsOfExperience",
        headerName: "Experience",
        width: 130,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "hospitalClinicName",
        headerName: "Hospital/Clinic",
        sortable: false,
        width: 160,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "createdAt",
        headerName: "Registered At",
        width: 160,
        headerAlign: "center",
        align: "center",
    },
];

export function DoctorTable() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/doctors");
                const doctorsData = response.data.data.map((doctor, index) => ({
                    sno: index + 1,
                    id: doctor._id, // Ensure you have a unique ID for each doctor
                    fullName: doctor.fullName,
                    email: doctor.email,
                    phoneNumber: doctor.phoneNumber,
                    specialization: doctor.specialization,
                    yearsOfExperience: doctor.yearsOfExperience,
                    hospitalClinicName: doctor.hospitalClinicName,
                    createdAt: new Date(doctor.createdAt).toLocaleDateString(), // Format date as needed
                }));
                setDoctors(doctorsData);
                console.log("doctorsData", doctorsData.length)
            } catch (error) {
                console.log(error);
            }
        };
        fetchDoctors();
    }, []);

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(doctors);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "Doctors_Data.xlsx");
    };

    return (
        <>
            <Box sx={{ width: "100%", padding: 2 }} className="bg-white rounded-lg shadow-md">

                <div className="flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">Doctors List</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={exportToExcel}
                        sx={{ marginBottom: 2 }}
                    >
                        <Download />
                    </Button>
                </div>
                <DataGrid
                    rows={doctors}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[3]}
                    disableRowSelectionOnClick
                    sx={{
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#d3d3d3", // Light Gray Background
                            color: "#000000", // Black Text
                            fontSize: "16px",
                            textAlign: "center",
                            justifyContent: "center",
                            display: "flex",
                            width: "100%",
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            textAlign: "center", // Centers column header text
                            justifyContent: "center",
                            display: "flex",
                            width: "100%",
                        },
                        "& .MuiDataGrid-cell": {
                            textAlign: "center", // Centers cell text
                        },
                    }}
                />
            </Box>
        </>
    );
}