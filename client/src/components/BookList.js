import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';


function BookList(props) {

    const displayBooks = () => {
        var data = props.data;
        if (data.loading) {
            return (<div>Loading books...</div>);
        } else {
            console.log("%c BOOK display", "color:red");
            return data.books.map(book => {
                return (
                    <li onClick={() => onSelHandler(book.id)} key={book.id}>{book.name}</li>
                )
            })
        }
    }
    const [selectedId, setSelId] = useState("");
    const onSelHandler = (id) => {
        setSelId(id);
    }
    const onDeleteHandler = (id) => {

    }
    console.log(props);

    return (
        <div>
            <h1>Reading List</h1>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selectedId}></BookDetails>
        </div>
    );
}

export default graphql(getBooksQuery)(BookList);
