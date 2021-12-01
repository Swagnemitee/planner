import { useState } from 'react';
import { UserType } from '../types/types';
import { Reset } from '../types/enums';

import '../styles/Add&Edit.scss';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setAddList: React.Dispatch<React.SetStateAction<boolean>>;
  groupID: string;
}

const defaultInputs = {
  name: "",
  reset: Reset.NEVER,
}

export default function AddList({
  userState, setUserState, saveData, setAddList, groupID
}: props) {
  const closeWindow = (): void => {
    setAddList(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const create = (): void => {
    let newUserState = {...userState};

    let newID = (newUserState.nextID++).toString();
    let newData = {...inputState, id: newID, taskIDs: []};

    newUserState.lists.set(newID, newData);
    newUserState.groups.get(groupID)!.listIDs.push(newID);

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
            <label>List Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          <div className="Add-main-inputs-reset">
            <label>Resets</label>
            <select 
              value={inputState.reset} 
              onChange={(e) => handleChange("reset", e.target.value)} 
            >
              <option value="never">Never</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
        </div>
        <div className="Add-main-buttons">
          <h3
            onClick={closeWindow}
          >Cancel</h3>
          <h3
            onClick={create}
          >Create</h3>
        </div>
      </div>
    </div>
  );
}