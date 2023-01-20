import { useState } from 'react'
import './App.css'
import Addbook from './components/Addbook'
import Booklist from './components/Booklist'
import logo1 from './assets/img/logo1.png';
import logo2 from './assets/img/logo2.png';

function App() {

  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };

  return (
    <div className="App">
      <header style={{display:"flex"}}>
        <img src={logo2} width="60" height="50"  />
        <h2 style={{padding: "0 10px"}}> CRUD App with React & Firebase </h2>
        <img src={logo1} width="40" height="50" />
      </header>
      <Addbook id={bookId} setBookId={setBookId}/>
      <Booklist getBookId={getBookIdHandler}/>
    </div>
  )
}

export default App
