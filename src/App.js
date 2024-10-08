//import logo from './logo.svg';
import './app.scss';
import { Route, Routes, Outlet } from 'react-router';
import { Content, FlexGrid, Row, Column, Theme } from '@carbon/react';
import React, { useState, useEffect } from 'react';
import NavHeader from './components/NavHeader';
import PatientSearchPage from './content/PatientSearchPage';
import HistoryPage from './content/HistoryPage';
import CustomPrintPage from './content/CustomPrintPage';
import LabOrderPage from './content/LabOrderPage';

function load(key) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : [];
}

function IntroText(props) {
  return (
  <FlexGrid>
        <Row>
          <Column sm={4} md={6} lg={8}>
          <h3>
            Welcome to the Label Printer application - to get started choose an option from the top to start printing. <br/><br/>
          </h3>
          {(process.env.NODE_ENV !== "production") &&
            <p>
              Currently running this application in <strong>{process.env.NODE_ENV}</strong> mode
            </p>
          }
          </Column>
        </Row>
      </FlexGrid>
  );  
}

function UIShell(props) {
  return (
  <>
  <Theme theme="g10">
  <NavHeader data={props.data} onDataChange={props.onDataChange}/>
  </Theme>
  <Content>
    <Outlet/>
  </Content>
  </>
  );
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

  // Main App return
  return (
  <>
      <Routes>
        <Route path="/" element={<UIShell data={printerIP} onDataChange={updatePrinterIP}/>}>
          <Route index element={<IntroText data={printerIP}/>}/>
          <Route path="patient_search" element={<PatientSearchPage/>}/>
          <Route path="history" element={<HistoryPage/>}/>
          <Route path="custom_print" element={<CustomPrintPage/>}/>
          <Route path="lab_order_patients" element={<LabOrderPage/>}/>
        </Route>
      </Routes>
  </>
  );
}



export default App;
