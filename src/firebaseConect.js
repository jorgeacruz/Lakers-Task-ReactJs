import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCwfL5QuB8vznPsSid6jPWSURGUAkg781k",
    authDomain: "financial-4b4e4.firebaseapp.com",
    databaseURL: "https://financial-4b4e4-default-rtdb.firebaseio.com",
    projectId: "financial-4b4e4",
    storageBucket: "financial-4b4e4.appspot.com",
    messagingSenderId: "242733589848",
    appId: "1:242733589848:web:93183b389317efb875312d"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export { db, auth };