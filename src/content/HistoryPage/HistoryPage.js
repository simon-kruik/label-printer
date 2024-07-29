import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, } from '@react-pdf/renderer';
import {PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        //flexDirection:'column',
        backgroundColor: "#FFFFFF",
        alignItems:'center',
        paddingTop: 40,
        
    },
    text: {
        textAlign: 'justify',
        overflowWrap: 'break-word',
        fontSize: '28',

    }
})

const HistoryPage = () => {
    return (
    <>
  <PDFViewer>
        <Document>
        <Page size={[64, 128]} orientation="landscape" dpi={203} style={styles.page}>
            <View>
                <View style={styles.text}>
                    <Text>Line 1<br/></Text>
                </View>
                <View style={styles.text}>
                    <Text>Line 2<br/></Text>
                </View>
                <View style={styles.text}>
                    <Text>Line 3<br/></Text>
                </View>
            </View>

        </Page>
        </Document>
        </PDFViewer>
    </>
    );
}


export default HistoryPage;