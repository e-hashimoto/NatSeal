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
            <div className="column-container">
                {locations.map((location) => (
                    <div className="location-container" key={location.id}>
                        <div className="location-image" key={location.image_url}>
                            <img
                                alt="location"
                                className="location-image-url"
                                src={location.image_url}
                                id="location_img"
                            />
                        </div>
                        <div className="location-latitude" key={location.latitude}>
                            Latitude: {location.latitude}
                        </div>
                        <div className="location-longitude" key={location.longitude}>
                            Longitude: {location.longitude}
                        </div>
                        <div className="location-description" key={location.description}>
                            About: {location.description}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Locations;
