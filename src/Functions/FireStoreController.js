import app from '../Config/FirebaseConfig';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);


async function getRestaurantData(restaurantId){
    const RestaurantRef = doc(db, "restaurants", restaurantId);
    return await getDoc(RestaurantRef);
}


export { getRestaurantData };