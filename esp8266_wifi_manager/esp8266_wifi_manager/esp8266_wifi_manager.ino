// MQTT + WIFIMANAGER
// AUTOMATIC CHANGE WIFI
// Coded and Tested By Ari

#include <WiFiManager.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>

const char *mqtt_server = "rmq2.pptik.id";
const char *mqtt_user   = "/surveyworkshop:surveyworkshop";
const char *mqtt_pass   = "survvy23!";
const char *mqtt_cl     = "SENSORTANAH";      //queues dibind dengan topik
char smqtt_port[5] = "1883";
bool shouldSaveConfig = false;

String AnalogSuhu;
char Sh[50];

WiFiClient espClient;
PubSubClient client(espClient);

void setup (){
  Serial.begin(115200);
  pinMode(A0, INPUT);
  pinMode(D4, OUTPUT);
  WiFiManagerParameter custom_mqtt_server("server", "mqtt server", mqtt_server, 40);
  String(smqtt_port).toCharArray(smqtt_port, 5);
  WiFiManagerParameter custom_mqtt_port("port", "mqtt port", smqtt_port, 5);
  WiFiManagerParameter custom_mqtt_user("user", "mqtt user", mqtt_user, 40);
  WiFiManagerParameter custom_mqtt_password("password", "mqtt password", mqtt_pass, 40);

  WiFiManager WM;
  WM.setSaveConfigCallback(saveConfigCallback);
  WM.addParameter(&custom_mqtt_server);
  WM.addParameter(&custom_mqtt_port);
  WM.addParameter(&custom_mqtt_user);
  WM.addParameter(&custom_mqtt_password);

  WM.resetSettings();
  WM.setAPStaticIPConfig(IPAddress(192,168,0,1), IPAddress(192,168,0,1), IPAddress(255,255,255,0));
  WM.autoConnect("ESP666", "12345678");
  Serial.print("IP Address : ");
  Serial.print(WiFi.localIP());
  client.setServer(mqtt_server, 1883);
   
}
void loop (){
   if(!client.connected()){
    reconnect();
   }
  int valuesoil = analogRead(A0);
  int datasoil = valuesoil;
  String datasoilpump = String(datasoil);
  char dataTopump[50];
  datasoilpump.toCharArray(dataTopump, sizeof(dataTopump));
  client.publish(mqtt_cl, dataTopump);
  if(datasoil < 422){
  digitalWrite(D4, HIGH);
   }else{
   digitalWrite(D4, LOW); 
   }
   delay(10000);
   
}
void saveConfigCallback () {
  Serial.println("Should save config");
  shouldSaveConfig = true;
}

void reconnect() {
  // Loop until we're reconnected
  Serial.println("In reconnect...");
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if(client.connect(mqtt_cl, mqtt_user, mqtt_pass)) {
      Serial.println("connected");
    
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
