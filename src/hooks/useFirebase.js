import { useEffect, useState } from "react"
import initializeAuthentication from '../Firebase/firebase.init';
import {
    getAuth, signInWithPopup, GoogleAuthProvider,
    onAuthStateChanged, signOut, GithubAuthProvider
} from "firebase/auth";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvide = new GithubAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(resutl => {
                console.log(resutl.user);
                setUser(resutl.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }
    const signInUsingGithub = () => {
        signInWithPopup(auth, githubProvide)
            .then(result => {
                setUser(result.user)
            })
    }
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log('insite state change', user);
                setUser(user);
            }
        })
    }, [])
    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logout
    }
}

export default useFirebase;