import React from "react";
import styled from "@emotion/styled";
// import Box from "@mui/material/Box";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Container, Grid, Typography} from "@mui/material";
import ShopLists from "../../components/ShopLists/ShopLists";
// import NavBar from '../../components/NavBar/NavBar';

function ShopPage() {


  return (
    <React.Fragment>
      <ResultLayout maxWidth = "false" sx={{maxWidth: "1700px"}}>
        <Grid container rowSpacing={8} columnSpacing={1}>

          <Grid item md={12}>
            <SearchBar />
          </Grid>

          <Grid item md={12}>
              <AltTitle> Search result </AltTitle>
{/* Here represent a single page of a lists which contains spa shops results */}
              <ShopLists />
              
          </Grid>
        </Grid>
      </ResultLayout>
    </React.Fragment>
  );
}

const ResultLayout = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginTop: theme.spacing(9),
  maxHeight: "100%",
  minHeight: "calc(100vh - 70px)",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "hidden",
}));

const AltTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.Bold,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));


export default ShopPage;
