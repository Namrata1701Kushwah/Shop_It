import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    

    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,

    NEW_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'


export const getProducts = (keyword = "", currentPage = 1, price, category, rating = 0) => async (dispatch) => {

    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })

        // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}
        // &price[gte]=${price[0]}`
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price
        [1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            //   console.log("Actionnnnnnnnnnnnnnnnnnnnnnnnnn",category)

            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price
            [1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }


        const { data } = await axios.get(link)
        // console.log("===============================================",data);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
}

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST })
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)
        // console.log("NNNNNNNNNNNNNNNNNN", data)
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newReview = (reviewData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config)
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", data);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", data);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}


export const newProduct = (productData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", data);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}

//UPdate product(Admin)
export const updateProduct = (id,productData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", data);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}





export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/products`)
        console.log("HHHHHHHHHHHHHH", data);
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}



//Clear Error

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })

}