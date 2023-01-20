import { db } from "../firebase-config";

import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// instance that refers to the book collection in our db
const bookCollectionRef = collection(db, "books");

class BookDataService {

    // method to add new book to our instance
    addBooks = (newBook) => {
        return addDoc(bookCollectionRef, newBook);
    }

    updateDoc = (id, updatedBook) => {
        // check if book with such id exists
        const bookDoc = doc(db, "books", id);

        // update doc if a book is fetched
        return updateDoc(bookDoc, updatedBook);
    }

    deleteBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return deleteDoc(bookDoc);
    }

    getAllBooks = () => {
        return getDocs(bookCollectionRef);
    }

    getBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return getDoc(bookDoc);
    }
}

export default new BookDataService();