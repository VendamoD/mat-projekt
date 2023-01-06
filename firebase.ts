import { initializeApp} from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, updateDoc, setDoc} from "firebase/firestore"


const firebaseconfig = {
  apiKey: "AIzaSyAVC-cBzx--sOTu5gJACSH7jNocIdfeZZ8",
  authDomain: "matprace-8d797.firebaseapp.com",
  projectId: "matprace-8d797",
  storageBucket: "matprace-8d797.appspot.com",
  messagingSenderId: "867591445335",
  appId: "1:867591445335:web:ebcf24f977ce1b1df23c12"
}
  
export const app = initializeApp(firebaseconfig);

// export function handler(req, res) {

//     const userRef = doc(db, "User", "DP1qY7leNLUmkpQAtVUR");
//     updateDoc(userRef, {
//         GameStatus: true
//     }); 

//     res.json({response: "ok"})
// }