import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";
function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function textInput(enteredText) {
    setEnteredGoalText(enteredText);
    // console.log(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
          <Image style={styles.image} source={require('../assets/favicon.png')} re/>
        <TextInput
          style={styles.textInput}
          placeholder="Email............"
          onChangeText={textInput}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Click!" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancer!" onPress={props.onCancer}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: 'pink'
  },
  image: {
      width: 100,
      height: 100,
      margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
      marginTop: 16,
    flexDirection: "row",
  },
  button: {
      width: '30%',
      marginHorizontal: 8,
  }
});
