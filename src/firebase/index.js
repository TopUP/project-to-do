import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyB-QleBngLDC3tA7u_neLZpmjZtWIss_LE",
    authDomain: "project-to-do-b8e34.firebaseapp.com",
    projectId: "project-to-do-b8e34",
    storageBucket: "project-to-do-b8e34.appspot.com",
    messagingSenderId: "313356224304",
    appId: "1:313356224304:web:358def853658049b35eaf5"
};

const app   = initializeApp(firebaseConfig);
const db    = getFirestore(app);

export { db }
