import { createSwitchNavigator } from "react-navigation";
import Agenda from "./Screens/Agenda";
import Auth from "./Screens/Auth";

const MainRoutes = {
  Auth: {
    name: "Auth",
    screen: Auth
  },
  Home: {
    name: "Home",
    screen: Agenda
  }
};

const MainNavigator = createSwitchNavigator(MainRoutes, { initialRouteName: "Auth" });
export default MainNavigator;
