import dayjs from 'dayjs';
import { useState } from 'react';
import '../styles/App.scss';
import { Reset } from "../types/enums";
import { UserType } from "../types/types";
import Header from "./Header";
import TaskField from "./TaskField";

import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekStart: 1,
});

export default function App() {
  const saveData = (userData: UserType = userState): void => {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  const loadData = (): UserType => {
    const localUser = localStorage.getItem("user");
    let user: UserType = localUser ? JSON.parse(localUser) : defaultUser;

    const now = Date.now() //1639151497000;

    const d1 = dayjs(user.lastLogin);
    const d2 = dayjs(now);

    const sameMonth = d1.isSame(d2, "month");
    const sameWeek = d1.isSame(d2, "week");
    const sameDay = d1.isSame(d2, "day");

    console.log(d1, d2)
    console.log(sameDay, sameWeek, sameMonth);
    console.log(d1.locale())

    for (const listID in user.lists) {
      const list = user.lists[listID];
      if (
        (list.reset === "day" && !sameDay) ||
        (list.reset === "week" && !sameWeek) ||
        (list.reset === "month" && !sameMonth)
      ) {
        resetTasks(user, list.taskIDs);
      }
    }
    
    user.lastLogin = now;
    saveData(user);

    return user;
  }

  const resetTasks = (user: UserType, taskIDs: string[]): void  => {
    for (const taskID of taskIDs) {
      user.tasks[taskID].done = 0;
    }
  }

  const saveMemento = (): void => {
    const newMementos = [...mementos];
    newMementos.splice(mementoIndex);
    newMementos.push(JSON.stringify(userState));
    const newMementoIndex = mementoIndex + 1;

    setMementos([...newMementos]);
    setMementoIndex(newMementoIndex);
  }

  const [userState, setUserState] = useState(loadData());
  const [mementos, setMementos] = useState([] as string[]);
  const [mementoIndex, setMementoIndex] = useState(0);
  
  return (
    <div className="App">
      <Header 
        userState = {userState}
        setUserState = {setUserState}
        saveData = {saveData}
        mementos = {mementos}
        setMementos = {setMementos}
        mementoIndex = {mementoIndex}
        setMementoIndex = {setMementoIndex}
        saveMemento={saveMemento}
      />
      <TaskField 
        userState = {userState}
        setUserState = {setUserState}
        saveData = {saveData}
        saveMemento = {saveMemento}
      />
    </div>
  );
}


const defaultUser = {
  lastLogin: Date.now(),
  nextID: 31,
  groupIDs: ["1", "2", "3"], 
  groups: {
    "1": {id: "1", name: "Personal", listIDs: ["4", "5", "6"]},
    "2": {id: "2", name: "School", listIDs: ["7", "8"]},
    "3": {id: "3", name: "Free Time", listIDs: ["9", "10", "30"]}
  },
  lists: {
    "4": {id: "4", name: "Daily", reset: Reset.DAY, taskIDs: ["14", "15", "16"]},
    "5": {id: "5", name: "Weekly", reset: Reset.WEEK, taskIDs: ["12", "22", "25"]},
    "6": {id: "6", name: "Monthly", reset: Reset.MONTH, taskIDs: ["20", "23"]},
    "7": {id: "7", name: "Daily", reset: Reset.DAY, taskIDs: ["11", "26"]},
    "8": {id: "8", name: "Weekly", reset: Reset.WEEK, taskIDs: ["17", "24"]},
    "9": {id: "9", name: "Daily", reset: Reset.DAY, taskIDs: ["13", "27"]},
    "10": {id: "10", name: "Weekly", reset: Reset.WEEK, taskIDs: ["18", "19", "21", "29"]},
    "30": {id: "30", name: "Long Time", reset: Reset.NEVER, taskIDs: ["28"]},
  },
  tasks: {
    "11": {id: "11", name: "Study", done: 0, count: 1},
    "12": {id: "12", name: "Excercise", done: 0, count: 5},
    "13": {id: "13", name: "Have some personal time", done: 0, count: 2},
    "14": {id: "14", name: "Tidy around", done: 0, count: 1},
    "15": {id: "15", name: "Wake up early", done: 0, count: 1},
    "16": {id: "16", name: "Go to bed early", done: 0, count: 1},
    "17": {id: "17", name: "Work on projects", done: 0, count: 4},
    "18": {id: "18", name: "Eat something delicious", done: 0, count: 1},
    "19": {id: "19", name: "Do something exciting", done: 0, count: 1},
    "20": {id: "20", name: "Reflect on my past month", done: 0, count: 1},
    "21": {id: "21", name: "Try something new", done: 0, count: 1},
    "22": {id: "22", name: "Clean thoroughly", done: 0, count: 1},
    "23": {id: "23", name: "Develop a new habit", done: 0, count: 2},
    "24": {id: "24", name: "Reflect on my past school week", done: 0, count: 1},
    "25": {id: "25", name: "Plan my next week", done: 0, count: 1},
    "26": {id: "26", name: "Do homework", done: 0, count: 1},
    "27": {id: "27", name: "Find a new song I like", done: 0, count: 3},
    "28": {id: "28", name: "Work on something big", done: 0, count: 100},
    "29": {id: "29", name: "Thank Swagnemite for the website", done: 0, count: 1},
  },
}