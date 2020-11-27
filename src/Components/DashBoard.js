import React from "react";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import NewCustomerDialog from "./NewCustomerDialog";
import AppContent from "./AppContent";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    backgroundColor: "#001A27",
    color: "white",
    minHeight: "100vh",
  },
  appBar: {
    backgroundColor: "#001A27",
  },
  toolBar: {
    padding: theme.spacing(1, 6),
  },
  title: {
    flexGrow: 1,
    fontSize: "3.2em",
    fontWeight: "600",
    fontFamily: `"Times New Roman", Times, serif`,
    color: "white",
  },
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
}));
function Dashboard() {
  const classes = useStyles();

  const [isDialogueOpen, setDialogueOpen] = React.useState(false);

  const handleDialog = (event) => {
    setDialogueOpen(true);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Container
        maxWidth={false}
        disableGutters
        className={classes.appContainer}
      >
        <AppBar position='static' elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Typography className={classes.title}>
              The<font color='#FF00C4'>Dot</font>
            </Typography>
            <Button
              variant='contained'
              onClick={handleDialog}
              startIcon={<AddIcon />}
            >
              Add Customer
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <AppContent />
        <NewCustomerDialog open={isDialogueOpen} setOpen={setDialogueOpen} />
      </Container>
    </SnackbarProvider>
  );
}

export default Dashboard;
