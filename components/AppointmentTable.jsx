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
        field: "patient",
        headerName: "Patient",
        width: 125,
        editable: false,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "doctor",
        headerName: "Doctor",
        sortable: false,
        width: 125,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 140,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "date",
        headerName: "Date",
        width: 140,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "time",
        headerName: "Time",
        sortable: false,
        width: 160,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "createdAt",
        headerName: "Appointment At",
        width: 160,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "updatedAt",
        headerName: "Updated At",
        width: 160,
        headerAlign: "center",
        align: "center",
    },
];

export function AppointmentTable() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/appointments");
                const appointmentsData = response.data.data.map((appointment, index) => ({
                    sno: index + 1,
                    id: appointment._id, // Ensure you have a unique ID for each doctor
                    patient: appointment.patient.fullName,
                    doctor: appointment.doctor.fullName,
                    status: appointment.status,
                    notes: appointment.notes,
                    date: new Date(appointment.date).toLocaleDateString({
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    time: appointment.time,
                    createdAt: new Date(appointment.createdAt).toLocaleDateString(), // Format date as needed
                    updatedAt: new Date(appointment.updatedAt).toLocaleDateString(), // Format date as needed
                }));
                setAppointments(appointmentsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDoctors();
    }, []);

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(appointments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "Appointments_Data.xlsx");
    };

    return (
        <>
                <Box sx={{ width: "100%", padding: 2 }} className="bg-white rounded-lg shadow-md">

                <div className="flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">Appointments List</h1>
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
                    rows={appointments}
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