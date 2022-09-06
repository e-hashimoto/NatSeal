import { response } from "express";

export const GET_SEALS = "/home/getSeals";
export const GET_SEAL = "/seals/getSeal";
export const ADD_SEAL = "/seals/addSeal";
export const EDIT_SEAL = "/seals/editSeal";
export const REMOVE_SEAL = "seals/removeSeal";

const getSeals = (seals) => ({
    type: GET_SEALS,
    seals
})

const getSeal = (seal) => ({
    type: GET_SEAL,
    seal
})

const addSeal = (seal) => ({
    type: ADD_SEAL,
    seal
})

const editSeal = (seal) => ({
    type: EDIT_SEAL,
    seal
})

const removeSeal = (seal) => ({
    type: REMOVE_SEAL,
    seal
})

// GET ALL SEALS
export const getAllSeals = () => async (dispatch) => {
    const resposne = await fetch("/api/seals/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getSeals(data));
    }
};

// GET ONE SEAL
export const getOneSeal = (id) => async (dispatch) => {
    const response = await fetch(`/api/seals/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSeal(data));
        return data;
    }
};

// POST SEAL
export const addNewSeal = (seal) => async (dispatch) => {
    const { user_id, name, scientific_name, image_url, description } = seal;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("name", name);
    form.append("scientific_name", scientific_name);
    form.append("image_url",  image_url);
    form.append("description", description);
    const response = await fetch("/api/seals/", {
        method: "POST",
        body: form,
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addSeal(data));
        return data;
    }
};

// EDIT SEAL (PUT)
export const editSingleSeal = (seal) => async (dispatch) => {
    const { user_id, name, scientific_name, image_url, description, id } = seal;

    const response = await fetch(`/api/seals/${id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, name, scientific_name, image_url, description })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editSeal(data));
        return data;
    }
};

// DELETE SEAL
export const deleteASeal = (id) => async (dispatch) => {
    const response = await fetch(`/api/seals/${id}/`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeSeal(data.id));
    }
};

// REDUCERS
const initialState = {};

const sealReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SEALS:
            const seals = action.seals;
            newState = { ...state };
            seals.seals.forEach((seal) => {
                newState[seal.id] = seal;
            });
            return newState;
        case GET_SEAL:
            return { ...state, [action.seal.id]: action.seal };
        case ADD_SEAL:
            return { ...state, [action.seal.id]: action.seal };
        case EDIT_SEAL:
            return { ...state, [action.seal.id]: { ...action.seal }};
        case REMOVE_SEAL:
            return { ...state, [action.id]: action.id };
        default:
            return state;
    }
};

export default sealReducer;
