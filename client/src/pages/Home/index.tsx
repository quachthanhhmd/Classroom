import React, { lazy } from 'react';

const DashBoard = lazy(() => 
import("../../containers/DashBoard"));

const Home = () => {
    return (
        <div className="home-body">
            <DashBoard />
        </div>
    );
}

export default Home;