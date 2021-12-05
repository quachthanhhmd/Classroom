import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import env from "../configs/env";
import { ICreateAttachment } from "../interfaces/attachment.interface";

// const firebaseConfig = {
//     apiKey: env.FIREBASE.API_KEY,
//     authDomain: env.FIREBASE.DOMAIN,
//     projectId: env.FIREBASE.PROJECT_ID,
//     storageBucket: env.FIREBASE.BUCKET,
//     messagingSenderId: env.FIREBASE.SENDER_ID,
//     appId: env.FIREBASE.APP_ID,
//     measurementId: env.FIREBASE.MEASUREMENT_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyCrBlrKbmy7W2uDM8T8kDKQNgEThLYsmJ4",
    authDomain: "eclassroom-80b31.firebaseapp.com",
    projectId: "eclassroom-80b31",
    storageBucket: "eclassroom-80b31.appspot.com",
    messagingSenderId: "895333168665",
    appId: "1:895333168665:web:bdef051a1a45ed4e949c88",
    measurementId: "G-VFKRR6KS45"
};


// console.log(firebaseConfig);
// console.log(env);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storage = app.storage();
const db = app.firestore();
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
    try {
        const response = await auth.signInWithPopup(googleProvider);

        const user = response.user;

        const querySnapshot = await db
            .collection("users")
            .where("uid", "==", user!.uid)
            .get();
        if (querySnapshot.docs.length === 0) {
            // create a new user
            await db.collection("users").add({
                uid: user!.uid,
                courseList: [],
            });
        }

        return {
            email: user!.email as string,
            firstName: user!.displayName as string,
            avatarUrl: user?.photoURL as string,
            lastName: "",
            type: "google",
            uid: user!.uid,
        }
    } catch (err: any) {
        //alert(err.message);
    }
};


const uploadBulk = async (folderName: string, fileList: File[], callback: (data: ICreateAttachment[]) => void) => {

    const dataList: ICreateAttachment[] = await Promise.all(fileList.map((file) => uploadFile(folderName, file)));
    console.log(dataList.length);
    callback(dataList);
}

const uploadFile = async (folderName: string, file: File) => {
    const uploadTask =  await storage.ref(`${folderName}/${file.name}`).put(file);

    const url = await uploadTask.ref.getDownloadURL()
    const metaData = await uploadTask.ref.getMetadata()
    return {
        url,
        name: metaData.name,
        size: metaData.size,
        type: "other",
        extension: (metaData.contentType === null) ? undefined : metaData.contentType,
    }

}

const logout = () => {
    auth.signOut();
};
// const storage = app.
export { storage, uploadBulk, auth, uploadFile, signInWithGoogle, logout, firebase as default };