import './App.css';
import React, { useState, useEffect } from 'react';
import { checkStringLength } from './utils';
import { getGists } from './services/gistService';
import Note from './components/Note';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const dataFromLocal = JSON.parse(localStorage.getItem('data'));
  const [notepadName, setNotepadName] = useState(dataFromLocal?.name || '');
  const [noteTitle, setNoteTitle] = useState('');
  const [description, setNoteDescription] = useState(dataFromLocal?.content || '');
  const [data, setData] = useState([]);

  useEffect(() => {
    getGists().then(resp => {
      const { content, filename } = resp.data.files.notepad;
      const dataToLocal = {
        content: JSON.parse(content),
        name: filename
      }
      localStorage.setItem('data', JSON.stringify(dataToLocal));
      setNotepadName(filename)
      setData(JSON.parse(content));
    })
  }, [])

  useEffect(() => {
    const dataToLocal = {
      name: notepadName,
      content: data,
    }
    localStorage.setItem('data', JSON.stringify(dataToLocal))
  })

  const addNote = () => {
    if (!noteTitle.length || !description.length) {
      return console.log('error');
    }

    const isExist = data.some(el => el.note === noteTitle);
    if (isExist) {
      return console.log('error')
    }

    const newNote = {
      note: noteTitle,
      desc: description,
      id: uuidv4()
    }

    const newData = [...data, newNote]
    setData(newData)
  }

  const editNoteTitle = (value, id) => {
    const editedData = data.map(item => item.id === id ? { ...item, note: value } : item);
    setData([...editedData])
  }

  const editNotepadTitle = (e) => {
    const { value } = e.target;
    checkStringLength(value, 255);
    setNotepadName(value);
  }

  const deleteNotepad = () => {
    setData([]);
    setNotepadName('');
    setNoteTitle('');
  }

  const deleteNote = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const editNoteDescription = (value, id) => {
    const editedData = data.map(item => item.id === id ? { ...item, desc: value } : item);
    setData([...editedData])
  }

  return (
    <div className="App">
      <h1>Notepad Application</h1>
      <div className='container'>
        <div className='notepad-title'>
          <div>
            <legend>Notepad Title</legend>
            <input
              value={notepadName}
              className='input input-s'
              placeholder='My notepad title ...'
              onChange={(e) => editNotepadTitle(e)}
            />
          </div>
          <div className='action-buttons'>
            <button className='btn save' onClick={() => void 0}>Save</button>
            <button className='btn delete' onClick={deleteNotepad}>Delete</button>
          </div>
        </div>
        <h4>My Notes</h4>
        <Note setNoteTitle={setNoteTitle} setDescription={setNoteDescription} />
        <button className='btn add' onClick={addNote}>Add</button>
        <div className='notes'>
          {data.map(((item) =>
            <Note
              isEdit={true}
              item={item}
              setNoteTitle={editNoteTitle}
              setDescription={editNoteDescription}
              deleteNote={deleteNote}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;