import React from 'react'
import styled from "styled-components";
import CustomizedTable from './CustomizedTable'

const Customers = () => {
    return (
        <>
          <Container>
            <CustomizedTable/>
          </Container>
        </>
    )
}

export default Customers

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

