import { getAllLocations, getSingleLocation } from "../../store/locations";
import CreateLocationForm from "./CreateLocationForm";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./location.css";

const Locations = () => {
    const dispatch = useDispatch();
    const locationsObject = useSelector((state) => state.locations);
    const locations = Object.values(locationsObject);

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

    useEffect(() => {
        dispatch(getAllLocations());
    }, [dispatch]);

    const handleClick = (id) => {
        dispatch(getSingleLocation(id));
    };

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="location-page">
            <div className="column-container">
                {locations.map((location) => {
                    return <div key={location.id}>
                        <NavLink exact to={`/locations/${location.id}`} onClick={() => handleClick(location.id)}>{location.name}</NavLink>
                    </div>
            })}
            </div>
            <div className="create-location-form">
                <CreateLocationForm />
            </div>
        </div>
    );
};

export default Locations;
