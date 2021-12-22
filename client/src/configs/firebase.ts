import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
    getDownloadURL, ref, getStorage,
    uploadBytesResumable, getMetadata
} from 'firebase/storage';
import { ICreateAttachment } from "../interfaces/attachment.interface";


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

const storage = getStorage(app);
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

    const dataList: ICreateAttachment[] = await Promise.all(fileList.map((file) => uploadFileAttachment(folderName, file)));
    console.log(dataList.length);
    callback(dataList);
}

const uploadFileAttachment = async (folder: string, file: File) => {
    const fileName = folder ? `${folder}/${file.name}` : `${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const url = await getDownloadURL(uploadTask.snapshot.ref);
    const metaData = await getMetadata(uploadTask.snapshot.ref);
    return {
        url,
        name: metaData.name,
        size: metaData.size,
        type: "other",
        extension: (metaData.contentType === null) ? undefined : metaData.contentType,
    }

}

const uploadFile = (folder: string, file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileName = folder ? `${folder}/${file.name}` : `${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                // Handle unsuccessful uploads
                reject('Error uploading file');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{

                    resolve(downloadURL)
                }
                );
            }
        );
    });
};

const downloadFile = (fileName: string, folderName?: string) => {
    const name = folderName ? `${folderName}/${fileName}` : fileName;
    const starsRef = ref(storage, name);

    getDownloadURL(starsRef)
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = new Blob([xhr.response]);
                let href = URL.createObjectURL(blob);
                let a = document.createElement('a') as HTMLAnchorElement;
                a.href = href;
                a.setAttribute('download', fileName);
                a.click();
                URL.revokeObjectURL(href);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        })
        .catch((error) => {
            console.log('download error code', error.code);
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
};


const logout = () => {
    auth.signOut();
};
// const storage = app.
export { storage, uploadBulk, auth, uploadFile, signInWithGoogle, downloadFile, logout};
