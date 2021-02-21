import { getAuthToken } from '../asyncstorage/AsyncStorageUtil';

const url = `http://10.0.2.2:3333/api/1.0.0`;

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

const getShopsFiltered = (userToken, params) => 
    fetch(`${url}/find?${params}`,{
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

    const deleteReview = async (reviewId, locationId) => {
        const token = await getAuthToken();
        fetch(`${url}/location/${locationId}/review/${reviewId}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
        .then((response) => {
            const respJson = handleResponse(response);
            return respJson;
        })
        .catch(error => {
            throw error;
        })
    }

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

    const getPhoto = (userToken, locationId, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'POST',
        headers: {
            'X-Authorization': userToken,
            'Content-Type': 'application/json'
        },
    })
    .then((response) => {
        return response.blob();
    })
    .catch(error => {
        throw error;
    })

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

    const deletePhoto = (data) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
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
        throw error;
    })
  
export {register, logIn, logOut , getFavourites, getLocation, getUser, like, unLike, favourite, unFavourite, submitReview, updateReview, deleteReview, getShops, patchUser, addPhoto, getPhoto, getShopsFiltered};