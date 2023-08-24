import React from 'react';

import {
    Button,
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    Theme,
} from '@carbon/react';

const PatientTable = ({ headers, rows }) => {
    
    console.log("PatientTable got these rows: ", rows)
    return (
        <Theme theme="g10">
        <DataTable
            rows={rows}
            headers={headers}
            render={({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
                onInputChange
            }) => (
                <TableContainer
                    title="Patient Search"
                    //description="A list of patients which match the search query"
                >
                    <TableToolbar>
                        <TableToolbarContent>
                            <TableToolbarSearch persistent placeholder="Enter Patient Name"/>
                            <Button>Search</Button>
                        </TableToolbarContent>
                    </TableToolbar>
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header, isSortable: true })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow {...getRowProps({ row })}>
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            )}
            />
            </Theme>
    );
};

export default PatientTable;