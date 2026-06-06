import { RouterProvider } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes";

const theme = createTheme({
  typography: {
    fontFamily: '"Raleway", sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}