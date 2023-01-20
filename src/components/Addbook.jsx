import React, { useState, useEffect } from 'react';
import BookDataService from "../services/book.services";

const Addbook = ( {id, setBookId}) => {

  const [ title, setTitle ] = useState("");
  const [ author, setAuthor ] = useState("");
  const [ status, setStatus ] = useState("Available"); 
  const [ availability, setAvailability ] = useState(true);
  // const [ active, setActive ] = useState(true);
  const [ message, setMessage ] = useState({error: false, msg: ""});

  // firestore returns a promise
  // file handling is asyncronous
  const handleSubmit = async(e) => {
    e.preventDefault(); // prevent page refresh;
    setMessage("");

    if (title == "" || author == "") {
      setMessage({error: true, msg: "All fields are required."})
      return;
    }

    const newBook = {
      title,
      author,
      status
    }

    console.log(newBook);

    try {
      if (id !== undefined  && id!== "") {
        await BookDataService.updateDoc(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({error: false, msg: "New book added successfully."});
      }
    } catch (err) {
      setMessage({error: true, msg: err.message})
    }

    // clear fields after submitting
    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");

    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("The current record is: ", docSnap.data);
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <>
        <div className='bookForm'>
        <form onSubmit={handleSubmit}>
            <div className='formBookTitle'>
              <label> Title:</label>
              <input type="text" 
                     placeholder="Book Title" 
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className='formBookAuthor'>
              <label> Author:</label>
              <input type="text" 
                     placeholder="Author Name"
                     value={author}
                     onChange={(e) => setAuthor(e.target.value)}/>
            </div>

            <div className='formBookStatus'>
              <label> Status:</label>
              <button style={{color: status == "Available" ? "green": "gray"}}
                      onClick={(e)=> {
                        e.preventDefault();
                        setStatus("Available");
                        setAvailability(true);
                      }}>
                Available
              </button>

              <button style={{color: status == "Not Available" ? "red": "gray"}}
                      onClick={(e)=> {
                        e.preventDefault();
                        setStatus("Not Available");
                        setAvailability(false);
                      }}>
                Not Available
              </button>

            </div>

            <div className="submitBtn">

              <button type="submit">Add/ Update Book</button>
            </div>
        </form>

        </div>
    </>
  )
}

export default Addbook