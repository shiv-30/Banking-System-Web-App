import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useParams} from 'react-router-dom'

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




const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TransactionTable() {
  const classes = useStyles();
  const [transactionList, setTransactionList] = useState([]);
  const {id} = useParams();
  useEffect(()=> {
      axios.get('https://bank-system-shiv3.herokuapp.com/api/alltransaction')
      .then(res=> {
        const {data} = res;
        console.log(data.transactions)
        setTransactionList(data.transactions);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction Id</StyledTableCell>
            <StyledTableCell align="center">From</StyledTableCell>
            <StyledTableCell align="center">From Account No</StyledTableCell>
            <StyledTableCell align="center">To</StyledTableCell>
            <StyledTableCell align="center">To Account No</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList &&
            transactionList.map((tran) => (
              <StyledTableRow key={tran._id}>
                <StyledTableCell component="th" scope="row">
                  {tran._id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tran.from.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tran.fromAccno}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tran.to.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {tran.toAccno}
                </StyledTableCell>
                <StyledTableCell align="center">
                  $ {tran.amount}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <Link to={`/customer/${id}`} style={{textDecoration:"none"}}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="secondary"
              size="small"
              
              
            >
            
              Go Back
            </Button>
            </Link>
    </TableContainer>
  );
}

