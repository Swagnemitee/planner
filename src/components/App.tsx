import { useState } from 'react';
import '../styles/App.scss';
import { Reset } from "../types/enums";
import { UserType } from "../types/types";
import Header from "./Header";
import TaskField from "./TaskField";

export default function App() {
  const saveData = (): void => {
    // TODO: save to localStorage
    console.log(userState);
  }
  
  const loadData = (): UserType => {
    // TODO: load from localStorage

    return {
      lastLogin: Date.now(),
      nextID: 10,
      groupIDs: ["1", "2", "3"], 
      groups: new Map([
        ["1", {id: "1", name: "Home", listIDs: ["4", "6"]}],
        ["2", {id: "2", name: "Outside", listIDs: ["5"]}],
        ["3", {id: "3", name: "Monkey", listIDs: []}]
      ]),
      lists: new Map([
        ["4", {id: "4", name: "Daily", reset: Reset.DAY, taskIDs: ["7", "8"]}],
        ["5", {id: "5", name: "Weekly", reset: Reset.WEEK, taskIDs: []}],
        ["6", {id: "6", name: "Hotel?", reset: Reset.NEVER, taskIDs: ["9"]}]
      ]),
      tasks: new Map([
        ["7", {id: "7", name: "Dishes", done: 0, count: 1}],
        ["8", {id: "8", name: "Study", done: 5, count: 8}],
        ["9", {id: "9", name: "Trivago.", done: 0, count: 3}]
      ]),
    }
  }

  const [userState, setUserState] = useState(loadData());
  
  return (
    <div className="App">
      <Header 
        userState = {userState}
        setUserState = {setUserState}
        saveData = {saveData}
      />
      <TaskField 
        userState = {userState}
        setUserState = {setUserState}
        saveData = {saveData}
      />
    </div>
  );
}