import React from "react";
import { FirebaseContext } from "./Firebase";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    backgroundColor: "#001A27",
    color: "white",
    padding: theme.spacing(1, 6),
  },
  inputField: {
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  customerDataContainer: {
    paddingTop: "56px",
    maxWidth: theme.breakpoints.width("md"),
  },
  border: {
    border: "1px dashed white",
    padding: "10px",
    marginBottom: theme.spacing(2),
  },
  paddingSide: {
    padding: theme.spacing(0, 2.2),
    maxWidth: 300,
  },
  claimBtn: {
    marginTop: "20px",
  },
}));

export default function AppContent() {
  const classes = useStyles();
  const {
    register: unqNum,
    errors: unqNumError,
    handleSubmit: getUnqNum,
  } = useForm();

  const {
    register: billAmt,
    errors: billAmtError,
    handleSubmit: getBillAmt,
    reset: resetBillAmt,
  } = useForm();

  const Firebase = React.useContext(FirebaseContext);
  const [customerData, setCustomerData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const validateInput = (val) => {
    switch (val.length) {
      case 8:
        return /^[0-9]{8}$/.test(val);

      case 10:
        return /^[9876]\d{9}$/.test(val);

      default:
        return false;
    }
  };

  const submitHandler = ({ uniqueNumber }) => {
    resetBillAmt();
    setCustomerData(null);
    Firebase.fetchCustomerData(uniqueNumber, setCustomerData).then((status) => {
      switch (status) {
        case 200:
          enqueueSnackbar("Customer Data Successfully Fetched");
          break;

        case 404:
          enqueueSnackbar(
            "Customer data does not exist, kindly add them as a new customer"
          );
          break;

        default:
          enqueueSnackbar("Some Unexpected Error Occured");
          break;
      }
    });
  };

  const updateHandler = ({ billAmount }) => {
    Firebase.updateCustomerData(billAmount, customerData, setCustomerData).then(
      (status) => {
        switch (status) {
          case 200:
            enqueueSnackbar("Points Successfully Added");
            break;

          case 404:
            enqueueSnackbar(
              "Points Successfully Added, please refresf to view changes"
            );
            break;

          default:
            enqueueSnackbar("Some Unexpected Error Occured");
            break;
        }
      }
    );
  };

  const handleReset = ({ phoneNumber, cardNumber, points }) => {
    Firebase.resetCustomerPoints(
      phoneNumber,
      cardNumber,
      points,
      setCustomerData
    ).then((status) => {
      switch (status) {
        case 200:
          enqueueSnackbar("Points Successfully Claimed");
          break;

        default:
          enqueueSnackbar("Some Unexpected Error Occured");
          break;
      }
    });
    setOpen(false);
  };

  return (
    <Container className={classes.contentContainer}>
      <form noValidate onSubmit={getUnqNum((data) => submitHandler(data))}>
        <TextField
          id='unique number'
          label='Enter Customers Phone Number/Card Number'
          type='text'
          name='uniqueNumber'
          color='primary'
          className={classes.inputField}
          variant='outlined'
          InputProps={{
            style: { color: "white" },
            endAdornment: (
              <button
                type='submit'
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  outline: "none",
                }}
              >
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              </button>
            ),
          }}
          inputRef={unqNum({ validate: (value) => validateInput(value) })}
          error={unqNumError.uniqueNumber}
          helperText={
            unqNumError.uniqueNumber &&
            "Invalid Input ( must be an 8 or 10 digit number)"
          }
          style={{ width: 400 }}
          autoComplete=''
        />
      </form>
      {!!customerData && (
        <>
          <Grid container className={classes.customerDataContainer}>
            <Grid item xs={4}>
              <Typography variant='h6' className={classes.border}>
                <b>Customer Name</b>
              </Typography>
              <Typography variant='h6' className={classes.paddingSide}>
                {customerData.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6' className={classes.border}>
                <b>Current Points</b>
              </Typography>
              <Typography variant='h6' className={classes.paddingSide}>
                {customerData.points}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6' className={classes.border}>
                <b>Current Bill Amount</b>
              </Typography>
              <Typography variant='h6' className={classes.paddingSide}>
                <form
                  noValidate
                  onSubmit={getBillAmt((data) => updateHandler(data))}
                >
                  <TextField
                    id='bill amount'
                    label='Enter Bill Amount'
                    type='text'
                    name='billAmount'
                    color='primary'
                    className={classes.inputField}
                    variant='outlined'
                    InputProps={{
                      style: { color: "white" },
                      endAdornment: (
                        <button
                          type='submit'
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                            outline: "none",
                          }}
                        >
                          <InputAdornment position='end'>
                            <AddIcon />
                          </InputAdornment>
                        </button>
                      ),
                    }}
                    inputRef={billAmt({
                      required: true,
                      pattern: /^[0-9]*$/,
                    })}
                    error={billAmtError.billAmount}
                    helperText={billAmtError.billAmount && "Must be a number"}
                    size='small'
                  />
                </form>
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.claimBtn}>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                variant='contained'
                color='primary'
              >
                Claim Points for Customer
              </Button>
            </Grid>
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Claim Customer Points?"}</DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "black" }}>
                By clicking this button , the customers points will be reset to
                0. Click the 'Claim' button below to proceed
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleReset(customerData)}
                variant='outlined'
                color='secondary'
                autoFocus
              >
                Claim
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}
