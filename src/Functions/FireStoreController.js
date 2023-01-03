import app from '../Config/FirebaseConfig';
import { GetUserInfo } from './FirebaseAuth';
import { getFirestore, 
         doc,
         getDoc,
         setDoc,
         updateDoc, } from "firebase/firestore";

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
@returns {object} add result
*/
async function newRestaurantData(restaurantData){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    return await setDoc(RestaurantRef, restaurantData);
}

/*
Add new menu data by id
@param {object} menuData
@returns {object} update result
*/
async function createMenu(menuData){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    return await updateDoc(RestaurantRef, menuData);
}

/*
Get menu data by id
@returns {object} menu data
*/
async function getMenu(){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    const docSnap = await getDoc(RestaurantRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

/*
Update menu data by id
@param {object} menuData
@returns {object} update result
*/
async function updateMenu(menuData){
    console.log(menuData);
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    return await updateDoc(RestaurantRef, {menu: menuData});
}


async function addOrderHistory(orderData){
    const RestaurantRef = doc(db, "history", GetUserInfo().uid);
    const date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var result = await checkOrderHistoryListIsCreated();

    //console.log(result);
    if(result == null){
        await setDoc(RestaurantRef, {[`${day}-${month}-${year}`]: [orderData]});
    } else {
        var pushdate = result;
        if (result[`${day}-${month}-${year}`] === undefined){
            pushdate[`${day}-${month}-${year}`] = [orderData];
        } else {
            pushdate[`${day}-${month}-${year}`].push(orderData);
        }
    
        return await updateDoc(RestaurantRef, pushdate);
    }


    //return await updateDoc(RestaurantRef, {[`${day}-${month}-${year}`]: orderData});
}

async function checkOrderHistoryListIsCreated(restaurantData){
    
    const RestaurantRef = doc(db, "history", GetUserInfo().uid);
    const docSnap = await getDoc(RestaurantRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export { getRestaurantData, newRestaurantData, createMenu, getMenu, updateMenu, addOrderHistory };