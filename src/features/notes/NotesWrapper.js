import {useGetNotesQuery} from "./notesApiSlice";
import NotesList from "./NotesList";

const NotesWrapper = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    if (isLoading) return <p>Loading...</p>

    if (isError) {
        return <p className="errmsg">{error?.data?.message}</p>
    }

    return (
        <NotesList notes={data}/>
    );
};

export default NotesWrapper;