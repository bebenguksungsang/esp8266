const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://arikun:12345678A@pptikio3.sglpxl7.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(url)
const dbName = 'SENSORTANAH'


async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tanah');
  
    // the following code examples can be pasted here...
  
    return 'done.';
  }


  
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());