import React from 'react';
import { Button } from '@carbon/react';
import { Printer } from '@carbon/icons-react';



const PrintButton = (props) => {
    return (
        <Button renderIcon={Printer} iconDescription="printer" onClick={props.onClick}>Print</Button>
    )
}

export default PrintButton