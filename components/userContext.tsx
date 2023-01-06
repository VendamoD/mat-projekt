import { createContext, useContext, useState, useEffect } from "react";
import {
    Auth, createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail, getAuth, onAuthStateChanged,
    signInWithEmailAndPassword, signOut,
    User as FirebaseUser
} from "firebase/auth";
import { app } from "../firebase"
import { getFirestore, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
//const user = auth.currentUser;
const db = getFirestore(app);
let uid = "";

const initializeFirebase = () => {
    // Initialize Firebase Authentication and get a reference to the service
};

export const UserContext = createContext({
    isLoggedIn: false,
    login: (email: string, password: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    register: (email: string, password: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    logout: () => { },
    saveUser: () => { },
    updateSaber: () => { },
    updateWolfAndGoat: () => { },
    getData: () => { },
})

onAuthStateChanged(auth, (user) => {
    if (user) { uid = user.uid }
});

export const UserContextProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (email: string, password: string): Promise<boolean> => {

        let ret: boolean = false;

        await signInWithEmailAndPassword(auth, email, password).then(() => { ret = true }).catch((err) => {
            console.log(err)
        })

        if (ret) {
            setIsLoggedIn(true);
            getData()
        }
        return ret;
    }

    const register = async (email: string, password: string): Promise<boolean> => {

        let ret: boolean = false;
        await createUserWithEmailAndPassword(auth, email, password).then(() => { saveUser(), ret = true }).catch((err) => {
            console.log(err)
        })

        if (ret) {
            setIsLoggedIn(false);
        }
        return ret;
    }

    const logout = async () => {
        setIsLoggedIn(false);
        await signOut(auth);
    }
    const saveUser = () => {
        setDoc(doc(db, "Users", uid), {
            userId: uid,
            SaberPuzzle: false,
            WolfAndGoatPuzzle: false,
        })
    }
    const updateSaber = () => {
        updateDoc(doc(db, "Users", uid), {
            SaberPuzzle: true,
        })
    }
    const updateWolfAndGoat = () => {
        updateDoc(doc(db, "Users", uid), {
            WolfAndGoatPuzzle: true,
        })
    }

    const getData = async () => {
        return (await getDoc(doc(db, "Users", uid))).data()
    }

    useEffect(() => {
        initializeFirebase()
    }, [])
    return <>
        <UserContext.Provider value={{
            isLoggedIn,
            login,
            register,
            logout,
            saveUser,
            updateSaber,
            updateWolfAndGoat,
            getData,
        }}>
            {props.children}
        </UserContext.Provider>
    </>
}

export const useUserContext = () => {
    return useContext(UserContext);
}
