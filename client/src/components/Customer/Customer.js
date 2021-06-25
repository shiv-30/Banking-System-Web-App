import React from 'react'
import styled from "styled-components";
import SingleCustomerTable from "./SingleCustomerTable"
import "./styles.css"

const Customer = () => {
    return (
        <Container>
            <SingleCustomerTable/>
        </Container>
    )
}

export default Customer

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;
