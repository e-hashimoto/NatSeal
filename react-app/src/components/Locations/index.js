import { getAllLocations } from "../../store/locations";

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

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="location-page">
            <div className="image-container">

                {/* <div className="img" key={location.id}>
                    {location.image_url}
                </div> */}
            </div>
        </div>
    )
}

export default Locations;
