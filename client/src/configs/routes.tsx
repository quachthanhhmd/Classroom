import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AuthenticatePage from "../pages/Authenticate";
import HomePage from "../pages/Home";
import env from "./env";

import { IPayload } from "../interfaces";
import { ROUTES } from "../constants";


type IRoute = {
    path: string,
    exact?: boolean,
    authen?: boolean,
    main: any,
}

const routeList: IRoute[] = [
    {
        path: ROUTES.home,
        exact: true,
        //authen: true,
        main: () => <HomePage/>
    },
    {
        path: ROUTES.auth,
        exact: true,
        main: () => <AuthenticatePage/>,
    },
]


const renderRoutes = (routes: IRoute[]) => {
 

    return (
        <Switch>
            {routes.map((route, index) => {
                const { path, exact, main: Component, authen = false } = route;
                return (
                    <Route
                        key={index}
                        path={path}
                        exact={exact}
                        render={(props) => {
                            try {
                              
                                const token = localStorage.getItem(
                                    env.REACT_APP_ACCESS_TOKEN
                                );

                                if (!token && authen !== true) return <Component {...props} />;
                                console.log(token);
                                const user = jwt_decode<IPayload>(token!);
                                
                                    
                                if (authen === true && (!user || !user.sub))
                                    return <Redirect to="/auth" />;

                                return <Component {...props} />;
                            } catch (error) {
                                localStorage.clear();
                                return <Redirect to="/auth" />;
                            }
                        }}
                    />
                );
            })}
        </Switch>
    );
};

export default renderRoutes(routeList);

