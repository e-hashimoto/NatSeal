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
    const [description, setDescription] = useState(currentTravel.description);
    const [image_url, setImage_url] = useState(currentTravel.image_url);
    const [validationErrors, setValidationErrors] = useState([]);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionUser) history.push("/login");
        const errors = [];

        if (description.length > 10000) errors.push("Description is too long.");
        if (!image_url) errors.push("Please provide an image.");

        if (errors.length) {
            setValidationErrors(errors);
            return;
        };

        const data = {
            description,
            id: travel?.id,
            image_url
        };
        await dispatch(editSingleTravel(data));
        history.push(`/travels/${travel.id}`);
        setShowModal(false);
    };

    if (!sessionUser) return <Redirect to="/signup" />;

    return (
        <div className="editor">
            <div className="upload-image-background">
                <div className="upload-image">
                    <h1 className="upload-image-h1">Edit Image Description</h1>
                    <form className="upload-form" onSubmit={handleSubmit}>
                        <h2>
                            All fields are required.
                        </h2>
                        <ul>
                            {validationErrors.map((error, idx) => (
                                <li className="errors-edit-travel" key={idx}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                        <textarea
                            className="upload-text-area"
                            rows="7"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* <input
                            className="upload-image-pic-for-travel"
                            type="file"
                            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                            required
                            value={}
                        /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTravel;
