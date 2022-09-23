import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const inputPasswordRef = useRef("");
  const authCtx = useContext(AuthContext);
  const [isLoader, setIsLoader] = useState(false);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = inputPasswordRef.current.value;
    setIsLoader(true)
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlFTs44FMavcOEn87pLCRzq-7wWaU8FGE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res=> {
      setIsLoader(false)
      if(res.ok)
      {
        return res.json()
      }
      else
      {
        res.json().then((data) => {
          throw new Error(data.error.message);
        });
      }
    }).then(data => {
      console.log(data)
      history.replace('/')
    })
    .catch(err => {
      alert(err)
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputPasswordRef} />
      </div>
      <div className={classes.action}>
       {!isLoader && <button>Change Password</button>} 
       {isLoader && <p>Sending request....</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
