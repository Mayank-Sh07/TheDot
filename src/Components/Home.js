import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    backgroundColor: "#001A27",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "8em",
    fontWeight: "800",
    fontFamily: `"Times New Roman", Times, serif`,
    color: "white",
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      disableGutters
      className={classes.homeContainer}
    >
      <Typography className={classes.title}>
        The<font color='#FF00C4'>Dot</font>
      </Typography>
    </Container>
  );
}

export default Home;
