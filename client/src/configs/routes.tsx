import { findAllByDisplayValue } from "@testing-library/react";
import jwt_decode from "jwt-decode";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants";
import { IPayload } from "../interfaces";
import AuthenticatePage from "../pages/Authenticate";
import HomePage from "../pages/Home";
import env from "./env";


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
        authen: true,
        main: () => <HomePage />
    },
    {
        path: ROUTES.auth,
        exact: true,
        main: () => <AuthenticatePage />,
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
                                const user = jwt_decode<IPayload>(token!);

                                console.log(typeof user !== "undefined" && user.sub);
                                console.log(authen);
                                if (authen === false && (typeof user !== "undefined" && typeof user.sub !== "undefined"))
                                    return <Redirect to="/" />;

                                if (authen === true && (typeof user === "undefined" || typeof user.sub === "undefined"))
                                    return <Redirect to="/auth" />;

                                console.log("hahahaha");
                                return <Component {...props} />;
                            } catch (error) {
                                localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
                                localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
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

