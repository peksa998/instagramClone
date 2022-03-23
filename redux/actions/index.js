import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
  CLEAR_DATA,
  USERS_DATA_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USER_CHATS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot);
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("does not exist");
        }
      });
  };
}
