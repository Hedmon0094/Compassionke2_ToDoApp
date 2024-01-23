import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIAwvw1tLIuEVudTdBycNPZoJ8CT7tO0s",
  authDomain: "compassion-todo-app-7197d.firebaseapp.com",
  databaseURL: "https://compassion-todo-app-7197d-default-rtdb.firebaseio.com",
  projectId: "compassion-todo-app-7197d",
  storageBucket: "compassion-todo-app-7197d.appspot.com",
  messagingSenderId: "610981354257",
  appId: "1:610981354257:web:7568e6944d96cc7ab8cab0",
  measurementId: "G-HY33Z6L6QJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Login inputs
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");

// Register Inputs

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignupPasswordIn = document.getElementById(
  "confirm-password-signup"
);
const createAcctBtn = document.getElementById("create-acct-btn");

// Login / Register navigation Variables/ Controls
const signupButton = document.getElementById("sign-up");
const returnBtn = document.getElementById("return-btn");
const createacctSection = document.getElementById("create-acct");
const main = document.getElementById("main");

let email,
  password,
  signupEmail,
  signupPassword,
  confirmSignupEmail,
  confirmSignUpPassword;

createAcctBtn.addEventListener("click", () => {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail != confirmSignupEmail) {
    window.alert("Emails do not match");
    isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignupPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Passwords do not match");
    isVerified = false;
  }

  if (
    signupEmail == null ||
    confirmSignupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all the inputs");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredentials) => {
        window.alert("Success! Account Created");
        window.location = "../pages/createTask.html";
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.alert("Success! Welcome back");
      window.location = "../pages/createTask.html";
    })
    .catch((error) => {
      window.alert("An Error occured, Please try again");
    });
});

// Login / Register navigation functionality / Controls
signupButton.addEventListener("click", () => {
  main.style.display = "none";
  createacctSection.style.display = "block";
});

returnBtn.addEventListener("click", () => {
  main.style.display = "block";
  createacctSection.style.display = "none";
});
