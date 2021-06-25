import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    textDecoration: 'none',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, name, email, accno, cur_bal) {
  return {id, name, email, accno, cur_bal};
}

const rows = [
  createData('1001', 'Ram ', 'Ram@gmail.com', 'b10002bc', 'Rs 100000'),
  createData('1002', 'Shyam', 'Shyam@gmail.com', 'c10002bc', 'Rs 20000'),
  createData('1003', 'Kiren', 'Kiren@gmail.com', 'd10002bc', 'Rs 500000'),
  createData('1004', 'Sita', 'Sita@gmail.com', 'e10002bc', 'Rs 100'),
  
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTable() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);

  useEffect(()=> {
      axios.get('https://bank-system-shiv3.herokuapp.com/api/allcustomers')
      .then(res=> {
        const {data} = res;
        console.log("hello")
        setCustomers(data.customers);
        console.log(data.customers);
      })
      .catch(err => {
        console.log(err)
      })
      console.log("hello");
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Account No</StyledTableCell>
            <StyledTableCell align="center">Current Balance</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers &&
            customers.map((customer) => (
              <StyledTableRow key={customer._id}>
                <StyledTableCell component="th" scope="row">
                  <a href={`/customer/${customer._id}`} style={{textDecoration:"none", color:"black"}}>{customer._id}</a>
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {customer.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {customer.accno}
                </StyledTableCell>
                <StyledTableCell align="center">
                 $ {customer.cur_bal}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <Link to="/" style={{textDecoration:"none"}}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="secondary"
              size="small"
              
              
            >
            
              Go Back
            </Button>
      </Link>
      </Table>
    </TableContainer>
  );
}

