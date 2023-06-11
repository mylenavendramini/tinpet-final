import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const URI = 'mongodb://127.0.0.1:27017/app-data';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

// import connectDB from './models/dataModel.js';

// connectDB();

// dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


//Sign Up function to new users
app.post('/signup', async (req, res) => {
  const client = new MongoClient(URI);
  const { email, password } = req.body;

  const generateUserId = v4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send('User already exists. Please login');
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res
      .status(201)
      .json({ token, userId: generateUserId, email: sanitizedEmail });
  } catch (error) {
    console.log(error);
  }
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`☕ Express server listening on port: ${PORT}`);
});
