import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          backgroundColor: "#d3d3d3", // Light Gray Background
          color: "#000000", // Black Text
        },
      },
    },
  },
});

export default theme;
