import app from '../Config/FirebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { GetUserInfo } from './FirebaseAuth';

const db = getFirestore(app);


async function getRestaurantData(restaurantId){
    const RestaurantRef = doc(db, "restaurants", restaurantId);
    return await getDoc(RestaurantRef);
}

async function newRestaurantData(restaurantData){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    console.log(GetUserInfo().uid)
    return await setDoc(RestaurantRef, restaurantData);
}

export { getRestaurantData, newRestaurantData };