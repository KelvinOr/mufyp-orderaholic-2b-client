import app from '../Config/FirebaseConfig';

const db = app.firetore();


function getRestaurantData(restaurantId){
    return db.collection('restaurants').doc(restaurantId).get();
}


export { getRestaurantData };