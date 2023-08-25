import React from 'react';
import {useState} from 'react';
import { FlexGrid, Row, Column, Popover, PopoverContent, NumberInput } from '@carbon/react';
import PrintButton from '../PrintButton';

const PrintDialog = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Popover autoAlign open={open} onRequestClose={() => setOpen(false)}>
            <PrintButton onClick={() => {
                setOpen(!open); 
            }}/>
            <PopoverContent>
                <FlexGrid fullWidth>
                <Row>
                    <Column lg={{span: 4, offset: 6}}>
                    <p>
                        Line 1
                    </p>
                    </Column>
                </Row>
                <Row>
                    <p>
                        Line 2
                    </p>
                </Row><Row>
                    <p>
                        Line 3
                    </p>
                </Row>
                <Row>
                    <Column sm={3} md={6} lg={12}>
                        <NumberInput id="print-copies" min={1} max={100} value={1} label="Amount of Copies" invalidText="Please enter a number between 1 and 100"/>
                    </Column>
                    <Column sm={1} md={2} lg={4}>
                        <PrintButton/>
                    </Column>       
                </Row>
            </FlexGrid>
            </PopoverContent>
        </Popover>
        </>
    );
}

export default PrintDialog;