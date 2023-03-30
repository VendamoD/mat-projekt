import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword, signOut,
    updateEmail,
    updatePassword,
    User as FirebaseUser
} from "firebase/auth";
import { app } from "../firebase"
import { getFirestore, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore(app);
let uid = "";

const initializeFirebase = () => {
    // Initialize Firebase Authentication and get a reference to the service
};

export const UserContext = createContext({
    isLoggedIn: false,
    login: (email: string, password: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    register: (email: string, password: string, username: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    logout: () => { },
    saveUser: (username: string) => { },
    updateSaber: () => { },
    updateWolfAndGoat: () => { },
    updatePentomino: () => { },
    updateEternity: () => { },
    addUsername: (username: string) => { },
    changeEmail: (email: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    changePassword: (password: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    resetPassword: (email: string): Promise<boolean> => { return Promise.resolve(Date.now()).then(() => { return false }) },
    getUser: () => { },
    getData: () => { },
})
let userData: any
//při změně stavu auth si uložíme do proměnné data přihlášeného uživatele.
onAuthStateChanged(auth, (user) => {
    if (user) { uid = user.uid }
    userData = auth.currentUser
});

export const UserContextProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //funkce login přihlásí uživatele pomocí funkce od firebase signInWithEmailAndPassword
    const login = async (email: string, password: string): Promise<boolean> => {

        let ret: boolean = false;

        await signInWithEmailAndPassword(auth, email, password).then(() => { ret = true }).catch((err) => {
            console.log(err)
        })

        if (ret) {
            setIsLoggedIn(true);
            getData()
            getUser()
        }
        return ret;
    }
    //funkce register registruje uživatele pomocí funkce od firebase createUserWithEmailAndPassword
    const register = async (email: string, password: string, username: string): Promise<boolean> => {
        let ret: boolean = false;
        await createUserWithEmailAndPassword(auth, email, password).then(() => { saveUser(username), ret = true }).catch((err) => {
        })
        if (ret) {
            setIsLoggedIn(false);
        }
        return ret;
    }
    //odhlášení uživatele
    const logout = async () => {
        setIsLoggedIn(false);
        await signOut(auth);
    }
    //uložíme uživatele do tabulky Users, abychom mu mohli přidávat a upravovat data
    const saveUser = (username: string) => {
        setDoc(doc(db, "Users", uid), {
            userId: uid,
            Username: username,
            Puzzles: {
                SaberPuzzle: false,
                WolfAndGoatPuzzle: false,
                PentominoPuzzle: false,
                EternityPuzzle: false,
            }
        })
    }
    //aktualizujeme stav hlavolamu na "vyřešený"
    const updateSaber = () => {
        updateDoc(doc(db, "Users", uid), {
            "Puzzles.SaberPuzzle": true,
        })
    }
    //aktualizujeme stav hlavolamu na "vyřešený"
    const updateWolfAndGoat = () => {
        updateDoc(doc(db, "Users", uid), {
            "Puzzles.WolfAndGoatPuzzle": true,
        })
    }
    //aktualizujeme stav hlavolamu na "vyřešený"
    const updatePentomino = () => {
        updateDoc(doc(db, "Users", uid), {
            "Puzzles.PentominoPuzzle": true,
        })
    }
    //aktualizujeme stav hlavolamu na "vyřešený"
    const updateEternity = () => {
        updateDoc(doc(db, "Users", uid), {
            "Puzzles.EternityPuzzle": true,
        })
    }
    //přidáme uživateli, uživatelské jméno do jeho tabulky
    const addUsername = async (username: string) => {
        updateDoc(doc(db, "Users", uid), {
            "Username": username
        })
    }
    //změníme uživateli email
    const changeEmail = async (email: string): Promise<boolean> => {
        let ret: boolean = false;
        if (userData) {
            await updateEmail(userData, email).then(() => {
                ret = true
                if (email == "") ret = false
            }).catch((err) => {
                ret = false
            })
        }
        return ret;
    }
    //změníme uživateli heslo
    const changePassword = async (password: string): Promise<boolean> => {
        let ret: boolean = false;
        if (userData) {
            await updatePassword(userData, password).then(() => {
                ret = true
            }).catch((err) => {
                ret = false
            })
        }
        return ret;
    }
    //resetujeme uživateli heslo
    const resetPassword = async (email: string) : Promise<boolean> => {
        let ret: boolean = false;
        if(userData) {
            await sendPasswordResetEmail(auth, email).then(() => {
                ret = true
            }).catch((err) => {
                ret = false
            })
        }
        return ret
    }
    const getUser = () => {
        if (userData) {
            return userData
        }
    }
    //získáme uživatelova data z databáze
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
            updatePentomino,
            updateEternity,
            addUsername,
            changeEmail,
            changePassword,
            resetPassword,
            getUser,
            getData,
        }}>
            {props.children}
        </UserContext.Provider>
    </>
}

export const useUserContext = () => {
    return useContext(UserContext);
}
