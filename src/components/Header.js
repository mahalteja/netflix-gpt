import React, { useEffect } from "react";
import appStore from "../utils/appStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="w-full flex items-center justify-between absolute top-0 z-20 bg-gradient-to-b from-black">
      <img
        className="h-24 ml-24"
        src={LOGO}
        alt="Logo"
      />
      {user && (
        <div className="flex items-center gap-4 mr-24">
          <img
            alt="Profile Icon"
            className="w-12 h-12 rounded-md"
            src={user.photoURL}
          />
          <p className="font-semibold text-white">{user.displayName}</p>
          <button
            onClick={handleSignout}
            className="bg-red-600 p-4 rounded-lg text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
