import React, { useEffect, useState } from "react";
import BookDataService from "../services/book.services";

const Booklist = ( { getBookId } ) => {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    },[])

    const getBooks = async() => {
        const data = await BookDataService.getAllBooks();
        console.log(data.docs);
        setBooks(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    const deleteHandler = async(id) => {
        await BookDataService.deleteBook(id);
        getBooks();
    }

  return (
    <>
        <div className="bookList">
          <div>
              <h2>Book Records</h2>
              <button onClick={getBooks}>
                  Refresh List
              </button>
          </div>

          <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Title</th>
                  <th>Book Author</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                  {books.map((doc, index) => {
                      return (
                        <tr key={doc.id}>
                          <td>{index + 1}</td>
                          <td>{doc.title}</td>
                          <td>{doc.author}</td>
                          <td>{doc.status}</td>
                          <td>
                            <button
                              className="edit"
                              onClick={(e) => getBookId(doc.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete"
                              onClick={(e) => deleteHandler(doc.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
              </tbody>
          </table>
        </div>
    </>
  )
}

export default Booklist