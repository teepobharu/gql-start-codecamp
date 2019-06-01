const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();
const db = `mongodb://${"admin"}:${"admin123"}@ds047666.mlab.com:47666/mongotest`;

app.use(cors());

mongoose.connect(db, { useNewUrlParser: true }, (err, db) => {
    if (err)
        console.log("DB FAILEDD!")
    if (db)
        console.log("DB Connected !")
}
);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = 4000;
app.listen(port, () => {
    console.log("Listening on port: %d", port);
})