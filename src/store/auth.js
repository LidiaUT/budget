// sozdannij nami modul dlja Vuex
// soderzit logiku, kotoraja otnositsja k avtorizacii, logout

/* eslint no-useless-catch: 1 */

import firebase from 'firebase/app'
export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        console.log('auth.js faili login error' + e)
        throw e
      }
    },
    async register ({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({ /* dannij po zaregistrirovannomu polzovatelju budet hranit v Firebase DB,
          v tablice info (v FB predvaritelno ni4ego ne nado sozdavat krome spravo Build - Realtime DB - 1. option, tolko zareglennije mogut
          popast (v Rules propisat ".read": "auth != null" i ".write": "auth != null"; proignorit preduprezdenije)) */
          bill: 10000, // startovij s4et dlja sozdannogo polzovatelja
          name: name // imja sozdannogo polzovatelja
        })
      } catch (e) {
        console.log(e)
        throw e
        // alert('auth error tutu' + e.message)
      }
    },
    getUid () {
      const user = firebase.auth().currentUser // 4tobi polu4it id kazdogo usera
      return user ? user.uid : null // esli u nas est user, to vozvrasajem ego uid, esli takogo usera net, to null
    },
    async logout () {
      await firebase.auth().signOut() // vijti so stranici
    }
  }
}
