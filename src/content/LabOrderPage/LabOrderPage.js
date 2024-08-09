import LabOrderPatientTable from '../../components/LabOrderPatientTable';
import React, { useEffect, useState } from 'react';
import { DataTableSkeleton, Button } from '@carbon/react';
import { Renew } from '@carbon/icons-react';



//import PrintButton from '../../components/PrintButton';
import PrintDialog from '../../components/PrintDialog/PrintDialog';


const headers=[
    {
        key: 'patient_id',
        header: 'Patient Identifier',
    },
    {
        key: 'local_name',
        header: 'Local Name',
    },
    {
        key: 'age',
        header: 'Age',
    },
    {
        key: 'display_name',
        header: 'Display Name',
    },
    {
        key: 'gender',
        header: 'Gender',
    },
    {
        key: 'print',
        header: 'Print Label',
    },
];

const getRowItems = (row) => {

        let new_patient_dict = {};
        new_patient_dict = {
                id: row.uuid,
                patient_id: row.identifier,
                local_name: row.localName,
                age: row.age,
                display_name: row.name,
                gender: row.gender,
                print: <PrintDialog line1={row.identifier} line2={row.name} line3={row.gender + " | " + row.age} line4={new Date().toLocaleString()}/>,
            }
        return new_patient_dict;
        
    }



const LabOrderPage = () => {
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState();
    const [rows, setRows] = useState([]);
    const [refreshRequested, setRefreshRequested] = useState(true);
    const refreshResults = () => {
        setRefreshRequested(true);
    }

    useEffect(() => {
        async function getPatientList() {
            let patient_list = [];
            const requestHeaders = new Headers();
            console.log("Searching for patients with recent Lab Orders");
            const requestOptions = {
                method: 'GET',
                headers: requestHeaders,
                redirect: 'follow',
                accept: "application/json",
            };
            const url = "http://" + process.env.REACT_APP_LAB_ORDER_API_HOST + "/" + process.env.REACT_APP_LAB_ORDER_API_PATH;
            console.log("Getting Lab Orders from:",process.env.REACT_APP_LAB_ORDER_API_HOST)
            const data = await fetch( url, requestOptions );
            const result_dict = await data.json();
            console.log("Got results: ", result_dict);
            console.log("Returned result count: ", result_dict.length);
            for (let i=0; i < result_dict.length; i++) {
                let patient_details_dict = result_dict[i];
                if (patient_details_dict['error'] ){
                    console.error("Error code fetching: ", patient_details_dict['error']);
                }
                else {
                    console.log("Fetched patient",patient_details_dict);
                    patient_list.push(getRowItems(patient_details_dict));
                }
            }   
            setLoading(false);
            setRows(patient_list);
            console.log(rows);
            return patient_list;
        }
        if (refreshRequested){
            getPatientList();
            setRefreshRequested(false);
        }


    },[refreshRequested,rows])
    //console.log("Rows value: ", rows);
    if (loading) {
        return (
            <DataTableSkeleton columnCount={headers.length + 1} rowCount={10} headers={headers}/>
        )
    }
    return (
        <>
        <Button renderIcon={Renew} iconDescription="refresh" onClick={refreshResults}>Renew</Button>
        <LabOrderPatientTable headers={headers} rows={rows} />
        </>
    );

}



export default LabOrderPage;