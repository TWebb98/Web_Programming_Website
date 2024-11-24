// server.js
const Hapi = require('@hapi/hapi');
const MongoClient = require('mongodb').MongoClient;

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
           cors: {
                origin: ['*']  // This allows requests from any origin
            }
        }
    });

    // MongoDB connection setup
    const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test_db');
    const collection = db.collection('testCollection');

    // Route to get all items
    server.route({
        method: 'GET',
        path: '/getItems',
        handler: async (request, h) => {
            const items = await collection.find({}).toArray();
            return items;
        }
    });

    // Route to add an item
    server.route({
        method: 'POST',
        path: '/postItems',
        handler: async (request, h) => {
            // log(request.payload);
            const newItem = request.payload;
            const result = await collection.insertOne(newItem);
            return result;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
