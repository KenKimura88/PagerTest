import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return (dispatch) => new Promise(async (resolve, reject) => {
    firebaseAuth().createUserWithEmailAndPassword(email, pw).then(async (res) => {
      resolve(dispatch({
        type: 'register',
        data: res
      }))
    }).catch(reject)
  }).catch(async (err) => {
    throw err
  })
}

export function logout () {
  return (dispatch) => {
    firebaseAuth().signOut().then(async () => {
      dispatch({
        type: 'logout',
      })
    })
  }
}

export function login (email, pw) {
  return (dispatch) => new Promise(async (resolve, reject) => {
    firebaseAuth().signInWithEmailAndPassword(email, pw).then(async (res) => {
      resolve(dispatch({
        type: 'login',
        data: res
      }))
    }).catch(reject)
  }).catch(async (err) => {
    throw err
  })
}

export function resetPassword (email) {
  return (dispatch) => new Promise(async (resolve, reject) => {
    firebaseAuth().sendPasswordResetEmail(email).then(async () => {
      resolve(dispatch({
        type: 'reset_password',
      }))
    }).catch(reject)
  }).catch(async (err) => {
    throw err
  })
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
