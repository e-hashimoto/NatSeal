import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTravel, deleteATravel, editSingleTravel } from "../../store/travels";
import { useParams, useHistory } from "react-router-dom";
import './index.css';

function SingleTravel() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const travel = useSelector((state) => state.travels[id]);

    useEffect(() => {
        dispatch(getSingleTravel(id));
    }, [id, dispatch]);

    const deleteTheTravel = (id) => {
        dispatch(deleteTheTravel(id));
        history.push(`/travels`);
    };

    if (!travel) return null;

    return (
        <div className="single-travel-page">
            <h1 className="travel-name">{travel.name}</h1>
            <div className="travel-image">
                <img
                    src={travel.image_url}
                />
            </div>
            <div className="description-travel">
                {travel.description}
            </div>
        </div>
    )
}

export default SingleTravel;
