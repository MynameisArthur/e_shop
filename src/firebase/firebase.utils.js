import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAIUY-LjgXN-abAD1mLLOjdh2to1s867pA',
    authDomain: 'e-shop-f3cdd.firebaseapp.com',
    databaseURL: 'https://e-shop-f3cdd.firebaseio.com',
    projectId: 'e-shop-f3cdd',
    storageBucket: 'e-shop-f3cdd.appspot.com',
    messagingSenderId: '20694964016',
    appId: '1:20694964016:web:f8f95915cf919368721af5',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (err) {
            console.log('error creating user');
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
