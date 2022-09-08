import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
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
    const [validationErrors, setValidationErrors] = useState([]);

    const updateName = (e) => setName(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImage_url = (e) => setImage_url(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) history.push('/login');
        const errors = [];

        const payload = {
            name,
            latitude,
            longitude,
            description,
            image_url
        };

        if (name.length === 0) errors.push("Please provide a name for this location.");
        if (name.length > 100) errors.push("Please keep the length of th name of the location no more than 100 characters.")
        if (latitude.length === 0) errors.push("Please provide the latitude of the location.")
        if (longitude.length === 0) errors.push("Please provide the longitude of the location.")
        if (description.length === 0) errors.push("Please provide a description for this location.")
        if (!image_url.includes('.jpg' || '.jpeg' || '.png')) errors.push("Please provide a picture for this location.")

        if (errors.length) {
            setValidationErrors(errors);
            return;
        }

        let createdLocation = await dispatch(createdLocation(payload));
        if (createdLocation) {
            history.push(`/locations/${createdLocation.id}`);
        };
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
    };

    return (
        <section className="new-location-form">
            <h1>Tell us about a new location!</h1>
            <form className="create-location-form" onSubmit={handleSubmit}>
                <input
                    type="string"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={updateName}
                    className="name-of-location"
                />
                <input
                    type="inputmode"
                    placeholder="Latitude"
                    className="latitude-for-location"
                    required
                    value={latitude}
                    onChange={updateLatitude}
                />
                <input
                    type="inputmode"
                    placeholder="Longitude"
                    className="longitude-for-location"
                    required
                    value={longitude}
                    onChange={updateLongitude}
                />
                <textarea
                    className="description-textarea"
                    rows="10"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={updateDescription}
                />
                <input
                    className="img-submission"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    value={image_url}
                    onChange={updateImage_url}
                />
                <button className="submit-location" type="submit">
                    Submit
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </form>
        </section>
    )
};

export default CreateLocationForm;
