import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
} from "../../redux/actions/index";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

require("firebase/firestore");

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];

    //fetchUsersFollowingPosts(props.currentUser.uid);
    console.log(props.currentUser);
    console.log({ posts });
    console.log("OVDE");
    console.log(props.following.length);
    console.log(props.usersLoaded);

    // ovde je greska
    // ne prikazuje feed
    // ne ucitava broj ucitanih i broj koji prati
    // treba pratiti ove props
    // stao na 4:25
    if (props.usersLoaded == props.following.length) {
      console.log("2");
      for (let i = 0; i < props.following.length; i++) {
        const user = props.users.find((el) => el.uid === props.following[i]);
        console.log("1");
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      console.log({ posts });
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });

      setPosts(posts);
    }
  }, [props.usersLoaded]);

  return (
    <View style={styles.container}>
      <Text>{props.following.length}</Text>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image style={styles.Image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },

  containerInfo: {
    margin: 20,
  },

  containerGallery: {
    flex: 1,
  },

  containerImage: {
    flex: 1 / 3,
  },

  Image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.userState.users,
  usersLoaded: store.userState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);
