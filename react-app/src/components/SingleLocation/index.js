import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleLocation,
  deleteALocation,
  editSingleLocation,
} from "../../store/locations";
import { useParams, useHistory, Redirect } from "react-router-dom";
import "./index.css";
// import EditLocation from "../EditLocation/EditLocation";
import EditLocationModal from "../EditLocation";

function SingleLocation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const location = useSelector((state) => state.locations[id]);
  const [isLoaded, setLoaded] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const account = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSingleLocation(id))
        // .then(() => setLoaded(true));
  }, [id, dispatch]);

  const deleteTheLocation = (id) => {
    dispatch(deleteALocation(id));
    history.push(`/locations`);
  };

  if (!location) return null;

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    isLoaded && (
      <div className="single-location-page">
        <h1 className="location-name">{location.name}</h1>
        <div className="location-image">
          <img src={location.image_url} />
        </div>
        <h2 className="coordinates">Coordinates</h2>
        <ul className="decimal-coordinates">
          <li className="location-latitude-coordinates">
            Latitude: {location.latitude}
          </li>
          <li className="location-longitude-coordinates">
            Longitude: {location.longitude}
          </li>
        </ul>
        <div className="location-description">
          {/* Description */}
          <div className="location-description-body">
            {location.description}
          </div>
        </div>
        <div>
            {location?.user_id === account?.id ? (
                <>
                    <div>
                        <EditLocationModal />
                    </div>
                    <button
                        className="single-location-delete-button"
                        id="delete-button"
                        onClick={deleteTheLocation}
                    >
                        Delete
                    </button>
                </>
            ) : (
                <><div>
                    Loading...
                  </div>
                </>
            )}
        </div>
      </div>
    )
  );
}

export default SingleLocation;
