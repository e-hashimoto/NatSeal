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
            // id,
            user_id: user?.id,
            name: name,
            latitude: +latitude,
            longitude: +longitude,
            description,
            image_url
        };

        console.log(payload, "This should be info +++++++++++");

        if (name.length === 0) errors.push("Please provide a name for this location.");
        if (name.length > 100) errors.push("Please keep the length of the name of the location no more than 100 characters.")
        if (latitude.length === 0) errors.push("Please provide the latitude of the location.")
        // Make sure latitude and longitude are not text.
        // if (!latitude.isInteger) errors.push("Please submit an integer or decimal for the location's latitude.")
        // if (!longitude.isInteger) errors.push("Please submit an integer or decimal for the location's longitude.")
        if (longitude.length === 0) errors.push("Please provide the longitude of the location.")
        if (description.length === 0) errors.push("Please provide a description for this location.")
        if (!image_url.includes('.jpg' || '.jpeg' || '.png')) errors.push("Please provide a picture for this location.")

        if (errors.length) {
            setValidationErrors(errors);
            return;
        }

        if (!user) return <Redirect to="/login" />;

        let createdLocation = await dispatch(addNewLocation(payload));
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
            <h2 className="required-message">All fields are required!</h2>
            <form className="create-location-form" onSubmit={handleSubmit}>
                <div>
                    <ul>
                        {validationErrors.map((error, idx) => (
                            <li className="errors-create-location" key={idx}>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="name-of-location-div">
                    <input
                        type="string"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={updateName}
                        className="name-of-location"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Latitude"
                        className="latitude-for-location"
                        required
                        value={latitude}
                        onChange={updateLatitude}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Longitude"
                        className="longitude-for-location"
                        required
                        value={longitude}
                        onChange={updateLongitude}
                    />
                </div>
                <div>
                    <textarea
                        className="description-textarea"
                        rows="10"
                        placeholder="Description"
                        required
                        value={description}
                        onChange={updateDescription}
                    />
                </div>
                <div>
                    <input
                        className="img-submission"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        required
                        value={image_url}
                        onChange={updateImage_url}
                    />
                </div>
                <div>
                    <button className="submit-location" type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                <div>
                    <button type="button" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
};

export default CreateLocationForm;
