import app from '../Config/FirebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { GetUserInfo } from './FirebaseAuth';

const db = getFirestore(app);

/*
Get restaurant data by id
@param {string} id
@returns {object} Restaurant data
*/
async function getRestaurantData(restaurantId){
    const RestaurantRef = doc(db, "restaurants", restaurantId);
    return await getDoc(RestaurantRef);
}


/*
Create new restaurant data by id
@param {object} restaurantData
@returns {object} Restaurant data
*/
async function newRestaurantData(restaurantData){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    return await setDoc(RestaurantRef, restaurantData);
}

export { getRestaurantData, newRestaurantData };