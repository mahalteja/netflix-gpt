import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { SIGNIN_BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constant";
const Login = () => {
  const [isSigin, setIsSignin] = useState(true);
  const [errMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const user=useSelector(store=>store.user)

  const handleValidate = () => {
    const message = validateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (errMessage) return;
    if (!isSigin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              //After Profile updated
              console.log(auth.currentUser)
              const {uid, email, displayName,photoURL}=auth.currentUser;
              dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL }))
              
            })
            .catch((error) => {
              // An error occurred
              
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //Sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode,errMessage )
        });
    }
  };

  const handleSignin = () => {
    setIsSignin(!isSigin);
  };


  return (
    <div
      className=" min-h-screen relative pb-8 bg-cover bg-center "
      style={{
        backgroundImage:
          `url(${SIGNIN_BACKGROUND_IMAGE})`,
      }}
    >
      <div className="absolute inset-0 z-0 bg-[#00000099]"></div>
      <div className="z-10 relative flex flex-col w-full items-center justify-center gap-6">
        <Header />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="my-32 flex flex-col w-[450px] gap-6 bg-[#000000b7] px-20 py-10 rounded-lg"
        >
          <p className="text-white text-3xl font-semibold">
            {isSigin ? "Sign In" : "Sign Up"}
          </p>
          <input
            ref={email}
            type="email"
            className="bg-[#201d1d] p-4 border text-white border-gray-400"
            placeholder="Enter Email"
          />
          {!isSigin && (
            <input
            ref={name}
              type="text"
              className="bg-[#201d1d] p-4 border text-white border-gray-400"
              placeholder="Enter Name"
            />
          )}
          <input
            ref={password}
            type="password"
            className="bg-[#201d1d] p-4 border text-white border-gray-400"
            placeholder="Enter Password"
          />
          <p className="text-red-500 text-lg font-semibold">{errMessage}</p>
          <button
            type="submit"
            className="bg-red-600 p-4 text-white font-medium rounded-lg"
            onClick={handleValidate}
          >
            {isSigin ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-white cursor-pointer" onClick={handleSignin}>
            {isSigin ? "New to Netflix? Sign Up" : "Already a user? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
