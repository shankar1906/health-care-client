import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 150,
        editable: false,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        width: 160,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: 'specialization',
        headerName: 'Specialization',
        width: 110,
        headerAlign: "center",
        align: "center",
        editable: false,
        filterable: false,
    },
    {
        field: 'yearsOfExperience',
        headerName: 'Years of Experience',
        width: 110,
        headerAlign: "center",
        align: "center",
        editable: false,
        filterable: false,
    },
    {
        field: 'hospitalClinicName',
        headerName: 'Hospital/Clinic Name',
        sortable: false,
        width: 160,
        headerAlign: "center",
        align: "center",
        filterable: false,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
        headerAlign: "center",
        align: "center",
    },
];

export function DoctorTable() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const doctors = JSON.parse(localStorage.getItem("doctors"));
        if (!doctors) {
            return;
        }
        const doctorsData = doctors.map((doctor, index) => ({
            id: index + 1,
            fullName: doctor.fullName,
            email: doctor.email,
            phoneNumber: doctor.phoneNumber,
            specialization: doctor.specialization,
            yearsOfExperience: doctor.yearsOfExperience,
            hospitalClinicName: doctor.hospitalClinicName,
        }));
        console.log("doctorsData --> ", doctorsData);
        setDoctors(doctorsData);
    }, []);

    return (
        <>
            <Box sx={{ height: 300, width: '100%' }}>
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
