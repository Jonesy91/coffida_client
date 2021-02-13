import { getAuthToken } from './AsyncStorageUtil';

const url = `http://10.0.2.2:3333/api/1.0.0`;

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
        if(!response.ok){
            throw new Error(response);
        }
        return response.json()})
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
        if(!response.ok){
            throw new Error(response)
        }
        return response.json()
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
    .then(response => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json()
    })
    .catch(error => {
        throw error;
    })

const favourite = (locationId, userToken) => 
    fetch(`${url}/${locationId}/favourite`,{
        method:'POST',
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(response);     
        }
    })
 
const unFavourite = (locationId, userToken) => 
    fetch(`${url}/location/${locationId}/favourite`,{
        method:'DELETE',
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(response);
        }
    });

const getLocation = (locationId, userToken) =>
    fetch(`${url}/location/${locationId}`,{
        method:'GET',    
        headers:{
            'X-Authorization': userToken
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
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
        if(!response.ok){
            throw new Error(response);
        }
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
        if(!response.ok){
            throw new Error(response);
        }
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
            if(!response.ok){
                throw new Error(response);
            }
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
        if(!response.ok) {
            throw new Error(response);     
        }
    });

const unLike = (locationId, reviewId, userToken) =>
    fetch(`${url}/${locationId}/review/${reviewId}/like`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': userToken,
        },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error(response);
        }
    });

const logIn = (body) => 
    fetch(`${url}/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    })


const logOut = (userToken) => 
    fetch(`${url}/user/logout`, {
        method: 'POST',
        headers: {
          'X-Authorization': userToken,
        },
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(response)
        }
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
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    })

    const getPhoto = (locationId, reviewId) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    })

    const addPhoto = (data) =>
    fetch(`${url}/location/${locationId}/review/${reviewId}/photo`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
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
        if(!response.ok){
            throw new Error(response);
        }
        return response.json();
    })
  
export {register, logIn, logOut , getFavourites, getLocation, getUser, like, unLike, favourite, unFavourite, submitReview, updateReview, deleteReview, getShops, patchUser};