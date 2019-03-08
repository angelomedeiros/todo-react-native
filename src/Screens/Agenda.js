import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import axios from "axios";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

import "moment/locale/pt-br";

import { server, showError } from "../common";
import AddTask from "./AddTask";
import Task from "../Components/Task";
import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";
import commonStyle from "../commonStyle";

export default class Agenda extends Component {
  state = {
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false
  };

  async componentDidMount() {
    this.getTasks();
  }

  getTasks = async () => {
    try {
      const maxDate = moment()
        .add({ days: this.props.daysAhead })
        .format("YYYY-MM-DD 23:59");
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      this.setState({ tasks: res.data }, this.filterTasks);
    } catch (err) {
      showError(err);
    }
  };

  addTask = async task => {
    try {
      await axios.post(`${server}/tasks`, {
        desc: task.desc,
        estimateAt: task.date
      });
      this.setState({ showAddTask: false }, this.getTasks);
    } catch (err) {
      showError(err);
    }
  };

  toggleTask = async id => {
    try {
      await axios.put(`${server}/tasks/${id}/toggle`);
      await this.getTasks();
    } catch (err) {
      showError(err);
    }
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pendingTask = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pendingTask);
    }
    this.setState({ visibleTasks });
  };

  toogleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  };

  deleteTask = async id => {
    try {
      await axios.delete(`${server}/tasks/${id}`);
      await this.getTasks();
    } catch (err) {
      showError(err);
    }
  };

  render() {
    let styleColor = null;
    let image = null;

    const { daysAhead, title } = this.props;

    switch (daysAhead) {
      case 1:
        (styleColor = commonStyle.colors.today), (image = todayImage);
        break;
      case 2:
        (styleColor = commonStyle.colors.tomorrow), (image = tomorrowImage);
        break;
      case 7:
        (styleColor = commonStyle.colors.week), (image = weekImage);
        break;
      default:
        (styleColor = commonStyle.colors.month), (image = monthImage);
        break;
    }

    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({ showAddTask: false })}
        />
        <ImageBackground source={image} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="bars" size={20} color={commonStyle.colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toogleFilter}>
              <Icon
                name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                color={commonStyle.colors.secondary}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task {...item} onDelete={this.deleteTask} onToggleTask={this.toggleTask} />
            )}
          />
        </View>
        <ActionButton
          buttonColor={styleColor}
          onPress={() => {
            this.setState({ showAddTask: true });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.secondary,
    fontSize: 50,
    marginLeft: 20
  },
  subtitle: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  taskContainer: {
    flex: 7
  },
  iconBar: {
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
