import { getAllTravels, getSingleTravel } from "../../store/travels";
import CreateTravelForm from "./CreateTravelForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./travel.css";

const Travels = () => {
    const dispatch = useDispatch();
    const travelsObject = useSelector((state) => state.travels);
    const travels = Object.values(travelsObject);

    const sessionUser = useSelector((state) => state.session.user);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users/");
            const resData = await response.json();
            setUsers(resData.users);
        };
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(getAllTravels());
    }, [dispatch]);

    const handleClick = (id) => {
        dispatch(getSingleTravel(id));
    };

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className="travel-page">
            <div className="column-container">
                {travels.map((travel) => {
                    return <div key={travel.id}>
                        <NavLink exact to={`/travels/${travel.id}`} onClick={()=> handleClick(travel.id)}>{travel.name}</NavLink>
                    </div>
                })}
            </div>
            <div className="create-travel-form">
                <CreateTravelForm />
            </div>
        </div>
    )
}

export default Travels;
