import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import animation from "../assets/animation.gif"
import logo from '../assets/logo.jpg'
import React from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { firebaseAuth, userRef } from '../utils/FirebaseConfig'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/slices/AuthSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser){
      navigate("/")
    }
  })
  const login = async()=>{
    const provider = new GoogleAuthProvider();
    const {user:{displayName, email, uid}}= await signInWithPopup(firebaseAuth, provider)
    if(email){
      const firestoreQuery = query(userRef, where("uid", "==", uid))
      const fetchedUsers = await getDocs(firestoreQuery)
      if(fetchedUsers.docs.length === 0){
        await addDoc(userRef,{
          uid,
          name:displayName,
          email
        })
      } 
    }
    navigate("/")
    dispatch(setUser({uid, name:displayName, email}))
  }
  return (
    <EuiProvider colorMode='dark'>
      <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:"100vw", height:"100vh"}}>
        <EuiFlexItem grow={false}>
          <EuiPanel>
            <EuiFlexGroup alignItems='center' justifyContent='center'>
            <EuiFlexItem>
          <EuiImage src={animation} alt='logo'/>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiImage src={logo} alt='logo' size='170px' style={{borderRadius:"15px"}} />
          <EuiSpacer size='s' />
          <EuiText textAlign='center' >
            <h3>
              <EuiTextColor >One Plateform to</EuiTextColor>
              <EuiTextColor color='#0b5cff'> connect</EuiTextColor>
            </h3>
          </EuiText>
          <EuiSpacer size='l'/>
          <EuiButton fill onClick={login}>Login with Google</EuiButton>
        </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  )
}

export default Login
