import { useState } from "react";
import { StyleSheet, View, FlatList, Button, Text, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/Goalltem";
import GoalInput from "./components/Goallnput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  // console.log(courseGoals);

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
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <Button
          title="Add new Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <Text style={{textAlign: 'center'}}>State Hook</Text>
        <Button
          title="Youtube channal"
          color="#5e0acc"
          onPress={()=>{Linking.openURL('https://www.youtube.com/watch?v=ANdSdIlgsEw')}}
        />
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
  goalsContainer: {
    // flex: 4,
  },
});
