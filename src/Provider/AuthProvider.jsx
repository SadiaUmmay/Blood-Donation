import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true)
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [userStatus, setUserStatus] = useState('')


  const registerwithemailandpassword = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handlegooglesignin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const handlesignout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => setUser(null))
      .finally(() => setLoading(false));
  };
  console.log(user)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

    });

    return () =>
      unsubscribe()

  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`)
      .then(res => {
        setRole(res.data.role)
        setUserStatus(res.data.status)
        setRoleLoading(false)
      })
  }, [user]);



  console.log(role)
  const authData = {
    registerwithemailandpassword,
    handlegooglesignin,
    handlesignout,
    setUser,
    user,
    role,
    loading,
    roleLoading,
    userStatus
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
