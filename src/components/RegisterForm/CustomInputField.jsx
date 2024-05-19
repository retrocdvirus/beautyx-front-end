import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomInputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    color: "#575757",
    borderRadius: "10px",
    backgroundColor: "#F0F0F0",
    fontSize: "0.8rem",
  },
  "& .MuiInputBase-input": {
    padding: "8px 18px",
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiInputBase-root": {
      fontSize: "1rem",
    },
    "& .MuiInputBase-input": {
      padding: "10px 18px",
    },
  },
}));

export default CustomInputField;
