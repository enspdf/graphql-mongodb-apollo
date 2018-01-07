import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import schema from './schema';

const server = express();
const PORT = 3000;

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

mongoose.connect('mongodb://localhost/graphqlTutorial');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection to database was successful!');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});