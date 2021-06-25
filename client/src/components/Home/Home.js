import React from 'react'
import styled from "styled-components";
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import image from '../../images/bank.jpg'



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});




const Home = () => {
  const classes = useStyles();
    return (
        <>
          <Container style={{alignItems: 'center', marginLeft:'auto', marginRight:'auto'}}>
               <img src={image} alt={"allbank"} height="300px" width="400px" style={{ alignItems: 'center', marginLeft:'32%', marginRight:'30%'}}/>
                <Link to="/customers" style={{textDecoration:"none", alignItems: 'center', marginLeft:'40%', marginRight:'40%'}}>
            
            
              
            <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          View Customers
        </Button>
      </ThemeProvider>
            </Link>
            
          </Container>  
        </>
    )
}

export default Home

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  align-items: "center";
  text-align: "center";
`;

// const Button = styled.a`
//   text-decoration:none;
//   display: flex;
//   justify-content: center;
//   background-color: #33cc33;
//   color:#fff;
//   align-items: center;
//   height: 56px;
//   width: 20%;
//   border-radius: 28px;
//   box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
//     inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);

//   vertical-align: middle;
//   z-index: 0;
//   transition-duration: 167ms;
//   font-size: 20px;
//   padding-left:auto;
//   padding-right:auto;
//   &:hover {
//     background-color: rgba(207, 207, 207, 0.25);
//     color: rgba(0, 0, 0, 0.75);
//   }
// `;