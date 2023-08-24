import PatientTable from '../../components/PatientTable';
import React, { useEffect, useState } from 'react';
import { DataTableSkeleton } from '@carbon/react';

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
        if (row['attributes']) {
            new_patient_dict = {
                id: row.uuid,
                patient_id: row.display.split('-')[0],
                //local_name:'N/A',
                local_name: row.attributes.display.split('=')[1],
                age: row.person.age,
                display_name: row.person.display,
                gender: row.person.gender,
                print: "<PRINT>",
            }
        }
        else {
            new_patient_dict = {
                id: row.uuid,
                patient_id: row.display.split('-')[0],
                local_name:'N/A',
                //local_name: patientDict.attributes.display.split('=')[1],
                age: row.person.age,
                display_name: row.person.display,
                gender: row.person.gender,
                print: "<PRINT>",
            }
        }
        return new_patient_dict;
    }



const PatientSearchPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [rows, setRows] = useState([]);



    useEffect(() => {
        async function getPatientList() {
            const patient_list = [];
            const requestHeaders = new Headers();
            console.log("Searching for patients...");
            requestHeaders.append("Authorization", "Basic " + btoa( process.env.REACT_APP_API_USER + ':' + process.env.REACT_APP_API_PASS));
            const requestOptions = {
                method: 'GET',
                headers: requestHeaders,
                redirect: 'follow',
                accept: "application/json",
            };
            const searchTerm="mohammed";
            const url = "https://" + process.env.REACT_APP_BAHMNI_HOST + "/" + process.env.REACT_APP_OPENMRS_API_PATH + "/patient?q=" + encodeURIComponent(searchTerm) + "&limit=10";
            const data = await fetch( url, requestOptions );
            const result_dict = await data.json();
            console.log("Returned result count: ", result_dict["results"].length);
            await result_dict.results.forEach((patient) => {
                const url = patient['links'][0]['uri'].replace('http://','https://');
                //console.log("Fetching URL, ",url);
                fetch( url, requestOptions )
                    .then(response => response.text())
                    .then(result => {
                        let patient_details_dict = JSON.parse(result);
                        //console.log("parsing individual patient", patient_details_dict);
                        if (patient_details_dict['error'] ){
                            console.error("Error code fetching: ", patient_details_dict['error']);
                        }
                        else {
                            patient_list.push(getRowItems(patient_details_dict));
                        }
                    })
                    .catch(error => console.error('error',error))
                });
            console.log("Patient list", patient_list);
            for (let i=0; i < patient_list.length; i++) {
                console.log(patient_list[i]);
            }
            if (patient_list.length > 0){
                setLoading(false);
                setRows(patient_list);
            }
            return patient_list;
        }
    getPatientList();
    },[])
    //console.log("Rows value: ", rows);
    if (loading) {
        return (
            <DataTableSkeleton columnCount={headers.length + 1} rowCount={10} headers={headers}/>
        )
    }
    return (
        <>
        <PatientTable headers={headers} rows={rows} /*searchAction={SearchFunction}*/ />
        </>
    );

}



export default PatientSearchPage;