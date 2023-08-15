import React, {    useState,} from 'react';

import { 
    Dropdown,
    Link,
    Header,
    HeaderContainer,
    HeaderName,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    Theme
} from '@carbon/react';

import { Home } from '@carbon/icons-react';



const printers = [
    {
        text: 'Nurses Office Label Printer',
        ip: '10.10.10.132',
    },
    {
        text: 'Maintenance Label Printer',
        ip:'10.10.10.133',
    },
    {
        text: 'Admin Label Printer',
        ip: '10.10.10.134',
    },
    {
        text: 'Laboratory Label Printer',
        ip: '10.10.10.135',
    },
]


// We bring in props for our parent function to update printer IP
const NavHeader = (props) => {

    const handleChangePrinter = (e) => {
        console.log("Settting Printer to " + e.selectedItem.text);
        var printerIP = e.selectedItem.ip;
        props.onDataChange(printerIP);
    }

    const getPrinter = (printerIP) => {
        const printer = printers.find(({ ip }) => ip === printerIP);
        return printer;
    };
  

    return (
    
        <Header aria-label="Annoor Label Printer">
            <Link href="https://10.10.10.245" renderIcon={Home} />
            <HeaderName as={Link} to="/" prefix="Annoor">Label Printer</HeaderName>
            <HeaderNavigation aria-label="Label Printer">
                <HeaderMenuItem as={Link} to="/patient_search">Patient Search</HeaderMenuItem>
                <HeaderMenuItem as={Link} to="/custom_print">Design Custom Print</HeaderMenuItem>
                <HeaderMenuItem as={Link} to="/history">History</HeaderMenuItem>
                
            </HeaderNavigation>
            <HeaderGlobalBar>
                <Dropdown 
                    className="printer-dropdown" 
                    id="printer-select" 
                    label=" Select Printer" 
                    type="inline" 
                    onChange={handleChangePrinter} 
                    items={printers} 
                    itemToString={item => item ? item.text :''}
                    selectedItem={ props.data ? getPrinter(props.data) : ''}
                />
            </HeaderGlobalBar>
        </Header>
    );
}

export default NavHeader;