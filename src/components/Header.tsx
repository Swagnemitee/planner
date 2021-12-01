import '../styles/Header.scss';
import { UserType } from '../types/types';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
}

export default function Header({
  userState, setUserState, saveData
}: props) {

  const newGroup = (): void => {
    // TODO: Create new group
    setUserState(userState);
    saveData();
    console.log("New Group");
  }

  return (
    <header>
      <img src="icons/add.png" alt="Add"
        onClick={() => newGroup()}
      />
    </header>
  );
}