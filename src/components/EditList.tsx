import { useState } from 'react';
import { UserType } from '../types/types';

import '../styles/Add&Edit.scss';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setEditList: React.Dispatch<React.SetStateAction<boolean>>;
  listID: string;
}

export default function EditList({
  userState, setUserState, saveData, setEditList, listID
}: props) {
  const closeWindow = (): void => {
    setEditList(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const handleSave = (): void => {
    let newUserState = {...userState};

    let oldData = newUserState.lists.get(listID)!;
    let newData = {...oldData, ...inputState};
    
    newUserState.lists.set(listID, newData);

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const handleDelete = (): void => {

  }

  const [inputState, setInputState] = useState(userState.lists.get(listID)!);

  return (
    <div className="Edit">
      <div className="Edit-bg"
        onClick={closeWindow}
      ></div>
      <div className="Edit-main">
        <div className="Edit-main-inputs">
          <div className="Edit-main-inputs-name">
            <label>List Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          <div className="Edit-main-inputs-reset">
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
        <div className="Edit-main-buttons">
          <h3
            onClick={closeWindow}
          >Cancel</h3>
          <h3
            onClick={handleSave}
          >Save</h3>
          <h3 className="Edit-main-buttons-delete"
            onClick={handleDelete}
          >Delete</h3>
        </div>
      </div>
    </div>
  );
}