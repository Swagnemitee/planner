import '../styles/TaskField.scss';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { UserType } from '../types/types';
import TaskGroup from './TaskGroup';
import { useState } from 'react';

type props = {
  user: UserType;
}

export default function TaskField({
  user
}: props) {
  const [userState, setUserState] = useState(user);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const newUserState = {...userState};

    const sourceList = newUserState.lists.get(source.droppableId)!;
    sourceList.taskIDs.splice(source.index, 1);

    const destinationList = newUserState.lists.get(destination.droppableId)!;
    destinationList.taskIDs.splice(destination.index, 0, draggableId);

    //setUserState(newUserState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="TaskField">
        { 
          userState.groupIDs.map(id => 
            <TaskGroup
              key={id}
              user={userState}
              group={userState.groups.get(id)!}
            />
          )
        }
      </div>
    </DragDropContext>
  );
}