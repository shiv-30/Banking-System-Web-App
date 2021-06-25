import React from "react";
import { Container, AppBar, Typography} from "@material-ui/core";
// import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import bank from "./images/bank.jpg";

import Home from "./components/Home/Home.js";
import Customers from './components/Customers/Customers.js'
import Customer from './components/Customer/Customer.js'
import Transaction from './components/Transaction/Transaction.js'

import useStyles from "./style";

// import { getPosts } from "./actions/posts";

const App = () => {
  const classes = useStyles();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Banking System
          </Typography>
          <img
            className={classes.image}
            src={bank}
            alt="memories"
            height="60"
          />
        </AppBar>
      </Container>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/customer/:id" exact component={Customer} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/transaction/:id" exact component={Transaction} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
