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
        width: 60,
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
        headerName: "Name",
        width: 150,
        editable: false,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "email",
        headerName: "Email",
        sortable: false,
        width: 150,
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
        field: "gender",
        headerName: "Gender",
        width: 120,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "age",
        headerName: "Age",
        width: 110,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "medicalHistory",
        headerName: "Medical History",
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

export function PatientTable() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:5000/patients");
                const patientsData = response.data.data.map((patient, index) => ({
                    sno: index + 1,
                    id: patient._id, // Ensure you have a unique ID for each doctor
                    fullName: patient.fullName,
                    email: patient.email,
                    phoneNumber: patient.phoneNumber,
                    gender: patient.gender,
                    age: patient.age,
                    medicalHistory: patient.medicalHistory,
                    createdAt: new Date(patient.createdAt).toLocaleDateString(), // Format date as needed
                }));
                setPatients(patientsData);
                console.log("patientsData", patientsData.length)
            } catch (error) {
                console.log(error);
            }
        };
        fetchPatients();
    }, []);

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(patients);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "Patients_Data.xlsx");
    };

    return (
        <>
            <Box sx={{ width: "100%", padding: 2 }} className="bg-white rounded-lg shadow-md">

                <div className="flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">Patients List</h1>
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
                    rows={patients}
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