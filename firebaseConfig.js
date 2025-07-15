    // src/firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "AIzaSyAV7xWURN45N7Ztg-jdIRu78bMj57cTLws",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "stonecutter-3423e",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);