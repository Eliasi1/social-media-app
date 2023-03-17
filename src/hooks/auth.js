import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from 'lib/firebase';
import { DASHBOARD, LOGIN } from 'lib/routes';
import isUsernameExist from 'utils/isUsernameExist'

export function useAuth() {

    //the auth user we receive here is only for authentication, and not the user we configured
    const [authUser, authLoading, error] = useAuthState(auth);
    // so we will go on and combine the user we figured to this one
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const ref = doc(db, "users", authUser.uid)
            const docSnap = await getDoc(ref)
            setUser(docSnap.data())
            setLoading(false)
        }
        if (!authLoading) {
            if (authUser){
                fetchData()
            } else { setLoading(false)} //Not Signed in
        }
    }, [authLoading])

    return { user, isLoading, error }
}

export function useLogin() {

    const [isLoading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()

    async function login({ email, password, redirectTo = DASHBOARD }) {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "You are logged in",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            navigate(redirectTo)
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            setLoading(false)
            return false //return false if login failed
        }

        setLoading(false)
        return true //return false if login succeeded
    }

    return { login, isLoading }
}

export function useRegister() {

    const [isLoading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()

    async function register({ username, email, password, redirectTo = DASHBOARD }) {
        setLoading(true)

        const usernameExists = await isUsernameExist(username)
        if (usernameExists) {
            toast({
                title: "Username already exists",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000
            })
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password) // create user for authentication

                await setDoc(doc(db, "users", res.user.uid), { //create also a user in our own class of users
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now()
                })

                toast({
                    title: "Account created",
                    description: "You are logged in",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000
                })
                navigate(redirectTo)
            } catch (error) {
                toast({
                    title: "Signing up failed",
                    description: error.message,
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000
                })
            }
            finally { setLoading(false) }
        }
    }

    return { register, isLoading }
}

export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast()
    const navigate = useNavigate()



    async function logout() {
        if (await signOut()) {
            toast({
                title: "Successfully logged out",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            navigate(LOGIN)
        } // toast error if signout return false
    }
    return { logout, isLoading }
}