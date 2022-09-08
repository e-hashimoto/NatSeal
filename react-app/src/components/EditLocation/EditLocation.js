import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSingleLocation, getAllLocations } from "../../store/locations";

function EditLocation() {
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImage_url] = useState("");
    const hiddenRef = useRef();
    const history = useHistory();

    const url = useParams();
    const locationId = url.id;

    const dispatch = useDispatch();

    const updateName = (e) => setName(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImage_url = (e) => setImage_url(e.target.value);

    useEffect(() => {
        dispatch(getAllLocations())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            locationId,
            name,
            latitude,
            longitude,
            description,
            image_url
        };

        let updatedLocation = await dispatch(editSingleLocation(payload));
        if (updatedLocation) {
            history.push(`/location/${location?.id}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push("/locations")
    };

    return (
        <div className="edit-location-form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={updateName}
                />
                <input
                    type="float"
                    placeholder="Latitude"
                    value={latitude}
                    required
                    onChange={updateLatitude}
                />
                <input
                    type="float"
                    placeholder="Longitude"
                    value={longitude}
                    required
                    onChange={updateLongitude}
                />
                <textarea
                    className="update-location-description"
                    rows="7"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={updateDescription}
                />
                <input
                    ref={hiddenRef}
                    hidden
                    type="file"
                    name="Image URL"
                    onChange={updateImage_url}
                    accept=".jpg, .jpeg, .png"
                />
                <button type="button" className="submit-edit-location">
                    Submit
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    )

}

export default EditLocation;
