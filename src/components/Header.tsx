import { useState } from 'react';
import '../styles/Header.scss';
import { UserType } from '../types/types';
import AddGroup from './AddGroup';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  mementos: string[];
  setMementos: React.Dispatch<React.SetStateAction<string[]>>;
  mementoIndex: number;
  setMementoIndex: React.Dispatch<React.SetStateAction<number>>;
  saveMemento: () => void;
}

export default function Header({
  userState, setUserState, saveData, mementos, setMementos, mementoIndex, setMementoIndex, saveMemento
}: props) {
  const undo = (): void => {
    if (undoDisabled()) return;
    const newMementos = [...mementos];
    if (newMementos[mementoIndex] === undefined) {
      newMementos[mementoIndex] = JSON.stringify(userState);
      setMementos(newMementos);
    }

    const newMementoIndex = mementoIndex - 1; 
    const newUserState = JSON.parse(mementos[newMementoIndex]);

    setUserState({...newUserState});
    setMementoIndex(newMementoIndex);
    saveData();
  }

  const redo = (): void => {
    if (redoDisabled()) return;
    const newMementoIndex = mementoIndex + 1; 
    const newUserState = JSON.parse(mementos[newMementoIndex]);

    setUserState({...newUserState});
    setMementoIndex(newMementoIndex);
    saveData();
  }

  const undoDisabled = (): boolean => {
    return mementoIndex === 0;
  }

  const redoDisabled = (): boolean => {
    return mementoIndex >= mementos.length-1;
  }

  const [addGroup, setAddGroup] = useState(false);

  return (
    <>
      <header>
      <img src="icons/undo.png" alt="Undo" className={undoDisabled() ? "disabled" : ""}
          onClick={undo}
        />
        <img src="icons/redo.png" alt="Redo" className={redoDisabled() ? "disabled" : ""}
          onClick={redo}
        />
        <img src="icons/add.png" alt="Add"
          onClick={() => setAddGroup(true)}
        />
      </header>
      {
        addGroup &&
        <AddGroup
          userState = {userState}
          setUserState = {setUserState}
          saveData = {saveData}
          setAddGroup={setAddGroup}
          saveMemento = {saveMemento}
        />
      }
    </>
  );
}