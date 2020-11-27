import React from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { FirebaseContext } from "./Firebase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  standardPadding: {
    padding: theme.spacing(2, 4),
    justifyContent: "flex-start",
  },
  saveBtn: {
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  border: {
    border: "1px solid lightgreen",
    marginLeft: "-10px ",
    padding: "10px",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2, 4),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      style={{ maxHeight: "15px" }}
      {...other}
    >
      <Typography variant='h5' style={{ marginTop: "5px" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const BlackTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

export default function NewCustomerDialog({ open, setOpen }) {
  const classes = useStyles();
  const Firebase = React.useContext(FirebaseContext);
  const { register, handleSubmit, errors } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = ({
    customerName,
    phoneNumber,
    cardNumber,
    billAmount,
  }) => {
    Firebase.addNewCustomer(customerName, phoneNumber, cardNumber, billAmount)
      .then(() => {
        enqueueSnackbar("User Successfully Added");
        setOpen(false);
      })
      .catch(() =>
        enqueueSnackbar(
          "ERROR! please add the User again (check internet connection) "
        )
      );
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} maxWidth={"xs"}>
        <form noValidate onSubmit={handleSubmit((data) => submitHandler(data))}>
          <DialogTitle onClose={handleClose}>New Customer</DialogTitle>
          <DialogContent className={classes.standardPadding}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant='caption'
                  paragraph
                  className={classes.border}
                >
                  Input the valid customer data into all below fields and press
                  the 'SAVE' button to add the new customer.
                  <br />
                  <b>*NOTE: Phone numbers must start with 6, 7, 8 or 9</b>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <BlackTextField
                  variant='outlined'
                  margin='normal'
                  id='name'
                  label='Customer Name'
                  name='customerName'
                  autoComplete='name'
                  color='secondary'
                  InputLabelProps={{ style: { color: "black" } }}
                  fullWidth
                  size='small'
                  inputRef={register({
                    required: true,
                    pattern: /^[a-zA-Z\s]+$/,
                  })}
                  error={errors.customerName}
                  helperText={
                    errors.customerName &&
                    "Invalid Input (only a-z/A-Z and space allowed)"
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <BlackTextField
                  variant='outlined'
                  margin='normal'
                  id='phone_number'
                  label='Phone Number'
                  name='phoneNumber'
                  color='secondary'
                  InputLabelProps={{ style: { color: "black" } }}
                  fullWidth
                  size='small'
                  inputRef={register({
                    required: true,
                    pattern: /^[9876]\d{9}$/,
                  })}
                  error={errors.phoneNumber}
                  helperText={
                    errors.phoneNumber && "Invalid Input (must have 10 digits)"
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <BlackTextField
                  variant='outlined'
                  margin='normal'
                  id='card_number'
                  label='Card Number'
                  name='cardNumber'
                  color='secondary'
                  InputLabelProps={{ style: { color: "black" } }}
                  fullWidth
                  size='small'
                  inputRef={register({ required: true, pattern: /^[0-9]{8}$/ })}
                  error={errors.cardNumber}
                  helperText={
                    errors.cardNumber && "Invalid Input (must have 8 digits)"
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <BlackTextField
                  variant='outlined'
                  margin='normal'
                  id='bill_amount'
                  label='Current Bill Amount'
                  name='billAmount'
                  color='secondary'
                  InputLabelProps={{ style: { color: "black" } }}
                  fullWidth
                  size='small'
                  inputRef={register({ required: true, pattern: /^[0-9]*$/ })}
                  error={errors.billAmount}
                  helperText={
                    errors.billAmount && "Invalid Input (only numbers allowed)"
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.standardPadding}>
            <Button
              color='secondary'
              startIcon={<SaveIcon />}
              className={classes.saveBtn}
              type='submit'
            >
              <b>SAVE</b>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
