/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';



let token = null;

export const getToken = () => token;




const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
      const [loading,setLoading]= useState(true)



const createUser = (email,password) =>{
       setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
}

const loginUser =(email,password)=>{
     setLoading(true)
     return signInWithEmailAndPassword(auth,email,password)
}

const logOut = () =>{
    setLoading(true)
    return signOut(auth).then(()=>window.location.reload())
}


const updateUserProfile = profileInfo =>{
    setLoading(true)
    return updateProfile(auth.currentUser, profileInfo)
}


// state observer 
useEffect(()=>{
    const unSubscriber = onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser);
        setLoading(false)
        // if(currentUser){
        //     currentUser.getIdToken().then((idToken) => {
        //         token = idToken;
        //     })
        // }
        // else {token = null}
    })
    return()=>{
        unSubscriber()
    }
},[])



    const userInfo = {
         user,
         loading,
         createUser,
         loginUser,
         logOut,
         updateUserProfile
    }

    return (
        <AuthContext value={userInfo}>
               {children}
        </AuthContext>
    )
};

export default AuthProvider;