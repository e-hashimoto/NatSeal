// import { res } from "express";

export const GET_LOCATIONS = "/home/getLocations";
export const GET_LOCATION = "/locations/getLocation";
export const ADD_LOCATION = "/locations/addLocation";
export const EDIT_LOCATION = "/locations/editLocation";
export const REMOVE_LOCATION = "/locations/removeLocation";

const getLocations = (locations) => ({
    type: GET_LOCATIONS,
    locations
})

const getLocation = (location) => ({
    type: GET_LOCATION,
    location
})

const addLocation = (location) => ({
    type: ADD_LOCATION,
    location
})

const editLocation = (location) => ({
    type: EDIT_LOCATION,
    location
})

const removeLocation = (location) => ({
    type: REMOVE_LOCATION,
    location
})

// GET ALL LOCATIONS
export const getAllLocations = () => async (dispatch) => {
    const res = await fetch("/api/locations/");

    if (res.ok) {
        const data = await res.json();
        dispatch(getLocations(data));
    }
};

// GET ONE LOCATION
export const getSingleLocation = (id) => async (dispatch) => {
    const res = await fetch(`/api/locations/${id}/`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getLocation(data));
        return data;
    }
};

// POST LOCATION
export const addNewLocation = (location) => async (dispatch) => {
    const { user_id, name, latitude, longitude, description, image_url } = location;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("name", name);
    form.append("latitude", latitude);
    form.append("longitude", longitude);
    form.append("description", description);
    form.append("image_url", image_url);
    const res = await fetch("/api/locations/", {
        method: "POST",
        body: form,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addLocation(data));
        return data;
    }
};

// EDIT LOCATION (PUT)
export const editSingleLocation = (location) => async (dispatch) => {
    const { latitude, longitude, description, image_url, id } = location;
    const res = await fetch(`/api/locations/${id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, description, image_url }),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editLocation(data));
        return data;
    }
};

// DELETE LOCATION
export const deleteALocation = (id) => async (dispatch) => {
    const res = await fetch(`/api/locations/${id}/`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeLocation(data.id));
    }
};

// REDUCERS
const initialState = {};

const locationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LOCATIONS:
            const locations = action.locations;
            newState = { ...state };
            locations.locations.forEach((location) => {
                newState[location.id] = location;
            });
            return newState;
        case GET_LOCATION:
            return { ...state, [action.location.id]: action.location };
        case ADD_LOCATION:
            return { ...state, [action.location.id]: action.location };
        case EDIT_LOCATION:
            return { ...state, [action.location.id]: { ...action.location } };
        case REMOVE_LOCATION:
            return delete { ...state, [action.id]: action.id };
        default:
            return state;
    }
};

export default locationReducer;
