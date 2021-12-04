import jwt_decode from "jwt-decode";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CourseHeader from "../components/CourseHeader";
import Header from "../components/Header";
import { ROUTES } from "../constants";
import { IPayload } from "../interfaces";
import AuthenticatePage from "../pages/Authenticate";
import HomePage from "../pages/Home";
import Loading from "../components/Loading";
import AddIDModal from "../components/AddIDModal";
import env from "./env";

const Exercise = lazy(() => import("../containers/Exercise"));
const Feed = lazy(() => import("../containers/Feed"));
const GradeStructure = lazy(() => import("../containers/GradeStructure"));
const Member = lazy(() => import("../containers/Member"));
const NotFound = lazy(() => import("../pages/NotFound"));
const InviteByToken = lazy(() => import("../components/InviteByToken"));
const PostDetail = lazy(() => import("../containers/PostDetail"));

type IRoute = {
    path: string,
    exact?: boolean,
    auth?: boolean,
    main: any,
}


const RouteConfig = (route: IRoute, index: number, Layout?: any) => {

    const { path, exact, main: Component, auth = false } = route;
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
                    // const refreshToken = localStorage.getItem(
                    //     env.REACT_APP_REFRESH_TOKEN
                    // );
                    // if (!token )

                    if (!token && auth !== true) {
                        if (!Layout) {
                            return <Component {...props} />
                        }
                        return Layout(<Component {...props} />);
                    }
                    if (!token && auth === true) {
                        return <Redirect to="/auth" />;
                    }

                    const user = jwt_decode<IPayload>(token!);

                    if (auth === false && (typeof user !== "undefined" && typeof user.sub !== "undefined"))
                        return <Redirect to="/" />;

                    if (auth === true && (typeof user === "undefined" || typeof user.sub === "undefined"))
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
            <Suspense fallback={<Loading />}>
                {component}
            </Suspense>
        </>
    )
};

const CourseLayout = (component: any) => {
    return (
        <>
            <CourseHeader />
            <AddIDModal />
            <Suspense fallback={<Loading />}>
                {component}
            </Suspense>
        </>
    )
}


const homeRouteList: IRoute[] = [
    {
        path: ROUTES.home,
        exact: true,
        auth: true,
        main: () => <HomePage />
    },
]

const defaultRouteList = [
    {
        path: ROUTES.auth,
        auth: false,
        exact: true,
        main: () => <AuthenticatePage />,
    },
    {
        path: ROUTES.inviteMember,
        exact: false,
        auth: true,
        main: () => <InviteByToken />
    }
]

const courseRouteList = [
    {
        path: ROUTES.course,
        exact: true,
        auth: true,
        main: () => <Feed />,
    },
    {
        path: ROUTES.member,
        exact: true,
        auth: true,
        main: () => <Member />
    },
    {
        path: ROUTES.structure,
        exact: false,
        auth: true,
        main: () => <GradeStructure />
    },
    {
        path: ROUTES.exercise,
        exact: false,
        auth: true,
        main: () => <Exercise />
    },
    {
        path: ROUTES.detail,
        exact: false,
        auth: true,
        main: () => <PostDetail />
    }
]

const renderRoutes = (defaultRoutes: IRoute[], HomeRoutes: IRoute[], CourseRoutes: IRoute[]) => {

    return (
        <Suspense fallback={<Loading />}>
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

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default renderRoutes(defaultRouteList, homeRouteList, courseRouteList);

