import jwt_decode from "jwt-decode";
import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CourseHeader from "../components/CourseHeader";
import Header from "../components/Header";
import { ROUTES } from "../constants";
import { IPayload } from "../interfaces";
import AuthenticatePage from "../pages/Authenticate";
import HomePage from "../pages/Home";
import env from "./env";

const Feed = lazy(() => import("../containers/Feed"));

type IRoute = {
    path: string,
    exact?: boolean,
    authen?: boolean,
    main: any,
}


const RouteConfig = (route: IRoute, index: number, Layout?: any) => {
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

                    if (!token && authen !== true) {
                        if (!Layout) {
                            return <Component {...props} />
                        }
                        return Layout(<Component {...props} />);
                    }
                    const user = jwt_decode<IPayload>(token!);

                    if (authen === false && (typeof user !== "undefined" && typeof user.sub !== "undefined"))
                        return <Redirect to="/" />;

                    if (authen === true && (typeof user === "undefined" || typeof user.sub === "undefined"))
                        return <Redirect to="/auth" />;


                    if (!Layout) {
                        return <Component {...props} />
                    }
                    return Layout(<Component {...props} />);
                } catch (error) {
                    localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
                    localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
                    return <Redirect to="/auth" />;
                }
            }}
        />
    );
}



const HomeLayout = (component: any) => {
    return (
        <>
            <Header />
            {component}
        </>
    )
};

const CourseLayout = (component: any) => {
    return (
        <>
            <CourseHeader />
            {component}
        </>
    )
}


const homeRouteList: IRoute[] = [
    {
        path: ROUTES.home,
        exact: true,
        authen: true,
        main: () => <HomePage />
    },
]

const defaultRouteList = [
    {
        path: ROUTES.auth,
        exact: true,
        main: () => <AuthenticatePage />,
    },
]

const courseRouteList = [
    {
        path: ROUTES.course,
        exact: false,
        auth: true,
        main: () => <Feed />,
    },
]

const renderRoutes = (defaultRoutes: IRoute[], HomeRoutes: IRoute[], CourseRoutes: IRoute[]) => {

    return (
        <Switch>
            {defaultRoutes.map((route, index) => {
                return RouteConfig(route, index);
            })},
            {HomeRoutes.map((route, index) => {
                return RouteConfig(route, index, HomeLayout);
            })},
            {CourseRoutes.map((route, index) => {
                return RouteConfig(route, index, CourseLayout);
            })},
        </Switch>
    );
};

export default renderRoutes(defaultRouteList, homeRouteList, courseRouteList);

