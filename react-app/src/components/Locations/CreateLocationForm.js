import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewLocation } from "../../store/locations";

const CreateLocationForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImage_url] = useState("");

    const updateName = (e) => setName(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImage_url = (e) => setImage_url(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            latitude,
            longitude,
            description,
            image_url
        };
    }
}
