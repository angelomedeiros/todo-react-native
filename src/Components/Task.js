import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Swipeable from "react-native-swipeable";
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyle from "../commonStyle";
import moment from "moment";

export default props => {
  let check = null;

  if (props.doneAt !== null) {
    check = (
      <View style={styles.done}>
        <Icon name="check" size={20} color={commonStyle.colors.secondary} />
      </View>
    );
  } else {
    check = <View style={styles.pending} />;
  }

  const descStyle = props.doneAt !== null ? { textDecorationLine: "line-through" } : {};

  const leftContent = (
    <View style={styles.exclude}>
      <Icon name="trash" size={20} color="white" />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  );

  const rightContent = [
    <TouchableOpacity
      style={[styles.exclude, { justifyContent: "flex-start", padding: 20 }]}
      onPress={() => props.onDelete(props.id)}
    >
      <Icon name="trash" size={30} color="white" />
    </TouchableOpacity>
  ];

  return (
    <Swipeable
      leftActionActivationDistance={200}
      onLeftActionActivate={() => props.onDelete(props.id)}
      leftContent={leftContent}
      rightButtons={rightContent}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>{check}</View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.description, descStyle]}>{props.desc}</Text>
          <Text style={styles.date}>
            {moment(props.estimateAt)
              .locale("pt-br")
              .format("ddd, D [de] MMMM [de] YYYY")}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#aaa"
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%"
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: "#555"
  },
  done: {
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#4d7031"
  },
  description: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: commonStyle.fontFamily,
    color: commonStyle.colors.subText,
    fontSize: 12
  },
  exclude: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  excludeText: {
    fontFamily: commonStyle.fontFamily,
    color: "white",
    fontSize: 20,
    margin: 10
  }
});
