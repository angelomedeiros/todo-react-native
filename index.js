import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import Agenda from "./src/Screens/Agenda";

AppRegistry.registerComponent(appName, () => Agenda);
