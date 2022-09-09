import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLocation, deleteALocation, editSingleLocation } from "../../store/locations";
import { useParams, useHistory } from "react-router-dom";
import './index.css';
import EditLocation from "../EditLocation/EditLocation";

function SingleLocation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const location = useSelector((state) => state.locations[id]);

    useEffect(() => {
        dispatch(getSingleLocation(id));
    }, [id, dispatch]);

    const deleteTheLocation = (id) => {
        dispatch(deleteTheLocation(id));
        history.push(`/locations`);
    };

    if (!location) return null;

    return (
        <div className="single-location-page">
            <h1 className="location-name">{location.name}</h1>
            <div className="location-image">
                <img
                    src={location.image_url}
                />
            </div>
            <h2 className="coordinates">Coordinates</h2>
                <ul className="decimal-coordinates">
                    <li className="location-latitude-coordinates">
                        Latitude: {location.latitude}
                    </li>
                    <li className="location-longitude-coordinates">
                        Longitude: {location.longitude}
                    </li>
                </ul>
            <div className="location-description">
                {/* Description */}
                <div className="location-description-body">
                    {location.description}
                </div>
            </div>
            <div>
                <EditLocation />
            </div>
        </div>
    )
}

export default SingleLocation;
