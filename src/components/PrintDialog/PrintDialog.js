import React, { useEffect } from 'react';
import {useState} from 'react';
import { FlexGrid, Row, Column, Popover, PopoverContent, NumberInput } from '@carbon/react';
import PrintButton from '../PrintButton';
import SetupPrinter from './PrintLogic';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection:'row',
        backgroundColor: "#E4E4E4"
    },
    section: {
        margin: 2,
        padding: 5,
        flexGrow: 1
    }
})


{/*
const generatePDF = async (lines) => {
    const doc = new pdf.Document({
        font: Helvetica,
        width: 45 * pdf.mm,
        height: 23 * pdf.mm,
        lineHeight: 1,
        paddingLeft: 0,
        paddingRight: 0,
    });
    lines.forEach((line) => {
        doc.text(line, {fontSize: 12.5, font: Helvetica, textAlign: "center"});
    });
    
    const docBuf = await doc.asBuffer();
    const blob = new Blob([docBuf], {type: 'application/pdf'});
    return blob
}
*/}

const PrintDialog = (props) => {


    const [open, setOpen] = useState(false);
    

    return (
        <>
        <Popover autoAlign caret={false} open={open} onRequestClose={() => setOpen(false)}>
            <PrintButton onClick={() => {
                setOpen(!open); 
            }}/>
            <PopoverContent>
                <FlexGrid fullWidth condensed>
                <Row>
      
                </Row>

                {/*<Row>
                    <Column lg={{span: 10, offset: 1}}>
                    <div className="print-lines">
                    <p>
                        {props.line1}
                    </p>
                    </div>
                    </Column>
                </Row>
                <Row>
                    <Column lg={{span: 10, offset: 1}}>
                    <div className="print-lines">
                    <p>
                        {props.line2}
                    </p>
                    </div>
                    </Column>
                </Row><Row>
                    <Column lg={{span: 10, offset: 1}}>
                    <div className="print-lines">  
                    <p>
                        {props.line3}
                    </p>
                    </div>
                    </Column>
        </Row>*/}
                <Row>
                    <Column sm={2} md={4} lg={8}>
                        <NumberInput id="print-copies" min={1} max={100} value={1} label="Amount of Copies" invalidText="Please enter a number between 1 and 100"/>
                    </Column>
                    <Column sm={1} md={1} lg={4}>
                        <PrintButton size="sm" onClick={SetupPrinter}/>
                    </Column>       
                </Row>
            </FlexGrid>
            </PopoverContent>
        </Popover>
        </>
    );
}

export default PrintDialog;