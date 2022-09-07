import "./home.css";
import NavBar from "../NavBar";
// import e from "express";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";



function Home() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users/");
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="homepage">
            <div className="header">
                <h1>
                    NatSeal
                </h1>
            </div>
            <div className="footer">

            </div>
        </div>
    )
}

export default Home;
