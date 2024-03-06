import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBwBjx_NvsyMsDi7yYkN1OpXiwQe5h2qqs",
    authDomain: "binimoy-3d0c3.firebaseapp.com",
    projectId: "binimoy-3d0c3",
    storageBucket: "binimoy-3d0c3.appspot.com",
    messagingSenderId: "493087432973",
    appId: "1:493087432973:web:c6c56c8679a2d6c9015044",
    measurementId: "G-GHJ0BGGK60",
    databaseURL: "https://console.firebase.google.com/u/0/project/binimoy-3d0c3/database/binimoy-3d0c3-default-rtdb/data/~2F"
  };
  

   export const firebaseApp = initializeApp(firebaseConfig);
   export const storage = getStorage(firebaseApp);