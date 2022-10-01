import app from '../Config/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";


const auth = getAuth(app);

/*
Sign in
Return user
@param {string} email
@param {string} password
@returns {object} json
*/
function SignInWithEmail(email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

/*
Sign up
Return user
@param {string} email
@param {string} password
@returns {object} json
*/
function CreateUserWithEmailAndPassword(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

/*
Get user information
@returns {object} auth.currentUser
*/
function GetUserInfo(){
    return auth.currentUser;
}

/*
Check if user is logged in
@returns {boolean} true if user is logged in
*/
function isLogin(){
    return auth.currentUser ? true : false;
}

/*
Sign out 
No return value
*/
function Signout(){
    auth.signOut();
}


export { SignInWithEmail, CreateUserWithEmailAndPassword, GetUserInfo, Signout, isLogin };
