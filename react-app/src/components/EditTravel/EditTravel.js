import { editSingleTravel } from "../../store/travels";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

const EditTravel = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const travel = useParams();

    const travels = useSelector((state) => state.travels);
    const sessionUser = useSelector((state) => state.session.user);

    const currentTravel = travels[travel?.id];
    const 
}

export default EditTravel;
