// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyABaPz6Oksl_VlZla3C-jPEyiUeT_lss9A',
    authDomain: 'educationf8.firebaseapp.com',
    projectId: 'educationf8',
    storageBucket: 'educationf8.appspot.com',
    messagingSenderId: '467848433767',
    appId: '1:467848433767:web:88b837fe59686290b9c4c2',
    measurementId: 'G-J2VY69YM7W',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
