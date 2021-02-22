import { getAuthToken } from '../asyncstorage/AsyncStorageUtil';

const url = `http://10.0.2.2:3333/api/1.0.0`;

/* 
Checks if the request was successful, if successful and has a body
converts the response to json.
*/
const handleResponse = async (response) => {
    if(!response.ok && response.status !== 304){
        throw response;
    } else if (response.status === 201) {
        return response;
    }
    const responseText = await response.text();
    if(responseText.length > 2){
        return JSON.parse(responseText);
    }
    return response;
}

/*
User Management API requests
*/

/* 
GET reqeust for the users details
*/
const getUser = (userId, userToken) =>
    fetch(`${url}/user/${userId}`, {
        method: 'GET',
        headers: {
            'X-Authorization': userToken,
        },
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
PATCH request to update the users details
*/
const patchUser = (userId, userToken, body) =>
    fetch(`${url}/user/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userToken,
        },
        body: JSON.stringify(body),
    })
    .then(response => {
        if(!response.ok){
            throw new Error(response);            
        }
    })
    .catch(error => {
        throw error;
    })

/* 
POST request to log in
*/
const logIn = (body) => 
    fetch(`${url}/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
POST reques to log out 
*/
const logOut = (userToken) => 
    fetch(`${url}/user/logout`, {
        method: 'POST',
        headers: {
          'X-Authorization': userToken,
        },
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
POST request to create a new user
*/
const register = (data) =>
    fetch(`${url}/user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error
    });

/* 
Location Review API requests
*/

/* 
POST request to submit a new review
*/
const submitReview = (locationId, userToken, body) =>
    fetch(`${url}/location/${locationId}/review`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-Authorization': userToken
        },
        body:JSON.stringify(body)
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/*
PATCH request to update a review
*/
const updateReview = (locationId, userToken, body, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}`, {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'X-Authorization': userToken
        },
        body:JSON.stringify(body)
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
DELETE request to delete a review
*/
const deleteReview = async (reviewId, locationId) => {
    try{
        const token = await getAuthToken();
        const response = await fetch(`${url}/location/${locationId}/review/${reviewId}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
        const respJson =  await handleResponse(response);
        return respJson;
    } catch(error) {
        throw error;
    }
}

/* 
POST request to like a review
*/
const like = (locationId, reviewId, userToken) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/like`, {
        method: 'POST',
        headers: {
            'X-Authorization': userToken,
        },
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/*
DELETE request to unlike a review
*/
const unLike = (locationId, reviewId, userToken) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/like`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': userToken,
        },
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
GET request to get a photo for a review
*/
const getPhoto = (userToken, locationId, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'GET',
        headers: {
            'X-Authorization': userToken,
            'Content-Type': 'application/json'
        },
    })
    .then((response) => {
        return response;
    })
    .catch(error => {
        throw error;
    })

/* 
POST request to upload a photo
*/    
const addPhoto = (userToken, data, locationId, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'POST',
        headers: {
            'X-Authorization': userToken,
            'Content-Type': 'image/jpeg'
        },
        body: data
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/*
DELETE request to delete a photo
*/
const deletePhoto = (userToken, locationId, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'DELETE',
        headers: {
            'X-Authorization': userToken,
        }
    })
    .then((response) => {
        const returnResponse = handleResponse(response);
        return returnResponse;
    })
    .catch(error => {
        throw error;
    })


/* 
Location Management API requests    
*/

/* 
GET request to get all shops
*/
const getShops = (userToken) => 
    fetch(`${url}/find`,{
        method: 'GET',    
        headers:{
            'X-Authorization': userToken
        }
    })
    .then((response) => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/*
GET request to get the users favourites 
*/
const getFavourites = (userToken) =>
    fetch(`${url}/find?search_in=favourite`,{
        method: 'GET',
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        const respJson = handleResponse(response);
        return respJson;
    }) 
    .catch(error => {
        throw error;
    })

/* 
GET request to find shops with filter parameters
*/
const getShopsFiltered = (userToken, params) => 
    fetch(`${url}/find?${params}`,{
        method: 'GET',    
        headers:{
            'X-Authorization': userToken
        }
    })
    .then((response) => {
        //const respJson = handleResponse(response);
        return response.json();
    })
    .catch(error => {
        throw error;
    })

/* 
POST request to mark a location as a favourite
*/
const favourite = (locationId, userToken) => 
    fetch(`${url}/location/${locationId}/favourite`,{
        method:'POST',
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
DELETE request to un-favourite a location
*/
const unFavourite = (locationId, userToken) => 
    fetch(`${url}/location/${locationId}/favourite`,{
        method:'DELETE',
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    })

/* 
GET request to get data for a specific location
*/
const getLocation = (locationId, userToken) =>
    fetch(`${url}/location/${locationId}`,{
        method:'GET',    
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        const respJson = handleResponse(response);
        return respJson;
    })
    .catch(error => {
        throw error;
    });


  
export {register, logIn, logOut , getFavourites, getLocation, getUser, like, unLike, favourite, unFavourite, submitReview, updateReview, deleteReview, getShops, patchUser, addPhoto, getPhoto, deletePhoto, getShopsFiltered};