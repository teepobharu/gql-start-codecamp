import React, { useState, useEffect, useReducer } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';



function AddBook(props) {

    const [formData, setFormData] = useState({ name: '', genre: "", authorId: "" });


    const authorReducer = (state, action) => {
        switch (action.type) {
            case 'FETCH': {
                console.log("FETCH dispatched");
                return state.concat(action.payload);

            }
            case "REMOVE":
                return []
            default: return state
        }
    }
    const [authorList, dispatch] = useReducer(authorReducer, []);

    useEffect(() => {
        if (authorList.length < 1)
            displayAuthors();
    });
    useEffect(() => {
        if (!formData.authorId && authorList.length > 0) {
            console.log("update form data");
            setFormData({ ...formData, authorId: authorList[0]["id"] });
        }
    }, [authorList]);

    // useEffect(() => {
    //     console.log("authorList CHANGE");
    // }, [authorList])


    const displayAuthors = () => {
        var data = props.getAuthorsQuery;
        if (data.loading) {
        } else {
            console.log("fetched");
            dispatch({ type: "FETCH", payload: data.authors });
        }

    }
    const inputChangeHandler = (form) => (e) => {
        setFormData({ ...formData, [form]: e.target.value });
        console.log(form, formData);
    }
    const submitForm = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: formData.name,
                genre: formData.genre,
                authorId: formData.authorId,
            },
            refetchQueries: [{ query: getBooksQuery }]
        });

    }
    const optionSel = authorList.length > 0 ?
        authorList.map(author => {
            return (<option key={author.id} value={author.id}>
                {author.name}
            </option>)
        }) :
        (<option disabled>Loading Authors...</option>);
    return (
        <div>

            <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name</label>
                    <input type="text" onChange={inputChangeHandler("name")} />
                </div>
                <div className="field">
                    <label>Genre</label>
                    <input type="text" onChange={inputChangeHandler("genre")} />
                </div>
                <div className="field">
                    <label>Author</label>
                    <select onChange={inputChangeHandler("authorId")}>
                        {optionSel}
                    </select>
                </div>
                <button> + </button>
            </form>
        </div>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }))(AddBook);


