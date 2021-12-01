import { useState } from 'react';
import { UserType } from '../types/types';

import '../styles/Add&Edit.scss';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  listID: string;
}

const defaultInputs = {
  name: "",
  count: 1,
}

export default function AddList({
  userState, setUserState, saveData, setAddTask, listID
}: props) {
  const closeWindow = (): void => {
    setAddTask(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const handleCreate = (): void => {
    let newUserState = {...userState};

    let newID = (newUserState.nextID++).toString();
    let newData = {...inputState, id: newID, done: 0};

    newUserState.tasks.set(newID, newData);
    newUserState.lists.get(listID)!.taskIDs.push(newID);

    setUserState({...newUserState});
    setInputState(defaultInputs);
    saveData();
    closeWindow();
  }

  const [inputState, setInputState] = useState(defaultInputs);

  return (
    <div className="Add">
      <div className="Add-bg"
        onClick={closeWindow}
      ></div>
      <div className="Add-main">
        <div className="Add-main-inputs">
          <div className="Add-main-inputs-name">
            <label>Task Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          <div className="Add-main-inputs-count">
            <label>Repeat</label>
            <input
              type="number" 
              value={inputState.count} 
              onChange={(e) => handleChange("count", e.target.value.replace(/\D/,''))} 
            />
          </div>
        </div>
        <div className="Add-main-buttons">
          <h3
            onClick={closeWindow}
          >Cancel</h3>
          <h3
            onClick={handleCreate}
          >Create</h3>
        </div>
      </div>
    </div>
  );
}