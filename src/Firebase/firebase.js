import {initializeApp} from 'firebase/app'
import firebaseConfig from './config'
import { getAuth} from "firebase/auth";
import {getStorage} from 'firebase/storage'
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const db = getStorage(app)
export {auth,db}
