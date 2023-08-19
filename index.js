import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";  
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBWK-L5_9S2I-ODntPeouMVFbi__tDSV6g",
    authDomain: "raininkarachi-7c129.firebaseapp.com",
    projectId: "raininkarachi-7c129",
    storageBucket: "raininkarachi-7c129.appspot.com",
    messagingSenderId: "403921534961",
    appId: "1:403921534961:web:4c8b4578c2daf230660e50",
    measurementId: "G-WBKY7R43B4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase(app);
  console.log(db);
  console.log(auth);
  document.getElementById('reg_btn').addEventListener('click', function(){
    document.getElementById('container_of_register').style.display="inline";
    document.getElementById('login_container').style.display="none";
//    alert("welcome");
  });
//   alert("welcome home");

document.getElementById('log_btn').addEventListener('click', function(){
    document.getElementById('container_of_register').style.display="none";
    document.getElementById('login_container').style.display="inline";
  });

  document.getElementById('register_btn').addEventListener('click',function(){
    const registerFirstname = document.getElementById('register_firstname').value;
    const registerLastname = document.getElementById('register_lastname').value;
    const registerEmail = document.getElementById('register-email').value;
    const registerPassword = document.getElementById('register-password').value;
    const registerRepeatPassword = document.getElementById('register-password1').value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const obj = {
        FirstName : registerFirstname,
        LastName :  registerLastname,
        Email: registerEmail,
        Password:  registerPassword,
        Rpassword: registerRepeatPassword
    }
    const userRef = ref(db, `users/${user.uid}`)
   set(userRef,obj);
   window.location.replace('Dashboard.html');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error--.",errorCode)
    // ..
  });

});

document.getElementById('login-btn').addEventListener('click', function(){
    const loginEmail= document.getElementById("login_email").value;
    const loginPassword= document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.replace('Dashboard.html');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // document.getElementById('login_container').style.display="none";
    // alert(errorMessage);
  });

});
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      document.getElementById('container_of_Dashbord').style.display="inline";
      document.getElementById('login_container').style.display="none";
      document.getElementById('container_of_register').style.display="none";
      
    } else {
        document.getElementById('login_container').style.display="inline";
        document.getElementById('container_of_register').style.display="none";
    }
  });