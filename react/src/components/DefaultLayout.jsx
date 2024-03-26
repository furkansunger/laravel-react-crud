import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
    const { user, token, setToken, setUser } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser({ data });
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user?.data?.name}
                        <a className="btn-logout" href="#" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
