import { useState } from 'react';
import { UserType } from '../types/types';

import '../styles/Add&Edit.scss';
import _ from 'lodash';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  saveMemento: () => void;
  listID: string;
  taskID: string;
}

export default function AddGroup({
  userState, setUserState, saveData, setEditTask, taskID, listID, saveMemento
}: props) {
  const closeWindow = (): void => {
    setEditTask(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const handleSave = (): void => {
    let oldData = userState.tasks[taskID];
    let newData = {...oldData, ...inputState};
    
    if (_.isEqual(oldData, newData)) {
      closeWindow();
      return;  
    };

    saveMemento();

    let newUserState = {...userState};
    newUserState.tasks[taskID] = newData;

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const handleDelete = (): void => {
    saveMemento();
    
    let newUserState = {...userState};

    let newList = newUserState.lists[listID];

    newList.taskIDs.splice(newList.taskIDs.indexOf(taskID), 1)
    delete newUserState.tasks[taskID];

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const [inputState, setInputState] = useState(userState.tasks[taskID]);

  return (
    <div className="Edit">
      <div className="Edit-bg"
        onClick={closeWindow}
      ></div>
      <div className="Edit-main">
        <div className="Edit-main-inputs">
          <div className="Edit-main-inputs-name">
            <label>Task Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>
          <div className="Edit-main-inputs-count">
            <label>Repeat</label>
            <input
              type="number" 
              value={inputState.count} 
              onChange={(e) => handleChange("count", parseInt(e.target.value.replace(/\D/,'')))} 
            />
          </div>
          <div className="Add-main-inputs-done">
            <label>Done</label>
            <input
              type="number" 
              value={inputState.done} 
              onChange={(e) => handleChange("done", parseInt(e.target.value.replace(/\D/,'')))} 
            />
          </div>
        </div>
        <div className="Edit-main-buttons">
          <h3
            onClick={closeWindow}
          >Cancel</h3>
          <h3 className="Edit-main-buttons-delete"
            onClick={handleDelete}
          >Delete</h3>
          <h3
            onClick={handleSave}
          >Save</h3>
        </div>
      </div>
    </div>
  );
}