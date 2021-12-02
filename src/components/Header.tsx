import { useState } from 'react';
import '../styles/Header.scss';
import { UserType } from '../types/types';
import AddGroup from './AddGroup';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
}

export default function Header({
  userState, setUserState, saveData
}: props) {
  const undo = () => {

  }

  const redo = () => {

  }

  const [addGroup, setAddGroup] = useState(false);

  return (
    <>
      <header>
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
        />
      }
    </>
  );
}