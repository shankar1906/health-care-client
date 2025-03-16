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
        width: 160,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: "doctor",
        headerName: "Doctor Name",
        sortable: false,
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "patient",
        headerName: "Patient Name",
        width: 150,
        editable: false,
        headerAlign: "center",
        align: "center",
    },

    {
        field: "medicine",
        headerName: "Medicine",
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "dosage",
        headerName: "Dosage",
        width: 150,
        headerAlign: "center",
        align: "center",
        editable: false,
    },
    {
        field: "frequency",
        headerName: "Frequency",
        sortable: false,
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "createdAt",
        headerName: "Prescription At",
        width: 160,
        headerAlign: "center",
        align: "center",
    },
];

export function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/prescriptions");
                const prescriptionsData = response.data.data.map((prescription, index) => ({
                    sno: index + 1,
                    id: prescription._id, // Ensure you have a unique ID for each doctor
                    patient: prescription.patient.fullName,
                    doctor: prescription.doctor.fullName,
                    medicine: prescription.medicine,
                    dosage: prescription.dosage,
                    frequency: prescription.frequency,
                    createdAt: new Date(prescription.createdAt).toLocaleDateString(), // Format date as needed
                }));
                setPrescriptions(prescriptionsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPrescriptions();
    }, []);

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(prescriptions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Prescriptions");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "Prescriptions_Data.xlsx");
    };

    return (
        <>
            <Box sx={{ width: "100%", padding: 2 }} className="bg-white rounded-lg shadow-md">

                <div className="flex justify-between mb-2">
                    <h1 className="text-2xl font-bold">Prescriptions List</h1>
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
                    rows={prescriptions}
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
                />
            </Box>
        </>
    );
}