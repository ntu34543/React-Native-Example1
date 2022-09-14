import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Linking,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ToastAndroid,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/Goalltem";
import GoalInput from "./components/Goallnput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  // console.log(courseGoals);
  const onPressHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      setShowWarning(true);
      // Alert.alert(
      //   "Warning",
      //   "The name must be longer than 3 characters!",
      //   [
      //     {
      //       text: "Do not show again",
      //       onPress: () => console.warn("Do not show Pressed!"),
      //     },
      //     { text: "Cancer", onPress: () => console.warn("Cancer Pressed!") },
      //     { text: "Ok", onPress: () => console.warn("Ok Pressed!") },
      //   ],
      //   { cancelable: true, onDismiss: () => console.warn("Alert dismissed!") }
      // );
      // ToastAndroid.showWithGravity(
      //   "The name must be longer than 3 characters!",
      //   ToastAndroid.LONG,
      //   ToastAndroid.CENTER
      // );
    }
  };

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addTextInput(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Button
          title="Add new Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <View style={styles.body}>
          <Modal
            visible={showWarning}
            transparent
            onRequestClose={() => setShowWarning(false)}
            animationType= "slide"
            hardwareAccelerated
          >
            <View style={styles.centered_view}>
              <View style={styles.warning_modal}>
                <View style={styles.warning_title}>
                  <Text>WARNING!</Text>
                </View>
                <Text>The name must be longer than 3 characters!</Text>
              </View>
            </View>
          </Modal>
          <Text style={styles.text}>Please write your name:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Join"
            onChangeText={(value) => setName(value)}
            // maxLength={2}
            // editable={false}
            // secureTextEntry
          />
          {/* <Button
            title={submitted? "Clear" : "Submit"}
            // disabled={submitted}
            color="#5e0acc"
            onPress={onPressHandler}
            onPress={() => {
              Linking.openURL(
                "https://ca.slack-edge.com/T324R7VB6-U03RS7EKJHG-323b9d1b6216-512"
              );
            }}
          /> */}
          {/* <TouchableOpacity
            style={styles.button}
            onPress={onPressHandler}
            activeOpacity={0.5}
          >
            <Text style={styles.text}>{submitted ? "Clear" : "Submit"}</Text>
          </TouchableOpacity> */}
          <Pressable
            onPress={onPressHandler}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: "blue" }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? "#dddddd" : "#00ff00" },
              styles.button,
            ]}
          >
            <Text style={styles.text}>{submitted ? "Clear" : "Submit"}</Text>
          </Pressable>
          {submitted ? <Text>You are registered as {name}</Text> : null}
          {/* <Text style={styles.text}>You are registered as {name}</Text> */}
        </View>
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addTextInput}
          onCancer={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            style={styles.goalsContainer}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return index.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  body: {
    alignItems: "center",
  },
  goalsContainer: {
    // flex: 4,
  },
  text: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    width: 200,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#00ff00",
    width: 150,
    height: 50,
  },
  centered_view:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderRadius: 20,
  },
  warning_title: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopLeftRadius: 20,
  }
});
