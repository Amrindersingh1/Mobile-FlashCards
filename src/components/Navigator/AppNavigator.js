import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopicList from "../screens/TopicList";
import AddTopic from "../screens/AddTopic";
import TopicDetail from "../screens/TopicDetail";
import AddCard from "../screens/AddCard";
import Quiz from "../screens/Quiz";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "AddTopic") {
              iconName = focused ? "ios-add-circle-outline" : "ios-add";
            } else if (route.name === "Home") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "indigo",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={TopicList} />
        <Tab.Screen name="AddTopic" component={AddTopic} />
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="TopicDetail" component={TopicDetail} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
