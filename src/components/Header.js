import React, { useEffect, useState } from "react";
import appStore from "../utils/appStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { HAMBURGER_ICON, LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLangauge } from "../utils/configSlice";

const Header = () => {
  const [showDropdown,setShowDropdown]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleToggle = () => {
    dispatch(toggleGptSearchView());
    setShowDropdown(false)
  };

  const handleOptionChange = (e) => {
    dispatch(changeLangauge(e.target.value));
    setShowDropdown(false)
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
    <div className="w-full flex px-4 items-center justify-between absolute top-0 z-20 bg-gradient-to-b from-black navbar">
      <div className="flex items-center justify-center logo-hamburger ">
        <img className="h-16 sm:h-24 lg:ml-24" src={LOGO} alt="Logo" />
        <div className="hamburger" onClick={()=>setShowDropdown(!showDropdown)}>{HAMBURGER_ICON}</div>
      </div>
      {user && (
        <div className={`flex  items-center gap-4 md:mr-24 nav-items ${showDropdown?"active":""}`}>
          {showGptSearch && (
            <select
              onChange={handleOptionChange}
              className="flex p-2 bg-gray-700 rounded-lg outline-none text-white"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white bg-purple-600 p-2 px-4 rounded-md"
            onClick={handleToggle}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <div className="flex gap-2 items-center justify-center"> 
            <img
              alt="Profile Icon"
              className="w-12 h-12 rounded-md"
              src={user.photoURL}
            />
            <p className="font-semibold text-white">{user.displayName}</p>
          </div>
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
