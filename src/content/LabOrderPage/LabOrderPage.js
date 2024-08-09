import PatientTable from '../../components/PatientTable';
import React, { useEffect, useState } from 'react';
import { DataTableSkeleton } from '@carbon/react';


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
                patient_id: row.display.split('-')[0],
                local_name:'N/A',
                //local_name: patientDict.attributes.display.split('=')[1],
                age: row.person.age,
                display_name: row.person.display,
                gender: row.person.gender,
                print: <PrintDialog line1={row.display.split('-')[0]} line2={row.person.display} line3={row.person.gender + " | " + row.person.age} line4={new Date().toLocaleString()}/>,
            }
        
        if (row['person']){
            if (row['person']['attributes']) {
                if (row['person']['attributes'].length > 0) {
                    new_patient_dict = {
                        id: row.uuid,
                        patient_id: row.display.split('-')[0],
                        //local_name:'N/A',
                        local_name: row.person.attributes[0].display.split('=')[1],
                        age: row.person.age,
                        display_name: row.person.display,
                        gender: row.person.gender,
                        print: <PrintDialog line1={row.display.split('-')[0]} line2={row.person.display} line3={row.person.gender + " | " + row.person.age} line4={new Date().toLocaleString()}/>,
                    }
                }
            }
        }
        return new_patient_dict;
        
    }



const LabOrderPage = () => {
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState();
    const [rows, setRows] = useState([]);
 

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
            const url = "http://" + process.env.LAB_ORDER_API_HOST + "/" + process.env.LAB_ORDER_API_PATH;
            const data = await fetch( url, requestOptions );
            const result_dict = await data.json();
            console.log("Returned result count: ", result_dict["results"].length);
            for (let i=0; i < result_dict['results'].length; i++) {
                const url = result_dict['results'][i]['links'][0]['uri'].replace('http://','https://');
                //console.log("Fetching URL, ",url);
                const patient_details = await fetch( url, requestOptions )
                let patient_details_dict = await patient_details.json();
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
            setSearched(true);
            return patient_list;
        }
    if (! searched && searchTerm) {    
        if (searchTerm.length >= 3) {
            getPatientList();
        }
    };
    },[searchTerm,searched])
    //console.log("Rows value: ", rows);
    if (loading) {
        return (
            <DataTableSkeleton columnCount={headers.length + 1} rowCount={10} headers={headers}/>
        )
    }
    return (
        <>
        <PatientTable headers={headers} rows={rows} searchAction={retrieveSearchTerm} />
        </>
    );

}



export default LabOrderPage;