import { Firebaseapp } from "../Config/Firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(Firebaseapp);

/*
Sign in
Return user
@param {string} email
@param {string} password
@returns {object} user or error message
*/
function SignInWithEmail(email, password){
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        return user;
    }).catch((error) => {
        const errorMessage = error.message; 
        return errorMessage;
    });
}

/*
Sign up
Return user
@param {string} email
@param {string} password
@param {string} confirm password
@returns {object} user or error message
*/
function CreateUserWithEmailAndPassword(email, password, confirmPassword){
    if(password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            return user;
        }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
    } else {
        alert("Passwords do not match");
    }
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
