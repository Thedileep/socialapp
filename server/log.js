var firebase = require('firebase');
var firebaseui = require('firebaseui');



var firebaseConfig = {
    apiKey: "AIzaSyDyfyOcGk_GRBYUrsAk0knsEk-JgSvbcxI",
    authDomain: "chatapp-161b5.firebaseapp.com",
    databaseURL: "https://chatapp-161b5-default-rtdb.firebaseio.com",
    projectId: "chatapp-161b5",
    storageBucket: "chatapp-161b5.appspot.com",
    messagingSenderId: "766266662669",
    appId: "1:766266662669:web:879c2f0912f64c7ab9da44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create FirebaseUI instance
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Configure FirebaseUI
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether to continue the redirect automatically.
            return true;
        },
        uiShown: function() {
            // The widget is rendered. Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup', // Use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInSuccessUrl: '<url-to-redirect-to-on-success>', // Replace with your desired URL.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
};

// Start FirebaseUI with the configured options
ui.start('#firebaseui-auth-container', uiConfig);