import app from '../Config/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(app);

/*
Sign in
Return user
@param {string} email
@param {string} password
@returns {object} json
*/
function SignInWithEmail(email, password){
    console.log({email: email, password: password});
    return signInWithEmailAndPassword(auth, email, password)
}

/*
Sign up
Return user
@param {string} email
@param {string} password
@returns {object} json
*/
function CreateUserWithEmailAndPassword(email, password){
    console.log({email: email, password: password});
    return createUserWithEmailAndPassword(auth, email, password)
}

/*
Get user information
@returns {object} auth.currentUser
*/
function GetUserInfo(){
    if (auth.currentUser) {
        return auth.currentUser;
    }
}

/*
Sign out 
No return value
*/
function Signout(){
    auth.signOut();
}


export { SignInWithEmail, CreateUserWithEmailAndPassword, GetUserInfo, Signout };
