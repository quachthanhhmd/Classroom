import React, { useEffect, lazy  } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header"
//import DashBoard from '../../containers/DashBoard';

import { AppState } from "../../reducers";

const DashBoard = lazy(() => 
import("../../containers/DashBoard"));

const Home = () => {
    // const auth = useSelector((state: AppState) => state.auth);
    // const history = useHistory();

    // useEffect(() => {
    //     history.push("/auth");
    // }, [])

    return (
        <div className="home-body">
            <Header />
            <DashBoard />
        </div>
    );
}

export default Home;