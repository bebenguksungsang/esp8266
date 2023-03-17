const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const PORT = '4000'
const mqtt = require('mqtt')
const host = 'rmq2.pptik.id'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`


const url = 'mongodb+srv://arikun:12345678A@pptikio3.sglpxl7.mongodb.net/?retryWrites=true&w=majority';
const clients = new MongoClient(url);

// Database Name


app.use(express.json())
  


const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: '/surveyworkshop:surveyworkshop',
    password: 'survvy23!',
    reconnectPeriod: 1000,
  })
  
  const topic = 'SENSORTANAH'
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
    client.publish(topic, '250', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
 

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        var myobj = { name: payload};  
        db.collection("SENSORTANAH.tanah").insertOne(myobj, function(err, res) {  
        if (err) throw err;  
        console.log("1 record inserted");  
        db.close();  
        });  
        }); 
  })


app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`)
    
})

