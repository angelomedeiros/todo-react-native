import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import axios from "axios";

import commonStyles from "../commonStyle";
import AuthInput from "../Components/AuthInput";
import { server, showError } from "../common";
import backgroundImage from "../../assets/imgs/login.jpg";

export default class Auth extends Component {
  state = {
    stateNew: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  signup = async () => {
    const { name, email, password, confirmPassword } = this.state;
    try {
      await axios.post(`${server}/signup`, {
        name,
        email,
        password,
        confirmPassword
      });

      Alert.alert("Sucesso", "Usuário cadastrado");
      this.setState({ stateNew: false });
    } catch (err) {
      showError(err);
    }
  };

  signin = async () => {
    const { email, password } = this.state;
    try {
      const res = await axios.post(`${server}/signin`, {
        email,
        password
      });
      axios.defaults.headers.common["Authorization"] = `bearer ${res.data.token}`;
      AsyncStorage.setItem("userData", JSON.stringify(res.data));
      this.props.navigation.navigate("Home", res.data);
    } catch (err) {
      showError(err);
    }
  };

  signinOrSignout = () => {
    if (this.state.stateNew) {
      this.signup();
    } else {
      this.signin();
    }
  };

  render() {
    const { stateNew, name, confirmPassword, password, email } = this.state;
    const { signinOrSignout } = this;

    const validations = [];

    validations.push(email && email.includes("@"));
    validations.push(password && password.length >= 6);

    if (stateNew) {
      validations.push(name && name.trim());
      validations.push(confirmPassword);
      validations.push(confirmPassword === password);
    }

    const validForm = validations.reduce((acumulador, item) => acumulador && item);

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
          <TouchableOpacity onPress={signinOrSignout} disabled={!validForm}>
            <View style={[styles.button, !validForm && { backgroundColor: "#aaa" }]}>
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
