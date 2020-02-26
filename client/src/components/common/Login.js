import React, {Component} from "react";
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
    apiKey: "AIzaSyDYo5i3ypxRK2XYwRRfoVo6rSjka5-9I9c",
    authDomain: "developi.firebaseapp.com"
})

export default class Login extends Component {
    state = { isSignedIn: false }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => console.log(firebase.auth().currentUser)
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
        });
    }

    render() {
        return (
            <div>
                {this.state.isSignedIn ? (
                    <span>
                        <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
                        Welcome {firebase.auth().currentUser.displayName}
                        <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                    </span>) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    )}
            </div>)
    }
}