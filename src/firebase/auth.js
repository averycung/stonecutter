import {auth} from "./firebaseConfig"
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, updatePassword, signInAnonymously } from "firebase/auth"


export const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginAnon = async () => {
    return signInAnonymously(auth)
}

export const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //result.user
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const resetPassword = async (email) => {
    try{
        await sendPasswordResetEmail(auth, email);
        alert('Email sent')
    } catch (error) {
        alert('Failed to send email')
    }
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};