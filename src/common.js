import { Alert, Platform } from "react-native";

const server = Platform.OS === "ios" ? "http://localhost:3000" : "http://192.168.0.102:3000";

function showError(err) {
  Alert.alert("ops", `Ocorreu um erro... ${err}`);
}

export { server, showError };
