import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  maxBound: "1280px",
  palette: {
    primary: {
      main: "#65A98C",
      background: "#FFFFFF",
      ComponentBackground: "#E8F2EE",
      ComponentBackgroundHovered: "#E8F2EE",
      light: "#ACB1B3",
    },
    secondary: {
      main: "#175C4C",
      background: "#175C4C",
      hovered: "rgba(23, 92, 76, 0.4)",
      light: "rgba(23, 92, 76, 0.2)",
    },
    background: {
      default: "#FFF",
      card: "#FFFFFF",
      box: "#EBEBEB",
    },
    text: {
      main: "#FFFFFF",
      HighContrastText: "#263238",
      LowContrastText: "#252525",
    },
    success: {
      main: "#4caf50",
      hovered: "#4caf90",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff2b00",
    },
    info: {
      main: "#2196f3",
    },
  },
  typography: {
    fontFamily: "Poppins",
    Light: 300,
    Regular: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
  },
  shape: {
    round: "50%",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: [0, 4, 8, 16, 20, 32, 40, 64, 72, 128, 256, 400, 512, 600], //Space and Size
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disable the ripple effect of all buttons on the whole application!
      },
    },
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
    },
  },
});
