import React from 'react';
import { getBookQuery } from '../queries/queries';
import { graphql } from 'react-apollo';

function BookDetails(props) {
    const displayBookDetails = () => {
        const { book } = props.data;
        if (book) {
            console.log("TCL: displayBookDetails -> book", book);

            return (
                <><h2>Book Detail</h2>
                    <div className="detail-container">
                        <h3>{book.name}</h3>
                        <p>Id: {book.id}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <h4>Other {book.author.name}'s books</h4>
                        <ul className="otherbooks">
                            {
                                book.author.books.map(item => {
                                    return <li key={item.id}>{item.name}</li>
                                })
                            }
                        </ul>

                    </div>
                </>
            )
        } else {
            return <div>No Books selected...</div>;
        }

    }
    console.log("books", props.data);
    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
