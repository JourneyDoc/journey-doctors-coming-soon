import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI
const options = {
  connectTimeoutMS: 10000, // 10 seconds timeout for connection
  serverSelectionTimeoutMS: 10000 // 10 seconds timeout for server selection
}

if (!uri) {
  throw new Error('MongoDB URI is missing. Please define MONGO_URI in your .env or .env.local file.')
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect().catch(err => {
      console.error('Failed to connect to MongoDB:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      })
      throw err
    })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a new client
  client = new MongoClient(uri, options)
  clientPromise = client.connect().catch(err => {
    console.error('Failed to connect to MongoDB:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    })
    throw err
  })
}

export default clientPromise