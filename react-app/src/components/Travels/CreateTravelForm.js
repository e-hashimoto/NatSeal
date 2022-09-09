import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addNewTravel } from "../../store/travels";

const CreateTravelForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImage_url] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [location, setLocation] = useState("");

    const updateDescription = (e) => setDescription(e.target.value);
    const updateImage_url = (e) => setImage_url(e.target.value);
    const updateLocation = (e) => setLocation(e.target.value);

    // useEffect(() => {
    //     const locationArr = Object.values(sessions).filter((currentLocation) => )
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return <Redirect to="/login" />;
        const errors = [];

        if (description.length === 0) {
            errors.push("Please provide a description for this travel opportunity.")
        };
        if (description.length > 10000) {
            errors.push("Please shorten the description for this travel opportunity.")
        };
        if (!image_url) errors.push("Please provide an image for this traveling opportunity.");

        if (errors.length) {
            setValidationErrors(errors);
            return;
        }

        const payload = {
            user_id: user?.id,
            location_id: location?.id,
            name,
            description,
            image_url
        };

        let createdTravel = await dispatch(addNewTravel(payload));
        if (createdTravel) {
            history.push(`/travels/${createdTravel.id}`);
        }

    };

    const handleCancelClick = (e) => {
        e.preventDefault();
    };

    return (
        <section className="new-travel-form">
            <h1>Tell us about a new travel opportunity!</h1>
            <h2 className="required-message-travel">All fields are required!</h2>
            <form className="create-travel-form" onSubmit={handleSubmit}>
                <ul>
                    {validationErrors.map((error, idx) => (
                        <li className="errors-create-travel" key={idx}>
                            {error}
                        </li>
                    ))}
                </ul>
                {/* <select className="location-selector" value={location} onChange={updateLocation}
                    {}
                /> */}
                <textarea
                    type="string"
                    required
                    placeholder="Description"
                    rows="7"
                    value={description}
                    onChange={updateDescription}
                />
                <input
                    className="img-submission-travel"
                    type="file"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                    required
                    value={image_url}
                    onChange={updateImage_url}
                />
                <button className="submit-travel" type="submit">
                    Submit
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </form>
        </section>
    )
};

export default CreateTravelForm;
