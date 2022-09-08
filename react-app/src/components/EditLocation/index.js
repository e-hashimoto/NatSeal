import { editSingleLocation } from "../../store/locations";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

const EditLocation = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const image = useParams();

    const locations = useSelector((state) => state.locations);
    const sessionUser = useSelector((state) => state.session.user);

    const currentLocation = locations[location?.id];
    const [name, setName] = useState(currentLocation.name);
    const [latitude, setLatitude] =  useState(currentLocation.latitude);
    const [longitude, setLongitude] = useState(currentLocation.longitude);
    const [description, setDescription] = useState(currentLocation.description);
    
}
