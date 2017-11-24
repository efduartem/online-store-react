import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAFbFI6a_ni6nolqPOtAPSdSrXOnRXhzRs",
  authDomain: "online-store-nextu.firebaseapp.com",
  databaseURL: "https://online-store-nextu.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
