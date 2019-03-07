import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert } from "react-native";

import commonStyles from "../commonStyle";
import backgroundImage from "../../assets/imgs/login.jpg";
import AuthInput from "../Components/AuthInput";

export default class Auth extends Component {
  state = {
    stateNew: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  signinOrSignout = () => {
    if (this.state.stateNew) {
      Alert("Sucesso", "Criar conta");
    } else {
      Alert("Sucesso", "Logar");
    }
  };

  render() {
    const { stateNew, name, confirmPassword, password, email } = this.state;
    const { signinOrSignout } = this;
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{stateNew ? "Criar conta" : "Informe seus dados"}</Text>
          {stateNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              style={styles.input}
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={email => this.setState({ email })}
          />
          <AuthInput
            icon="lock"
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          {stateNew && (
            <AuthInput
              icon="asterisk"
              secureTextEntry={true}
              placeholder="Confirm password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
            />
          )}
          <TouchableOpacity onPress={signinOrSignout}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{stateNew ? "Registrar" : "Entrar"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => this.setState({ stateNew: !stateNew })}
        >
          <Text style={styles.buttonText}>{stateNew ? "SignIn" : "Register"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: "white",
    fontSize: 70,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: "white",
    fontSize: 20
  },
  formContainer: {
    backgroundColor: "rgba(0,0,0,.8)",
    padding: 20,
    width: "90%"
  },
  input: {
    marginTop: 10,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center"
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: "#fff",
    fontSize: 20
  }
});
