import {
  Box,
  Container,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import React from "react";
import Step3 from "../../components/BookingConfirmation/Step3";
import Step2 from "../../components/StylistTimeSelection/Step2";
import Step1 from "../../components/ServiceSelections/Step1";
import { Navigate } from "react-router-dom";

// Set state for each step name of the booking progress
const steps = [
  "Select Service Categories",
  "Select your stylist & Pick Your Date Time",
  "Booking Confirmation",
];

function BookingPage({signedIn, onOpenSignIn, onOpenRegister}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <BookingPageWrapper maxWidth = "false" sx={{maxWidth: "1500px"}}>
      {/* Wrap a component then applied the Stepper component to represent as a progression bar to track each step of booking */}
      <StepperWrapper>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </StepperWrapper>

      <ProgressWrapper>
        {allStepsCompleted() ? (
          <Navigate replace to="/success"/>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                {(() => {
                  if (activeStep === 0) {
                    return <Step1 handleComplete={handleComplete}/>;
                  } else if (activeStep === 1) {
                    return <Step2 handleComplete={handleComplete}/>;
                  } else {
                    return <Step3 handleComplete={handleComplete} signedIn={signedIn} onOpenRegister={onOpenRegister} onOpenSignIn={onOpenSignIn}/>;
                  }
                })()}
            </Box>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box> */}
          </React.Fragment>
        )}
      </ProgressWrapper>
    </BookingPageWrapper>
  );
}

const BookingPageWrapper = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginTop: "8rem",
  maxheight: "100%",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowY: "hidden",
}));

const StepperWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export default BookingPage;
