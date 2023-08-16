import PatientTable from './PatientTable';

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
]

const rows=[
    {
        id:'1',
        patient_id:'MAF252401',
        local_name: 'N/A',
        age: '56', 
        display_name: 'test tester testing',
        gender: 'M',
        print: '<PRINT>',
    },
    {
        id:'2',
        patient_id:'MAF228157',
        local_name:'احمد',
        age: '37', 
        display_name: 'Ahmad Muhamed Test',
        gender: 'M',
        print: '<PRINT>',
    },
    {   
        id:'3',
        patient_id:'MAF252401',
        local_name: 'N/A',
        age: '56', 
        display_name: 'test tester testing',
        gender: 'M',
        print: '<PRINT>',
    },
    {
        id:'4',
        patient_id:'MAF228157',
        local_name:'احمد',
        age: '37', 
        display_name: 'Ahmad Muhamed Test',
        gender: 'M',
        print: '<PRINT>',
    }
]

const SearchFunction = () => {
    return null;
}

const PatientSearch = (props) => {
    return (
    <>
    <PatientTable headers={headers} rows={rows} />
    </>
    );
}

export default PatientSearch;