import React from "react";
import { ScrollView, View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import { Gravatar } from "react-native-gravatar";
import { DrawerItems } from "react-navigation";
import commonStyle from "../commonStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default props => {
  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    AsyncStorage.removeItem("userData");
    props.navigation.navigate("Loading");
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Gravatar
          style={styles.avatar}
          options={{ email: props.navigation.getParam("email"), secure: true }}
        />
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.name}>{props.navigation.getParam("name")}</Text>
            <Text style={styles.email}>{props.navigation.getParam("email")}</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <View style={styles.logoutIcon}>
              <Icon name="sign-out" size={30} color="#800" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  title: {
    backgroundColor: "white",
    color: "black",
    fontFamily: commonStyle.fontFamily,
    fontSize: 30,
    paddingTop: 20,
    padding: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "#aaa",
    borderRadius: 30,
    margin: 10
  },
  name: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.mainText,
    fontSize: 20,
    marginLeft: 10
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  email: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.subText,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10
  },
  menu: {
    justifyContent: "center",
    alignItems: "stretch"
  },
  logoutIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  }
});
