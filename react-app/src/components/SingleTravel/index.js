import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTravel,
  deleteATravel,
  editSingleTravel,
} from "../../store/travels";
import { useParams, useHistory } from "react-router-dom";
import "./index.css";
import EditTravelModal from "../EditTravel/EditTravel";

function SingleTravel() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const travel = useSelector((state) => state.travels[id]);
  const [isLoaded, setLoaded] = useState(true);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSingleTravel(id))
        // .then(() => setLoaded(true));
  }, [id, dispatch]);

  const TravelDeleter = async (e) => {
    await dispatch(deleteATravel(id));
    history.push("/travels");
  }

  if (!travel) return null;

  return (
    isLoaded && (
        <>
            <div className="single-travel-page">
                <h1 className="travel-name">{travel.name}</h1>
                <div className="travel-image">
                    <img src={travel.image_url} />
                </div>
                <div className="description-travel">{travel.description}</div>

                <div>
                    {travel?.user_id === currentUser?.id ? (
                        <>
                            <div>
                                <EditTravelModal />
                            </div>
                            <button
                                className="single-travel-delete"
                                id="delete-button"
                                onClick={TravelDeleter}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
  )
}

export default SingleTravel;
