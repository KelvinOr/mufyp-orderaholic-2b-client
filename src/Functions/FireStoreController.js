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
Update restaurant data by id
@param {object} restaurantData
@returns {object} update result
*/
async function updateRestaurantData(restaurantData){
    const RestaurantRef = doc(db, "restaurants", GetUserInfo().uid);
    return await updateDoc(RestaurantRef, restaurantData);
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
    const RestaurantRef = doc(db, "history_business", GetUserInfo().uid);
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

async function checkOrderHistoryListIsCreated(){
    
    const RestaurantRef = doc(db, "history_business", GetUserInfo().uid);
    const docSnap = await getDoc(RestaurantRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function addOrderHistoryToUserRecord(OrderData, CID){

    const HistoryRef = doc(db, "history_custom", CID);
    const date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var result = await checkOrderHistoryToUserRecord(CID);

    //console.log(result);
    if(result == null){
        await setDoc(HistoryRef, {[`${day}-${month}-${year}`]: [OrderData]});
    }
    else {
        var pushdate = result;
        if (result[`${day}-${month}-${year}`] === undefined){
            pushdate[`${day}-${month}-${year}`] = [OrderData];
        } else {
            pushdate[`${day}-${month}-${year}`].push(OrderData);
        }
    
        return await updateDoc(HistoryRef, pushdate);
    }
}

async function checkOrderHistoryToUserRecord(CID){
    const HistoryRef = doc(db, "history_custom", CID);
    const docSnap = await getDoc(HistoryRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export { getRestaurantData, newRestaurantData, createMenu, getMenu, updateMenu, addOrderHistory, addOrderHistoryToUserRecord, updateRestaurantData };