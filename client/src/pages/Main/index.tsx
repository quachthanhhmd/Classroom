import React, { Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
import Loading from "../../components/Loading";
import renderRoutes from "../../configs/routes";

function Main() {
  
    return (
        <div className="App">
            <BrowserRouter>
                {/* <Suspense fallback={<Loading />}> */}
                    {renderRoutes}
                {/* </Suspense> */}
            </BrowserRouter>
        </div >
    );
}

export default Main;
