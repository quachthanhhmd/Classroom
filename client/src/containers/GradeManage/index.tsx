import "./index.scss"
import React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
} from '@material-ui/data-grid';
import { DEFAULT_GRID_OPTIONS, GridToolbar } from "@material-ui/x-grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
        // <div>
        //     <div style={{ height: headerHeight + rowHeight * 4 }}>
        //         <DataGrid
        //             // components={{
        //             //     Toolbar: GridToolbar
        //             // }}
        //             rows={rows}
        //             columns={columns}
        //             disableSelectionOnClick
        //             //checkboxSelection
        //             // onEditRowsModelChange={handleEditRowsModelChange}
        //             // pagination
        //             // pageSize={pageSize}
        //             // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        //             //rowsPerPageOptions={[5, 10, 15]}
        //         />
        //     </div>
        // </div>
        <>
            <div className="x7zFFe">
                <table role="grid" aria-aria-labelledby='UGb2Qe'>
                    <thead>
                        <tr>
                            <th role="columnheader" style={{ transform: "translate(0, 0)" }}>
                                <div className="YEeyed tLDEHd">
                                    <div className="WJxodf">
                                        <div className="kcAzD" tabIndex={0} role="button" aria-label='Sắp xếp học viên'>
                                            {/* <div className="QRiHX">
                                            <div className="jgvuAb ybOdnf" role="listbox" aria-expanded="false" aria-label='Sắp xếp học viên'>
                                                <div role="presentation">
                                                    <div className="ry3kXd" role="presentation">
                                                        <div className="MocG8c HZ3kWc LWgvRb" role="option" aria-selected="false" tabIndex={-1}>
                                                            <div className="kRoyt MbhUzd"></div>
                                                            <span className='vRMGwf oJeWuf'>Sắp xếp theo họ</span>
                                                        </div>
                                                        <div className="MocG8c HZ3kWc LWgvRb" role="option" aria-selected="true" tabIndex={0}>
                                                            <div className="kRoyt MbhUzd ziS7cd"></div>
                                                            <span className='vRMGwf oJeWuf'>Sắp xếp theo tên</span>
                                                        </div>
                                                    </div>
                                                    <div className="e2CuFe eU809d"></div>
                                                </div>
                                            </div>
                                        </div> */}
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={0}
                                                    label="Name"
                                                    //onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Họ</MenuItem>
                                                    <MenuItem value={20}>Tên</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th role="columnheader" style={{ transform: "translate(0, 0)" }}>
                                <div className="VUfVlb">
                                    <div className="MMshld">
                                        <div className="Cep97e">
                                            <div className="dDKhVc YVvGBb">25 thg 12</div>
                                            <a href="" className="onkcGd u0DHe ViCi4 VnOHwf-Tvm9db VBEdtc-Wvd9Cc" target="_self" aria-label='Bài tập 2'
                                                title='Bài tập 2'>Bài tập 2</a>
                                        </div>
                                        <div className="CmLZs Cbgu2e" id='ow273'>
                                            <span>
                                                <div className="U26fgb JRtysb WzwrXb I12f0b K2mXPb rGxdsf" role="button" aria-label='Menu hành động của tiêu đề'
                                                    tabIndex={0} aria-haspopup="true" aria-expanded="false">
                                                    <div className="NWlf3e MbhUzd" style={{ top: 15, left: 15, width: 40, height: 40 }}></div>
                                                    <span className="MhXXcc oJeWuf">
                                                        <span className='Lw7GHd snByac'>
                                                            <span className='DPvwYc' aria-hidden="true">?</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="VTvzRc dDKhVc">
                                        <div>
                                            <div className="YVvGBb YglcOe "></div>
                                        </div>
                                        <div>
                                            trong tổng số
                                            100
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th role="columnheader" style={{ transform: "translate(0, 0)" }}>
                                <div className="VUfVlb">
                                    <div className="MMshld">
                                        <div className="Cep97e">
                                            <div className="dDKhVc YVvGBb">Không có ngày đến hạn</div>
                                            <a href="" className="onkcGd u0DHe ViCi4 VnOHwf-Tvm9db VBEdtc-Wvd9Cc" target="_self" aria-label='test bài tập'
                                                title='test bài tập'>test bài tập</a>
                                        </div>
                                        <div className="CmLZs Cbgu2e" id='ow273'>
                                            <span>
                                                <div className="U26fgb JRtysb WzwrXb I12f0b K2mXPb rGxdsf" role="button" aria-label='Menu hành động của tiêu đề'
                                                    tabIndex={0} aria-haspopup="true" aria-expanded="false">
                                                    <div className="NWlf3e MbhUzd" style={{ top: 15, left: 15, width: 40, height: 40 }}></div>
                                                    <span className="MhXXcc oJeWuf">
                                                        <span className='Lw7GHd snByac'>
                                                            <span className='DPvwYc' aria-hidden="true">?</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="VTvzRc dDKhVc">
                                        <div>
                                            <div className="YVvGBb YglcOe "></div>
                                        </div>
                                        <div>
                                            trong tổng số
                                            100
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th className="L5Faxf" aria-hidden="true" style={{ transform: "translate(0, 0)" }}>
                                <div className="qwFLJb"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th role="rowheader">
                                <div className="kTKNNc xdKj9c QRiHXd" tabIndex={0}>
                                    <div className="EqLkP QRiHXd asQXV">
                                        <svg focusable="false" width={24} height={24} viewBox='0 0 24 24' className='Fqa2Xe VnOHwf-Tvm9db NMm5M'>
                                            <path fillRule='evenodd' clipRule="evenodd" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"></path>
                                            <path fillRule='evenodd' clipRule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                                            <circle fillRule='evenodd' clipRule="evenodd" cx="9" cy="8" r="4"></circle>
                                        </svg>
                                        Điểm trung bình của lớp
                                    </div>
                                </div>
                            </th>
                            <td role="gridcell">
                                <div className="Je07k kTKNNc KT7tvf iLjzDc QRiHXd" tabIndex={0} aria-label="Chưa học viên nào có điểm" role="note">
                                    <span></span>
                                </div>
                            </td>
                            <td role="gridcell">
                                <div className="Je07k kTKNNc KT7tvf iLjzDc QRiHXd" tabIndex={0} aria-label="Chưa học viên nào có điểm" role="note">
                                    <span></span>
                                </div>
                            </td>
                            <td className="JE14Hc">
                                <div className="Je07k kTKNNc KT7tvf QRiHXd">
                                    <div className="UhYXkc VIwAmc">
                                        <span className="E70Hue neggzd" aria-hidden="true">Estigfend</span>
                                        <span className="PazDv">Đang tải chi tiết gửi</span>
                                    </div>
                                </div>
                            </td>
                            <td className="L5Faxf" aria-hidden="true">
                                <div className="qwFLJb kTKNNc"></div>
                            </td>
                        </tr>
                        <tr>
                            <th role="rowheader" style={{ transform: "translate(0, 0)" }}>
                                <div className="xdKj9c QRiHXd">
                                    <div className="EqLkP QRiHXd">
                                        <img className="c1KTGd tkmmwb" aria-hidden="true" src="//lh3.googleusercontent.com/a/default-user=s32-c" />
                                        <a className="onkcGd YVvGBb VBEdtc-Wvd9Cc zZN2Lb-Wvd9Cc Sg5BHb asQXV" target="_self" href="">
                                            Hải Thanh Quách
                                        </a>
                                    </div>
                                </div>
                            </th>
                            <td role="gridcell">
                                <div className="Je07k">
                                    <div className="PDpaTd WLsCn i5aS4e" tabIndex={0}>
                                        <div className="QRiHXd gRisWe">
                                            <span className="rRimpd neggzd asQXV" aria-hidden="true" tabIndex={0}>Estigfend</span>
                                            <span className="hDVLxe">
                                                <span className="SxMnzc">
                                                    <span className="PazDv">Ðã giao</span>
                                                    <span className="NhG04b asQXV" aria-hidden="true">
                                                        <span className="cL8LOd">&nbsp;</span>
                                                        <span className="">/100</span>
                                                    </span>
                                                </span>
                                                <span className="dDKhVc YVvGBb"></span>
                                            </span>
                                            <span className="NhG04b CG2qQ">
                                                <div role="button" className="U26fgb JRtysb WzwrXb I12f0b K2mXPb UNDeAc" aria-label="Menu thao tác" aria-disabled="false" tabIndex={0} aria-haspopup="true" aria-expanded="false">
                                                    <div className="NWlf3e MbhUzd" >
                                                    </div>
                                                    <span className="MhXXcc oJeWuf">
                                                        <span className="Lw7GHd snByac">
                                                            <span className="DPvwYc" aria-hidden="true"></span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td role="gridcell">
                                <div className="Je07k">
                                    <div className="PDpaTd WLsCn i5aS4e" tabIndex={0}>
                                        <div className="QRiHXd gRisWe">
                                            <span className="rRimpd neggzd asQXV" aria-hidden="true" tabIndex={0}>Estigfend</span>
                                            <span className="hDVLxe">
                                                <span className="SxMnzc">
                                                    <span className="PazDv">Ðã giao</span>
                                                    <span className="NhG04b asQXV" aria-hidden="true">
                                                        <span className="cL8LOd">&nbsp;</span>
                                                        <span className="">/100</span>
                                                    </span>
                                                </span>
                                                <span className="dDKhVc YVvGBb"></span>
                                            </span>
                                            <span className="NhG04b CG2qQ">
                                                <div role="button" className="U26fgb JRtysb WzwrXb I12f0b K2mXPb UNDeAc" aria-label="Menu thao tác" aria-disabled="false" tabIndex={0} aria-haspopup="true" aria-expanded="false">
                                                    <div className="NWlf3e MbhUzd">
                                                    </div>
                                                    <span className="MhXXcc oJeWuf">
                                                        <span className="Lw7GHd snByac">
                                                            <span className="DPvwYc" aria-hidden="true"></span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="JE14Hc">
                                <div className="Je07k KT7tvf QRiHXd">
                                    <div className="UhYXkc VIwAmc">
                                        <span className="E70Hue neggzd" aria-hidden="true">Estigfend</span>
                                        <span className="PazDv">Đang tải chi tiết gửi</span>
                                    </div>
                                </div>
                            </td>
                            <td className="L5Faxf" aria-hidden="true">
                                <div className="qwFLJb">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GradeManage;