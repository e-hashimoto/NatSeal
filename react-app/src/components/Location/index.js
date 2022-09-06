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
        <div className="wholepage">
            <div className="column-container">
                {locations.map((location) => (
                    <div className="card-container">
                        <div className="location-container" key={location.id}>
                            <div className="author-container" key={location.user_id}>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Locations;
