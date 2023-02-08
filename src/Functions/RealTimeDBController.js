import app from '../Config/FirebaseConfig';
import { GetUserInfo } from './FirebaseAuth';
import { addOrderHistory, getRestaurantData } from './FireStoreController';
import { 
    getDatabase,
    push,
    ref, 
    update,
    onValue,
    get, } from "firebase/database";

const db = getDatabase(app);

async function InsertOrder(orderData){

    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    const OrderRefKey = push(ref(db, "orders/" + GetUserInfo().uid)).key;
    var restaurantData = null;
    console.log(GetUserInfo().uid);



    orderData["orderTime"] = new Date();
    orderData["restaurantID"] = GetUserInfo().uid;

    restaurantData = await getRestaurantData(GetUserInfo().uid.toString());

    console.log(GetUserInfo().uid);
    orderData["Detail"] = {};
    orderData["OrderID"] = OrderRefKey;

    console.log(restaurantData.data());
    orderData["restaurantName"] = restaurantData.data().Name;
    orderData["restaurantType"] = restaurantData.data().Type;

    console.log(orderData);
    //using database
    return await update(OrderRef, {[OrderRefKey]: orderData});
}

async function GetOrder(){
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    return await get(OrderRef);

}


async function DeleteOrder(OrderID){ 
    console.log(OrderID);
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    await get(OrderRef).then((snapshot) => {
        const data = snapshot.val();
        addOrderHistory(data[OrderID]);
    });
    return await update(OrderRef, {[OrderID]: null});
}

async function UpdateOrder(Orderdata, OrderID){
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    var ordertemp = {};
    await GetOrder().then((snapshot) => {
        const data = snapshot.val();
        ordertemp = data[OrderID];
    });
    ordertemp["Item"] = Orderdata;

    return await update(OrderRef, {[OrderID]: ordertemp});
    
    
}

export { InsertOrder, GetOrder, DeleteOrder, UpdateOrder };