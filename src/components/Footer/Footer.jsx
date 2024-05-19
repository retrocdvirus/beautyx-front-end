import { Box, Grid, Typography, styled } from "@mui/material";

function Footer() {
  return (
    <FooterContainer container spacing={{ xs: 6 }}>
      <Grid item xs={12} md={4}>
        <FooterBrandName>BeautyX</FooterBrandName>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <FooterTitle>Information</FooterTitle>
          <FooterInfo>Register</FooterInfo>
          <FooterInfo>Login</FooterInfo>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <FooterTitle>Contacts</FooterTitle>
          <FooterInfo>
            99 Nguyen Van Street, District 7, Ho Chi Minh CIty
          </FooterInfo>
          <FooterInfo>(+84) 0937 678 980</FooterInfo>
          <FooterInfo>beautyx@gmail.com</FooterInfo>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <FooterCopyright>&copy; 2023 BeautyX Limited</FooterCopyright>
      </Grid>
    </FooterContainer>
  );
}

const FooterContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "0 14px",
  [theme.breakpoints.up("xs")]: {
    marginTop: "72px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "0 40px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 60px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 82px",
  },
}));

const FooterBrandName = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  color: theme.palette.text.main,
  fontWeight: theme.typography.Bold,
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    fontSize: "34px",
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.text.main,
  fontWeight: theme.typography.SemiBold,
}));

const FooterInfo = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: theme.palette.text.main,
  fontWeight: theme.typography.Light,
}));

const FooterCopyright = styled(Typography)(({ theme }) => ({
  color: "#fff",
  textAlign: "center",
  marginBottom: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));

export default Footer;
