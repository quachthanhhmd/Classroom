import React from 'react';

import Header from "../../components/Header"
import DashBoard from '../../containers/DashBoard';

const Home = () => {

    return (
        <div className="home-body">
            <Header />
            <DashBoard/>
        </div>
    );
}

export default Home;