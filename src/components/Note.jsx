import { checkStringLength } from "../utils";

const Note = ({ isEdit, item, setNoteTitle, setDescription, deleteNote }) => {
    const handleInputChange = (e, id) => {
        const { value } = e.target;
        checkStringLength(value, 255);
        setNoteTitle(value, id)
    }

    const handleTextareaChange = (e, id) => {
        const { value } = e.target;
        checkStringLength(value, 1000);
        setDescription(value, id)
    }

    return (
        <div className='note'>
            <input
                value={item?.note}
                className='input input-m'
                placeholder='Enter note title...'
                onChange={(e) => handleInputChange(e, item?.id)}
            />
            {isEdit &&
                <button className='btn delete delete-note-btn' onClick={() => deleteNote(item.id)}>Delete</button>}
            <textarea
                className='textarea'
                placeholder='Enter note...'
                onChange={(e) => handleTextareaChange(e, item?.id)}
                value={item?.desc}
            />
        </div>
    );
}

export default Note;