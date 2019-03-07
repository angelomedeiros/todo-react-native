import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { createAppContainer } from "react-navigation";
import Navigator from "./src/Navigator";

AppRegistry.registerComponent(appName, () => createAppContainer(Navigator));
