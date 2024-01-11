const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const { MongoClient } = require('mongodb');
 
async function main() {
  const client = new MongoClient('mongodb+srv://invalid_bug:Dileep%402020@dileep.jngl3rt.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const database = client.db('chatdb');
  const messagesCollection = database.collection('messages');

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
  });
  
  app.get('/', (req, res) => {
    console.log('Accessed / route');
    try {
      res.sendFile(join(__dirname, 'register.html'));
    } catch (error) {
      console.error('Error sending register.html:', error);
      res.status(500).send('Internal Server Error');
    }
  });
 
  app.get('/tut', (req, res) => {
    res.sendFile(join(__dirname, 'tut.html'));
  });

  io.on('connection', async (socket) => {
    socket.join('personal room');
    io.to('personal room').emit('welcome to personal room');

    console.log('User is connected');
    socket.emit('welcome', 'Welcome to the application!');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.broadcast.emit('hi');

    socket.on('chat message', async (msg) => {
      try {
        const result = await messagesCollection.insertOne({ content: msg });
        io.emit('chat message', msg, result.insertedId);
      } catch (e) {
        // TODO handle the failure
        console.error(e);
      }
    });

    io.to('personal room').emit('thanks!');

    if (!socket.recovered) {
      try {
        const cursor = messagesCollection.find();
        await cursor.forEach((doc) => {
          socket.emit('chat message', doc.content, doc._id);
        }); 
      } catch (e) {
        // handle the error
        console.error(e);
      }
    }
  });

  server.listen(5000, () => {
    console.log('listening on port: 5000');
  });
}

main();
