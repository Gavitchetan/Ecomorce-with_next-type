// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgNYzen4qLFG7Mtp7FRIr5B9jqckY6fuk",
    authDomain: "eshop-71cdf.firebaseapp.com",
    projectId: "eshop-71cdf",
    storageBucket: "eshop-71cdf.appspot.com",
    messagingSenderId: "854278063676",
    appId: "1:854278063676:web:0dfd70f9ea0c0732696539"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export default storage