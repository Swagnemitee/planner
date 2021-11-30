import '../styles/TaskList.scss';
import { TaskListType, UserType } from '../types/types';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

type props = {
  userState: UserType;
  setUserState: React.Dispatch<React.SetStateAction<UserType>>;
  saveData: () => void;
  list: TaskListType;
  listIndex: number;
}

export default function TaskList({
  userState, setUserState, list, listIndex, saveData
}: props) {
  const newTask = () => {
    // TODO: Create new task
    setUserState(userState);
    saveData();
    console.log("New Task");
  }

  const more = () => {
    // TODO: List more menu
    setUserState(userState);
    saveData();
    console.log("More");
  }


  return (
    <Draggable draggableId={list.id} index={listIndex}>
      {(provided) =>
        <div className="TaskList"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="TaskList-title"
            {...provided.dragHandleProps}
          >
            <h3>{list.name}</h3>
            <div className="divider"></div>
            <img src="icons/add.png" alt="Add"/>
            <img src="icons/more.png" alt="More"/>
          </div>
          <Droppable droppableId={list.id} type="task">
            {provided => (
              <div
                className="Task-wrapper"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  list.taskIDs.map((id, taskIndex) => 
                    <Task
                      key={id}
                      userState={userState}
                      setUserState={setUserState}
                      saveData = {saveData}
                      task={userState.tasks.get(id)!}
                      index={taskIndex}
                    />
                  )
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      }
    </Draggable>
  );
}