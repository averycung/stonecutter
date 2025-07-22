    // src/firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "AIzaSyAV7xWURN45N7Ztg-jdIRu78bMj57cTLws",
        authDomain: "stonecutter-3423e.firebaseapp.com",
        projectId: "stonecutter-3423e",
        storageBucket: "stonecutter-3423e.firebasestorage.app",
        messagingSenderId: "937926214866",
        appId: "1:937926214866:web:6f13437c1867c240fd990b",
        measurementId: "G-HT2TBLKQRW"
    };

    const app = initializeApp(firebaseConfig);
    const auth =getAuth(app);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    export { app, auth, analytics, db };