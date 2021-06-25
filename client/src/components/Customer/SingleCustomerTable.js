import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import styled from 'styled-components'
import axios from 'axios'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Typography, TextField, Button} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Transaction from '../Transaction/Transaction'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));



export default function SingleCustomerTable() {
  const {id} = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [toCustomer, setToCustomer] = useState({
    id:"",
    name:"",
    email:"",
    accno:"",
    cur_bal:0
  });
  const [amount, setAmount] = useState(0);
  const [customerList, setCustomerList] = useState([])
  const history = useHistory();
  const [customer, setCustomer] = useState({
    id:"",
    name:"",
    email:"",
    accno:"",
    cur_bal:0
  })
  const handleAmount = (e) => {
    setAmount(e.target.value);
  }
  const getTransactionPage = async () => {
    console.log("hello");
    const data = {
      from:id,
      to:toCustomer._id,
      fromAccno:customer.accno,
      toAccno:toCustomer.accno,
      amount,
      cur_bal:customer.cur_bal,
      toBal:toCustomer.cur_bal
    }
    console.log(data)
    await axios.post("https://bank-system-shiv3.herokuapp.com/api/transfer", data, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
        console.log(res)
        history.push(`/transaction/${id}`);
    })
    .catch(err=> console.log(err));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getTransactionPage();
    
  }
  

  const handleChangeSelect = (event) => {
    setToCustomer(event.target.value);
    console.log(event.target.value);
  };

  

  const all = async (name) => {
      await axios('https://bank-system-shiv3.herokuapp.com/api/allcustomers')
    .then(res => {
      console.log(res.data.customers);
      const allcustomers = (res.data.customers).filter((Singlecustomer)=> {
        return Singlecustomer.name !== name
      })
      
      setCustomerList(allcustomers);
    })
    .catch(err => console.log(err))
  }

  const getCustomer = async () => {
      await axios.get(`https://bank-system-shiv3.herokuapp.com/api/customer/${id}`)
     .then(res => {
       const {name, accno, cur_bal, email} = res.data.customer;
       setCustomer({
         id,
         name,
         email,
         accno,
         cur_bal
       })
       all(name);
     })
     .catch(err => {
       console.log(err);
     })
    }
  
  
  useEffect(()=>{
    
    getCustomer();
  },[])
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} variant="h1">
              Customer Id :
            </Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
            >
              {customer.id}
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} variant="h1">
              Name :
            </Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
            >
              {customer.name}
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Email :</Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
            >
              {customer.email}
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Account No :</Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
            >
              {customer.accno}
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              Current Balance :
            </Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
            >
              $ {customer.cur_bal}
            </Typography>
          </AccordionSummary>
        </Accordion>
        
        <form
          autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
        >
          <Accordion
          expanded={false}
          onChange={handleChange("panel3")}
          className={"accord"}
        >
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} variant="h1">
              <TextField id="standard-number" 
              value={amount} 
              onChange={handleAmount} 
              defaultValue={0} 
              InputProps={{
                      inputProps: { 
                                max: customer.cur_bal, 
                                min: 0
                      }
              }}
              type="number" label="Amount" />
            </Typography>
            <Typography className={classes.heading} variant="h1">
              <TextField
          id="standard-select-customer"
          select
          label="Select"
          value={toCustomer}
          defaultValue=""
          onChange={handleChangeSelect}
          helperText="Please select the customer you want to transfer the amount"
        > 
          {customer && customerList.map((option) => (
            <MenuItem key={option._id} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
            </Typography>
          
          <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
              style={{marginLeft:"10px", marginTop:"18px"}}
            >
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              
            >
            
              Transfer
            </Button>
            </Typography>
            <Typography
              className={`${classes.secondaryHeading} secondaryHeading`}
              style={{marginLeft:"10px", marginTop:"18px"}}
            >
            <Link to="/customers" style={{textDecoration:"none"}}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="secondary"
              size="small"
              
              
            >
            
              Go Back
            </Button>
            </Link>
            </Typography>
          </AccordionSummary>
        </Accordion>
        
        </form>
      </Container>
    </div>
  );
}

const Container = styled.div`
  align-items: "center";
  
`
