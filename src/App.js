import logo from './logo.svg';
import './app.scss';
import { Route, Routes, } from 'react-router';
import { Content, FlexGrid, Row, Column } from '@carbon/react';
import React, { Component, useState, useEffect } from 'react';
import NavHeader from './components/NavHeader';
import PatientSearch from './components/PatientSearch';


function load(key) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : [];
}

function App()  {
  // Define a function for updating state in this parent App, which we can pass to child components (i.e. NavHeader).
  function updatePrinterIP(ip) {
    console.log("New Printer IP: " + ip);
    setPrinterIP(ip);
  }
  // Then set some React useState hooks for 'global' (but session-specific) variables
  const [printerIP, setPrinterIP] = useState(() => load('printerIP'));

  useEffect(() => {
    sessionStorage.setItem('printerIP',JSON.stringify(printerIP));
  }, [printerIP]);


  const IntroText = (
    <FlexGrid>
          <Row>
            <Column sm={4} md={6} lg={8}>
            <h3>
              Welcome to the Label Printer application - to get started choose your label printer in the top right and then select an option from the top to start printing. <br/><br/>Current printer: {printerIP}
            </h3>
            </Column>
          </Row>
        </FlexGrid>
  );
  // Main App return
  return (
  <>

    <NavHeader data={printerIP} onDataChange={updatePrinterIP}/>
    <Content>
      <Routes>
        <Route exact path="/" element={IntroText}/>
        <Route path="patient_search" element={PatientSearch}/>
      </Routes>
    </Content>
  </>
  );
}

export default App;
