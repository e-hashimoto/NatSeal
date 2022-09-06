export const GET_ARTICLES = "/home/getArticles";
export const GET_ARTICLE = "/articles/getArticle";
export const ADD_ARTICLE = "/articles/addArticle";
export const EDIT_ARTICLE = "/articles/editArticle";
export const REMOVE_ARTICLE = "/articles/removeArticle";

const getArticles = (articles) => ({
    type: GET_ARTICLES,
    articles
});

const getArticle = (article) => ({
    type: GET_ARTICLE,
    article
});

const addArticle = (article) => ({
    type: ADD_ARTICLE,
    article
});

const editArticle = (article) => ({
    type: EDIT_ARTICLE,
    article
});

const removeArticle = (article) => ({
    type: REMOVE_ARTICLE,
    article
});

// GET ALL ARTICLES
export const getAllArticles = () => async (dispatch) => {
    const response = await fetch("/api/articles/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getArticles(data));
    }
};

// GET ONE ARTICLE
export const getSingleArticle = (id) => async (dispatch) => {
    const response = await fetch(`/api/articles/${id}/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getArticle(data));
        return data;
    }
};

// POST ARTICLE
export const addNewArticle = (article) => async (dispatch) => {
    const { user_id, seal_id, title, body } = article;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("seal_id", seal_id);
    form.append("title", title);
    form.append("body", body);
    const response = await fetch("/api/articles/", {
        method: "POST",
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addArticle(data));
        return data;
    }
}

// EDIT ARTICLE (PUT)
export const editSingleArticle = (article) => async (dispatch) => {
    const { user_id, seal_id, title, body, id } = article;

    const response = await fetch(`/api/articles/${id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, seal_id, title, body })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editArticle(data));
        return data;
    }
};

// DELETE ARTICLE
export const deleteAnArticle = (id) => async (dispatch) => {
    const response = await fetch(`/api/articles/${id}/`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeArticle(data.id));
    };
};

// REDUCERS
const initialState = {};

const articleReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ARTICLES:
            const articles = action.articles;
            newState = { ...state };
            articles.articles.forEach((article) => {
                newState[article.id] = article;
            });
            return newState;
        case GET_ARTICLE:
            return { ...state, [action.article.id]: action.article };
        case ADD_ARTICLE:
            return { ...state, [action.article.id]: action.article };
        case EDIT_ARTICLE:
            return { ...state, [action.article.id]: action.article };
        case REMOVE_ARTICLE:
            return delete { ...state, [action.id]: action.id };
        default:
            return state;
    }
};

export default articleReducer;
