import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDDkfklaEhxae7pP7Fey8WMUns0R0VQxXE",
  authDomain: "pager-67211.firebaseapp.com",
  databaseURL: "https://pager-67211.firebaseio.com",
  projectId: "pager-67211",
  storageBucket: "pager-67211.appspot.com",
  messagingSenderId: "90309596547"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth