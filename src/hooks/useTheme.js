import { useState, useCallback, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

function useTheme() {
  const [mode, setMode] = useState("light")

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#f50057" },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
          h6: { fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none" },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
              },
            },
          },
        },
      }),
    [mode]
  )

  return { mode, toggleTheme, theme }
}

export default useTheme
