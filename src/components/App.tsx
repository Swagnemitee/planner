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
    let user: UserType = localUser ? JSON.parse(localUser) : {
      lastLogin: Date.now(),
      nextID: 10,
      groupIDs: ["1", "2", "3"], 
      groups: {
        "1": {id: "1", name: "Home", listIDs: ["4", "6"]},
        "2": {id: "2", name: "Outside", listIDs: ["5"]},
        "3": {id: "3", name: "Monkey", listIDs: []}
      },
      lists: {
        "4": {id: "4", name: "Daily", reset: Reset.DAY, taskIDs: ["7", "8"]},
        "5": {id: "5", name: "Weekly", reset: Reset.WEEK, taskIDs: []},
        "6": {id: "6", name: "Hotel?", reset: Reset.NEVER, taskIDs: ["9"]}
      },
      tasks: {
        "7": {id: "7", name: "Dishes", done: 0, count: 1},
        "8": {id: "8", name: "Study", done: 5, count: 8},
        "9": {id: "9", name: "Trivago.", done: 0, count: 3}
      },
    };

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