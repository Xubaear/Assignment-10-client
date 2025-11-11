import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth(app);
export const AuthContext= createContext()


const googleProvider= new GoogleAuthProvider()


const AuthProvider = ({children}) => {

    const [user,setUser]= useState(null)
console.log(user)

const createUser= (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
}


const signIn=(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}


const signInWithGoogle=()=>{
    // setLoading(true)
    return signInWithPopup(auth, googleProvider)
}


const logOut=()=>{
    return signOut(auth)
}

// observer for saving the data

useEffect(()=>{
 const unsubcribe=   onAuthStateChanged(auth, (currentUser)=>{
setUser(currentUser)
    })

    return()=>{
unsubcribe()
    }
},[])


    const authData= {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        signInWithGoogle,
    }
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;