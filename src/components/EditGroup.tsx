import { useState } from 'react';
import { UserType } from '../types/types';

import '../styles/Add&Edit.scss';
import _ from 'lodash';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  setEditGroup: React.Dispatch<React.SetStateAction<boolean>>;
  saveMemento: () => void;
  groupID: string;
}

export default function EditGroup({
  userState, setUserState, saveData, setEditGroup, groupID, saveMemento
}: props) {
  const closeWindow = (): void => {
    setEditGroup(false);
  }

  const handleChange = (property: string, value: any): void => {
    setInputState({...inputState, [property]: value});
  }

  const handleSave = (): void => {
    let oldData = userState.groups[groupID];
    let newData = {...oldData, ...inputState};
    
    if (_.isEqual(oldData, newData)) {
      closeWindow();
      return;  
    };

    saveMemento();
    
    let newUserState = {...userState};
    newUserState.groups[groupID] = newData;

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const handleDelete = (): void => {
    saveMemento();

    let newUserState = {...userState};

    const listIDs = newUserState.groups[groupID].listIDs;
    const taskIDs = listIDs.flatMap((l) => newUserState.lists[l].taskIDs);

    newUserState.groupIDs.splice(newUserState.groupIDs.indexOf(groupID), 1);
    delete newUserState.groups[groupID];
    listIDs.forEach(listID => {
      delete newUserState.lists[listID];
    });
    taskIDs.forEach(taskID => {
      delete newUserState.tasks[taskID];
    });

    setUserState({...newUserState});
    saveData();
    closeWindow();
  }

  const [inputState, setInputState] = useState(userState.groups[groupID]);

  return (
    <div className="Edit">
      <div className="Edit-bg"
        onClick={closeWindow}
      ></div>
      <div className="Edit-main">
        <div className="Edit-main-inputs">
          <div className="Edit-main-inputs-name">
            <label>Group Name</label>
            <input 
              type="text" 
              value={inputState.name} 
              onChange={(e) => handleChange("name", e.target.value)} 
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