import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FirebaseConfig'
import { setUser } from '../app/slices/AuthSlice'

const useAuth = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const [mainUser, setMainUser]= useState({})

 useEffect(()=>{
    const unsubscribe = onAuthStateChanged(firebaseAuth,(currentUser)=>{
        // console.log(currentUser)
        if(currentUser){
            const User = JSON.stringify(currentUser)
            setMainUser(User)
        }
        if(!currentUser){
            navigate("/login")
        }else{
            setUser({
                uid:currentUser.uid,
                name:currentUser.displayName,
                email:currentUser.email
            })
        }
        console.log(mainUser)
    })
    return ()=> unsubscribe()
 },[])
}

export default useAuth
