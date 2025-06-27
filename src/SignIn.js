import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase"; // make sure app is exported
import { useNavigate } from "react-router-dom"; // ✅ Add this

const SignIn = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate(); // ✅ for navigation

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user.displayName);
        navigate("/"); // ✅ Redirect to main todo list
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };
  return (
    <div style={styles.container}>
      <h2>Welcome to Todo App</h2>
      <button onClick={handleSignIn} style={styles.button}>Sign In with Google</button>
    </div>
  );
};
const styles = {
  container: {
    textAlign: "center",
    marginTop: "20vh",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
export default SignIn;


