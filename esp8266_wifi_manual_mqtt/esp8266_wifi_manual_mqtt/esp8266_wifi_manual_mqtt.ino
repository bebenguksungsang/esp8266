// MQTT WITH RMQ 
// STATIC WIFI
// By Ari Farhan

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// deklarasi global variable
const char* WIFI_SSID = "Yaa";
const char* WIFI_PASS = "987654321";

const char *TOPIC = "SensorSuhu";  // Topic to subcribe to
const char* mqtt_server = "broker.hivemq.com"; 
const char* mqtt_user = "a";
const char* mqtt_pass= "a";
const char* CL = "LSKK";
int KondisiLed = 1;

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  String response;

  for (int i = 0; i < length; i++) {
    response += (char)payload[i];
  }
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.println('\n'); 
  Serial.print("] ");
  Serial.println(response);
  if (response == "MATIKAN LAMPU")  
  {
    Serial.println("LAMPU MATI");
    KondisiLed = 1;
  }
  if (response == "HIDUPKAN LAMPU")
  {
    Serial.println("LAMPU HIDUP");
    KondisiLed = 0;
  }
}
void reconnect() {
  // Loop until we're reconnected
  Serial.println("In reconnect...");
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if(client.connect(CL, mqtt_user, mqtt_pass)) {
      client.subscribe(TOPIC);
      Serial.println("connected");
      Serial.print("Subcribed to: ");
      Serial.println(TOPIC);    
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(115200);
  Serial.println();
  pinMode(D4, OUTPUT);
  //Wifi Conf
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);// Initialize the callback routine
  // initialize digital pin LED_BUILTIN as an output.  
}

// the loop function runs over and over again forever
void loop() {
  if (!client.connected())  // Reconnect if connection is lost
  {
    reconnect();
  }
  client.loop();
  digitalWrite(LED_BUILTIN, KondisiLed);
}
