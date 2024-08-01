import React from 'react';
//import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image,} from '@react-pdf/renderer';
import {PDFViewer,  } from '@react-pdf/renderer';
import PrintButton from '../../components/PrintButton';
import JsBarcode from 'jsbarcode';
let canvas;

const styles = StyleSheet.create({
    page: {
        //flexDirection:'column',
        backgroundColor: "#FFFFFF",
        alignItems:'center',
        paddingTop: 13,
        
    },
    text: {
        textAlign: 'justify',
        overflowWrap: 'break-word',
        fontSize: '13',
        fontWeight: 'bold',

    },
    image: {
        height: 28,
        width: 100,
   //     transform: "rotate(270deg)"
    }
})

const CustomPrintPage = () => {
    canvas = document.createElement('canvas');
    JsBarcode(canvas, 'MAF224785', {"textPosition":"top","height":30,});
    const barcode = canvas.toDataURL();
    return (
    <>
  <PDFViewer showToolbar={true} id="LabelPDF"> 
        <Document>
        <Page size={[25, 50]} orientation="landscape" dpi={203} style={styles.page}>
            <View>

                <View style={styles.text}>
                    <Text>Test Brian<br/></Text>
                </View>
                <View style={styles.text}>
                    <Text>M | 61<br/></Text>
                </View>
                <View style={styles.text}>
                    <Image src={barcode} style={styles.image}/>
                </View>
            </View>

        </Page>
        </Document>
        </PDFViewer>
        <PrintButton onClick={() => {document.getElementById("LabelPDF").contentWindow.print()}}/>
    </>
    );
}


export default CustomPrintPage;