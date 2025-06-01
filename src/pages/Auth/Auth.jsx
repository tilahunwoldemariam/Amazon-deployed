import styles from "./Auth.module.css";
import logo from "../../assets/amazon_logo_white.png";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { DataContext } from "../../components/Context/Context";
import { Type } from "../../Utility/action.type";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Controlled Elements
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [_, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  const {message, redirect} = navStateData?.state || {};
  function toggleAuthMode() {
    setIsLogin(!isLogin);
  }

  async function authHandler(e) {
    e.preventDefault();

    if (e.target.name === "signin") {
      setIsLoading(true);
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
       setIsLoading(false);
       navigate(redirect || "/");
        
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err.code.split("/")[1].split("-").join(" "));
      }
    } else {
      setIsLoading(true);
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        dispatch({
          type: Type.SET_USER,
          user: { ...userInfo.user, displayName: name },
        });
        setIsLoading(false);
        navigate("/");
        
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err.code.split("/")[1].split("-").join(" "));
      }
    }
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Amazon Logo" />
      </Link>

      <div className={`${styles.authBox} ${message ? styles.center : ""}`}>
        <h1>{isLogin ? "Sign in" : "Create account"}</h1>

        {message && <small className={styles.msg}>{message} </small>}

        <form className={message ? styles.formMsg : ""}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={styles.showPasswordBtn}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline size={25} />
                ) : (
                  <IoEyeOffOutline size={25} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            name={isLogin ? "signin" : "signup"}
            onClick={authHandler}
          >
            {isLoading ? (
              <ClipLoader color="#222" size={15} />
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create your Amazon account"
            )}
          </button>
        </form>

        <div className={styles.terms}>
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{" "}
          and <a href="#">Privacy Notice</a>.
        </div>

        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>

        <button className={styles.toggleAuthBtn} onClick={toggleAuthMode}>
          {isLogin ? "Create Your Amazon account" : "Sign in to your account"}
        </button>
      </div>
    </div>
  );
}

export default Auth;










// import React from "react";
// import styles from "./Auth.module.css";
// import logo from "../../assets/amazon_logo_dark.png";
// import { PiEyeSlash } from "react-icons/pi";

// function Auth() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.logo}>
//         <img
//           src={logo}
//           alt="Amazon Logo"
//         />
//       </div>

//       <div className={styles.authBox}>
//         <h1>Sign In</h1>

//         <form>
//           <div className={styles.f}>
//             <label htmlFor="email">Email or mobile phone number</label>
//             <div className={styles.inputPassword}>
//               <input type="email" id="email" required />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="password">Password</label>
//             <div className={styles.inputWrapper}>
//               <input type="password" id="password" required />
//               <button className={styles.showPasswordButton} type="button">
//                 <PiEyeSlash size={25} />
//               </button>
//             </div>
//           </div>

//           <button type="submit" className={styles.submitButton}>
//             Sign In
//           </button>

//           <div className={styles.terms}>
//             By continuing, you agree to Amazon's{" "}
//             <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>
//             .
//           </div>

//           <div className={styles.divider}>
//             <span>New to Amazon?</span>
//           </div>

//           <button className={styles.toggleAuthButton}>
//             Create your Amazon account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Auth;
