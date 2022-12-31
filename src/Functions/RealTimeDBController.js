import app from '../Config/FirebaseConfig';
import { GetUserInfo } from './FirebaseAuth';
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

    orderData["orderTime"] = new Date();
    orderData["restaurantID"] = GetUserInfo().uid;
    console.log(GetUserInfo().uid);
    orderData["Detail"] = {};
    orderData["OrderID"] = OrderRefKey;

    console.log(orderData);
    //using database
    return await update(OrderRef, {[OrderRefKey]: orderData});
}

async function GetOrder(){
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    return await get(OrderRef);

}

async function MonitorNewOrder(){
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    onValue(OrderRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}

async function DeleteOrder(OrderID){
    const OrderRef = ref(db, "orders/" + GetUserInfo().uid);
    return await update(OrderRef, {[OrderID]: null});
}


export { InsertOrder, GetOrder, MonitorNewOrder, DeleteOrder };