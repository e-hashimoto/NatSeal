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
    const res = await fetch("/api/travels/");

    if (res.ok) {
        const data = await res.json();
        dispatch(getTravels(data));
    }
};

// GET ONE TRAVEL
export const getSingleTravel = (id) => async (dispatch) => {
    const res = await fetch(`/api/travels/${id}/`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getTravel(data));
        return data;
    }
};

// POST TRAVEL
export const addNewTravel = (travel) => async (dispatch) => {
    const { user_id, name, location_id, description, image_url } = travel;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("name", name)
    form.append("location_id", location_id);
    form.append("description", description);
    form.append("image_url", image_url);
    const res = await fetch("/api/travels/", {
        method: "POST",
        body: form,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addTravel(data));
        return data;
    }
};

// EDIT TRAVEL (PUT)
export const editSingleTravel = (travel) => async (dispatch) => {
    const { user_id, location_id, description, image_url, id } = travel;
    const res = await fetch(`/api/travels/${id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, location_id, description, image_url })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editTravel(data));
        return data;
    }
};

// DELETE TRAVEL
export const deleteATravel = (id) => async (dispatch) => {
    const res = await fetch(`/api/travels/${id}/`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
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
            travels.travels.forEach((travel) => {
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
