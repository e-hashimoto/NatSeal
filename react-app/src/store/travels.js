export const GET_TRAVELS = "/home/getTravels";
export const GET_TRAVEL = "/travels/getTravel";
export const ADD_TRAVEL = "travels/addTravel";
export const EDIT_TRAVEL = "/travels/editTravel";
export const REMOVE_TRAVEL = "/travels/removeTravel";

const getTravels = (travels) => ({
    type: GET_TRAVELS,
    travels
})

const getTravel = (travel) => ({
    type: GET_TRAVEL,
    travel
})

const addTravel = (travel) => ({
    type: ADD_TRAVEL,
    travel
})

const editTravel = (travel) => ({
    type: EDIT_TRAVEL,
    travel
})

const removeTravel = (travel) => ({
    type: REMOVE_TRAVEL,
    travel
})

// GET ALL TRAVELS
export const getAllTravels = () => async (dispatch) => {
    const response = await fetch("/api/travels/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getTravels(data));
    }
};

// GET ONE TRAVEL
export const getSingleTravel = (id) => async (dispatch) => {
    const response = await fetch(`/api/locations/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getTravel(data));
        return data;
    }
};

// POST TRAVEL
export const addNewTravel = (travel) => async (dispatch) => {
    const { user_id, location_id, description, image_url } = travel;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("location_id", location_id);
    form.append("description", description);
    form.append("image_url", image_url);
    const response = await fetch("/api/travels/", {
        method: "POST",
        body: form,
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addTravel(data));
        return data;
    }
};

// EDIT TRAVEL (PUT)
export const editSingleTravel = (travel) => async (dispatch) => {
    const { user_id, location_id, description, image_url } = travel;
    const response = await fetch(`/api/travels/${id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, location_id, description, image_url })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editTravel(data));
        return data;
    }
};

// DELETE TRAVEL
export const deleteATravel = (id) => async (dispatch) => {
    const response = await fetch(`/api/travels/${id}/`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeTravel(data.id));
    }
};

// REDUCERS
const initialState = {};

const travelReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_TRAVELS:
            const travels = action.travels;
            newState = { ...state };
            travels.Travels.forEach((travel) => {
                newState[travel.id] = travel;
            });
            return newState;
        case GET_TRAVEL:
            return { ...state, [action.travel.id]: action.travel };
        case ADD_TRAVEL:
            return { ...state, [action.travel.id]: action.travel };
        case EDIT_TRAVEL:
            return { ...state, [action.travel.id]: { ...action.travel }};
        case REMOVE_TRAVEL:
            return delete { ...state, [action.id]: action.id };
        default:
            return state;
    }
};

export default travelReducer;
