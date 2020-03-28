import app from 'firebase/app';
const config = {
    apiKey: "AIzaSyASDQTCpnO2RrPbEE_RRYVzAkKhk9UFrww",
    authDomain: "tetrisreact-484ac.firebaseapp.com",
    databaseURL: "https://tetrisreact-484ac.firebaseio.com",
    projectId: "tetrisreact-484ac",
    storageBucket: "tetrisreact-484ac.appspot.com",
    messagingSenderId: "910098109563"
};
class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}
export default Firebase;