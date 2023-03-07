#include <ESP8266WiFi.h>

const char* WIFI_SSID = "BEBENGUKLSKK"; //name ssid
const char* PASS = "12345678A";   //pass wifi
void setup()
{
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(WIFI_SSID, PASS);

  Serial.print("Menyambungkan");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Tersambung,Dengan IP address: ");
  Serial.println(WiFi.localIP());
}
void loop() {}
