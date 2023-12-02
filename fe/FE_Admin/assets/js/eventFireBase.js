import {
    ref,
    uploadBytes,
    getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';
import storage from './config_Firebase.js';

var getfile = function (data) {
    const reader = new FileReader();
    reader.onload = () => {
        return console.log(reader.result);
    };
    reader.onerror = () => {
        return console.log(reader.result);
    };
    reader.readAsDataURL(data);
};

var getpathfile = async function (data) {
    const storageRef = await ref(storage, 'img/' + data);
    const path = await getDownloadURL(storageRef);
    return path;
};

var UploadFile = async function (data, file) {
    const storageRef = await ref(storage, 'img/' + data);
    const uploadTask = await uploadBytes(storageRef, file);
};

export default { UploadFile, getfile, getpathfile };
