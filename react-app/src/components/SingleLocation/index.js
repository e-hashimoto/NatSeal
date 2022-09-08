import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleLocation, deleteALocation, editSingleLocation } from "../../store/locations";
import { useParams, useHistory } from "react-router-dom";
import './index.css';

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
            <h2 className="coordinates"></h2>

        </div>
    )
}

export default SingleLocation;
