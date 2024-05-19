import { Box, Grid, Typography, styled, Avatar } from "@mui/material";
// import Image from "mui-image";
import theTeamData from "../../fakeAPI/theTeamData";

function TheTeamSection() {
  return (
    <TheTeamWrapper>
      <Grid container>
        <Grid item xs={12}>
          <TheTeamTitle> The Team behind BeautyX </TheTeamTitle>
        </Grid>

        <Grid
          container
          spacing={{ xs: 5 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          {theTeamData.map((member, index) => (
            <MemberContainer item xs={6} sm={4} md={4} lg={3} key={index}>
              <Avatar src={member.image} alt={member.member} />
              <Typography className="member-name">{member.member}</Typography>
              <Typography className="member-role">{member.role}</Typography>
            </MemberContainer>
          ))}
        </Grid>
      </Grid>
    </TheTeamWrapper>
  );
}

const TheTeamWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginBottom: "70px",
  [theme.breakpoints.up("sm")]: {
    marginBottom: "80px",
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: "90px",
  },
  [theme.breakpoints.up("lg")]: {
    marginBottom: "120px",
  },
}));

const TheTeamTitle = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  textAlign: "center",
  color: "#000",
  fontWeight: theme.typography.Bold,
  marginBottom: "14px",
  [theme.breakpoints.up("sm")]: {
    marginBottom: "18px",
    fontSize: "32px",
  },
}));

const MemberContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  "& .MuiTypography-root": {
    lineHeight: "100%",
    textAlign: "center",
  },
  "& .MuiAvatar-root": {
    width: "120px",
    height: "120px",
  },
  "& .member-name": {
    fontSize: "20px",
    fontWeight: 700,
  },
  "& .member-role": {
    fontSize: "18px",
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiAvatar-root": {
      width: "130px",
      height: "130px",
    },
    "& .member-name": {
      fontSize: "22px",
    },
    "& .member-role": {
      fontSize: "20px",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiAvatar-root": {
      width: "140px",
      height: "140px",
    },
    "& .member-name": {
      fontSize: "24px",
    },
    "& .member-role": {
      fontSize: "22px",
    },
  },
}));

export default TheTeamSection;
