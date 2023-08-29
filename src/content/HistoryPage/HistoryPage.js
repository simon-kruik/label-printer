import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        //flexDirection:'row',
        backgroundColor: "#E4E4E4",
        
    },
    section: {
        margin: 2,
        padding: 5,
        flexGrow: 0
    },
    text: {
        wrap: 'false',

    }
})

const HistoryPage = () => {
    return (
    <>
    <Document>
    <Page size={[64, 128]} wrap={false} orientation="landscape" dpi={203} style={styles.page}>
        <View wrap={false} style={styles.section}>
            <Text>Line 1</Text>
            <Text>Line 2</Text>
        </View>

    </Page>
    </Document>
    </>
    );
}


export default HistoryPage;