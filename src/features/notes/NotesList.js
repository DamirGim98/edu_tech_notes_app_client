import Note from "./Note"
import useAuth from "../../hooks/useAuth";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useState} from "react";
import {v4 as uuid} from 'uuid';
import {useUpdateNoteMutation} from "./notesApiSlice";

const NotesList = ({notes}) => {
    const {username, isAdmin, isManager} = useAuth()

    const [updateNote] = useUpdateNoteMutation()

    const {ids, entities} = notes

    let filteredIds
    if (isManager || isAdmin) {
        filteredIds = [...ids]
    } else {
        filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const startedNotes = {
        completed: 1,
        items: ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 1),
        name: 'Not started yet'
    }
    const inProgressNotes = {
        completed: 2,
        items: ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 2),
        name: 'In progress'
    }

    const completedNotes = {
        completed: 3,
        items: ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 3),
        name: "Completed"
    }

    const [columns, setColumns] = useState({
        [uuid()]: startedNotes,
        [uuid()]: inProgressNotes,
        [uuid()]: completedNotes,
    })

    const onDragEnd = async (result, columns, setColumns) => {
        console.log(result)
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });

            const currentNote = entities[result.draggableId]
            await updateNote({
                id: currentNote.id,
                userId: currentNote.userId,
                title: currentNote.title,
                text: currentNote.text,
                completed: destColumn.completed
            })


        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };


    return (
        <div className="list-container">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {
                    Object.entries(columns).map(([id, notes]) => {
                        return (
                            <Droppable droppableId={id} key={id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div className="list__wrapper">
                                            <p className="list__title">{notes.name}</p>
                                            <div
                                                className="list"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver && 'rgba(255, 213, 128, 0.3)'
                                                }}
                                            >
                                                {notes.items.map((noteId, index) => {
                                                    return (
                                                        <Draggable
                                                            key={noteId}
                                                            draggableId={noteId}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            ...provided.draggableProps.style,
                                                                            margin: "8px 0 8px 0",
                                                                        }}
                                                                    >
                                                                        <Note noteId={noteId}/>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )
                                }}
                            </Droppable>
                        )
                    })
                }
            </DragDropContext>
        </div>
    )
}
export default NotesList