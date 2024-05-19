import { Box, Grid, TextField, Typography, styled } from "@mui/material";
import React from "react";
import FacebookButton from "../ThirdPartyButton/FacebookButton";
import GoogleButton from "../ThirdPartyButton/GoogleButton";
import BookingReceipt from "../BookingReceipt/BookingReceipt";

function BookingConfirmation({ signedIn, user, onOpenRegister, onOpenSignIn}) {
  return (
    <React.Fragment>
      <BookingWrapper>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={10}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {signedIn ? (
            <>
            <Grid item xs={4} sm={4} md={5}>
              <ReceiptTitle sx={{ py: 1 }}> Note </ReceiptTitle> 
              <TextField
                hiddenLabel
                id="filled-multiline-static"
                multiline
                rows={4}
                placeholder="Add note"
                variant="filled"
                sx={{ width: "100%", my: 2}}
              /> 
            </Grid>
            </>
          ) : (
            <>
            <Grid item xs={4} sm={4} md={5}>
              <FacebookButton onOpenSignIn={onOpenSignIn}/>
              <GoogleButton onOpenRegister={onOpenRegister}/>
              <Typography sx={{ my: 2 }}>
                {" "}
                *Payment: You will pay directly at the location.{" "}
              </Typography>
            </Grid>
            </>
          )}

          <Grid item xs={4} sm={4} md={7}>
            <BookingReceipt signedIn={signedIn} user={user} />
          </Grid>
        </Grid>
      </BookingWrapper>
    </React.Fragment>
  );
}

const BookingWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(2),
}));

const ReceiptTitle = styled(Typography)(({ theme }) => ({
  // textAlign: "center",
  fontSize: "1.8rem",
  color: "#000",
  fontWeight: theme.typography.Bold,
}));

export default BookingConfirmation;
