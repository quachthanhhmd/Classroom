import React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
} from '@material-ui/data-grid';
import { DEFAULT_GRID_OPTIONS, GridToolbar } from "@material-ui/x-grid";

import { Link } from 'react-router-dom';
const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 70
    },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90
    },
    {
        field: "email",
        headerName: "Email",
        width: 300,
        renderCell: (params) => (
            <Link to={`mailto:${params.value}`}>{params.value!.toString()}</Link>
        )
    }
];

const rows = [
    {
        id: 1,
        lastName: "Snow",
        firstName: "Jon",
        age: 35,
        email: "Snow@gmail.com"
    },
    {
        id: 2,
        lastName: "Lannister",
        firstName: "Cersei",
        age: 42,
        email: "Lannister@gmail.com"
    },
    {
        id: 3,
        lastName: "Lannister",
        firstName: "Jaime",
        age: 45,
        email: "Lannister@gmail.com"
    },
    {
        id: 4,
        lastName: "Stark",
        firstName: "Arya",
        age: 16,
        email: "Stark@gmail.com"
    },
    {
        id: 5,
        lastName: "Targaryen",
        firstName: "Daenerys",
        age: null,
        email: "Targaryen@gmail.com"
    },
    {
        id: 6,
        lastName: "Melisandre",
        firstName: null,
        age: 150,
        email: "Melisandre@gmail.com"
    },
    {
        id: 7,
        lastName: "Clifford",
        firstName: "Ferrara",
        age: 44,
        email: "Clifford@gmail.com"
    },
    {
        id: 8,
        lastName: "Frances",
        firstName: "Rossini",
        age: 36,
        email: "Frances@gmail.com"
    },
    {
        id: 9,
        lastName: "Roxie",
        firstName: "Harvey",
        age: 65,
        email: "Roxie@gmail.com"
    }
];
const { rowHeight, headerHeight } = DEFAULT_GRID_OPTIONS;


function CustomToolbar() {
    return (
        <GridToolbarContainer>

        </GridToolbarContainer>
    );
}


const GradeManage = () => {

    return (
        <div>
            <div style={{ height: headerHeight + rowHeight * 4 }}>
                <DataGrid
                    // components={{
                    //     Toolbar: GridToolbar
                    // }}
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    //checkboxSelection
                    // onEditRowsModelChange={handleEditRowsModelChange}
                    // pagination
                    // pageSize={pageSize}
                    // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    //rowsPerPageOptions={[5, 10, 15]}
                />
            </div>
        </div>
    )
}

export default GradeManage;