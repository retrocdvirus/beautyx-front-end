import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

const spashopslists = [
  { title: "Alma Beauty Salon", id: 1994 },
  { title: "The Beauty Salon 2", id: 1972 },
  { title: "Salon Woodle", id: 1974 },
];

export default function SearchBar() {
  const [searchStr, setSearchStr] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = searchStr.replace(/ /g, "+");
    navigate(`/shops/${search}`);
  };

  return (
    <SearchBarWrapper>
      <SearchBarHeading>BeautyX</SearchBarHeading>

      <SearchBarDescription>
        Search for beauty care services and book appointments
      </SearchBarDescription>

      <SearchBarSection>
        <SearchToolbar
          freeSolo
          disableClearable
          options={spashopslists.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search beauty services, and salons"
              hiddenLabel
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start" sx={{ height: "100%" }}>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBarSection>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
}));

const SearchBarHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.Bold,
  fontSize: 30,
  [theme.breakpoints.up("md")]: {
    fontSize: 50,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 64,
  },
}));

const SearchBarDescription = styled(Typography)(({ theme }) => ({
  marginBottom: 22,
  fontSize: 22,
  [theme.breakpoints.up("md")]: {
    fontSize: 28,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 34,
    marginBottom: 30,
  },
}));

const SearchBarSection = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  [theme.breakpoints.up("md")]: {
    gap: 0,
    alignItems: "stretch",
    flexDirection: "row",
  },
}));

const SearchToolbar = styled(Autocomplete)(({ theme }) => ({
  height: 52,
  width: "100%",
  "& .MuiInputBase-root": {
    height: 52,
    fontSize: 18,
    borderRadius: "18px",
    color: "#797979",
  },
  "& .MuiSvgIcon-root": {
    width: 26,
    height: 26,
    color: "#797979",
  },
  "& .MuiInputBase-hiddenLabel": {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: 12,
  },
  "& .MuiInputAdornment-root": {
    margin: 0,
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #D3D3D3",
  },
  [theme.breakpoints.up("md")]: {
    width: "100%",
    "& .MuiInputBase-root": {
      height: 64,
      borderRadius: "18px 0 0 18px",
    },
    "& .MuiSvgIcon-root": {
      width: 34,
      height: 34,
    },
    "& .MuiInputBase-hiddenLabel": {
      gap: 8,
      padding: 16,
    },
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: 52,
  fontSize: 26,
  borderRadius: 18,
  fontWeight: 400,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.main,
  "&:hover": {
    backgroundColor: `${theme.palette.secondary.main}`,
  },
  [theme.breakpoints.up("md")]: {
    width: "26%",
    height: 64,
    borderRadius: "0 18px 18px 0",
  },
}));
