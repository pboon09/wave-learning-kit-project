//เกือบเสร็จแล้ว เหลือเช็ค encoder ตัวสุดท้าย

enum PinAssignments {
  encoderPinA = 19, // ขา S1
  encoderPinB = 18, // ขา S2
  countButton = 21,  // ขา Key

  encoderPinC = 2,
  encoderPinD = 3,
  countButton2 = 20 //รอแก้ไข
};

unsigned long lastDebounceTime = 0; // เก็บเวลาล่าสุดที่ปุ่มถูกกด
const unsigned long debounceDelay = 500; // กำหนดเวลา Debounce (50 ms)

volatile unsigned int encoderPos = 0;  // สำหรับนับจำนวน
volatile unsigned int encoderPos2 = 0;  // สำหรับนับจำนวน
unsigned int lastReportedPos = 1;   // change management
static boolean rotating = false;    // debounce management
static boolean rotating2 = false;    // debounce management

boolean A_set = false;
boolean B_set = false;
boolean C_set = false;
boolean D_set = false;
int button = 0;  // ประกาศตัวแปร outside loop
int ans[12];

void setup() {
  pinMode(encoderPinA, INPUT_PULLUP); // กำหนดโหมดเป็นแบบ Input pullup
  pinMode(encoderPinB, INPUT_PULLUP);
  pinMode(countButton, INPUT);

  pinMode(encoderPinC, INPUT_PULLUP); // กำหนดโหมดเป็นแบบ Input pullup
  pinMode(encoderPinD, INPUT_PULLUP);
  pinMode(countButton2, INPUT);

  // ใช้ digitalPinToInterrupt เพื่อให้โค้ดรองรับกับบอร์ดอื่น
  
  attachInterrupt(digitalPinToInterrupt(countButton), buttonPressed, FALLING);
  attachInterrupt(digitalPinToInterrupt(encoderPinA), doEncoderA, CHANGE); //ทำงานแบบ interrupt บนขา 2
  attachInterrupt(digitalPinToInterrupt(encoderPinB), doEncoderB, CHANGE); //ทำงานแบบ interrupt บนขา 3

  attachInterrupt(digitalPinToInterrupt(countButton2), buttonPressed2, FALLING);
  attachInterrupt(digitalPinToInterrupt(encoderPinC), doEncoderC, CHANGE); //ทำงานแบบ interrupt บนขา 2
  attachInterrupt(digitalPinToInterrupt(encoderPinD), doEncoderD, CHANGE); //ทำงานแบบ interrupt บนขา 3

  Serial.begin(9600);
}

void loop() {
  ans[0] = analogRead(A0); //พัง
  ans[1] = analogRead(A1);
  ans[2] = analogRead(A2);
  ans[3] = analogRead(A3);
  ans[4] = analogRead(A4);
  ans[5] = analogRead(A5);
  
  // อ่านค่า Analog ฝั่ง B
  ans[6] = analogRead(A13); // หมายเหตุ: ตรวจสอบ Pin ที่ถูกต้อง
  ans[7] = analogRead(A12);
  ans[8] = analogRead(A9);
  ans[9] = analogRead(A8);
  ans[10] = analogRead(A10);
  ans[11] = analogRead(A11);

  // print out the value you read:
  Serial.print(encoderPos, DEC); //pulse 1
  Serial.print(" ");  
  Serial.print(0); //button 1
  
  for (int i = 0; i < 6; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
  
  Serial.print(" ");  
  Serial.print(encoderPos2, DEC); //pulse 2
  Serial.print(" ");  
  Serial.print(0); //button 2

  for (int i = 6; i < 12; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
    
  Serial.println("");
  delay(100);        // delay in between reads for stability

  
  rotating = true;  // reset the debouncer
}
// คำสั่งทำงานแบบ interrupt เมื่อมีการหมุน
void doEncoderA() {
  // เช็คการเปลี่ยนแปลงของสวิตช์ A
  if (digitalRead(encoderPinA) != A_set) { // debounce once more
    A_set = !A_set;
    if (A_set && !B_set)
      encoderPos += 1;  // เพิ่มค่า encoder ถ้า A มาก่อน B
    rotating = false;  // ไม่มีการ debounce จนกว่า loop() จะทำงาน
  }
}

// Interrupt on B changing state, same as A above
void doEncoderB() {
  if (digitalRead(encoderPinB) != B_set) {
    B_set = !B_set;
    if (B_set && !A_set)
      encoderPos -= 1;  // ลดค่า encoder ถ้า B มาก่อน A
    rotating = false;
  }
}

// คำสั่งทำงานแบบ interrupt เมื่อมีการหมุน
void doEncoderC() {
  // เช็คการเปลี่ยนแปลงของสวิตช์ A
  if (digitalRead(encoderPinC) != C_set) { // debounce once more
    C_set = !C_set;
    if (C_set && !D_set)
      encoderPos2 += 1;  // เพิ่มค่า encoder ถ้า A มาก่อน B
    rotating2 = false;  // ไม่มีการ debounce จนกว่า loop() จะทำงาน
  }
}

// Interrupt on B changing state, same as A above
void doEncoderD() {
  if (digitalRead(encoderPinD) != D_set) {
    D_set = !D_set;
    if (D_set && !C_set)
      encoderPos2 -= 1;  // ลดค่า encoder ถ้า B มาก่อน A
    rotating2 = false;
  }
}

void buttonPressed() {
  unsigned long currentTime = millis();
  if (currentTime - lastDebounceTime > debounceDelay) {
    Serial.print(encoderPos, DEC); //pulse 1
    Serial.print(" ");  
    Serial.print(1); //button 1
    
    for (int i = 0; i < 6; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
    Serial.print(" ");
    Serial.print(encoderPos2, DEC); //pulse 2
    Serial.print(" ");  
    Serial.print(0); //button 2
    
    for (int i = 6; i < 12; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
    
    Serial.println("");
    lastDebounceTime = currentTime; // อัปเดตเวลาล่าสุดที่กดปุ่ม
  }
}

void buttonPressed2() {
  unsigned long currentTime = millis();
  if (currentTime - lastDebounceTime > debounceDelay) {
    Serial.print(encoderPos, DEC); //pulse 1
    Serial.print(" ");  
    Serial.print(0); //button 1
    
    for (int i = 0; i < 6; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
    Serial.print(" ");
    Serial.print(encoderPos2, DEC); //pulse 2
    Serial.print(" ");  
    Serial.print(1); //button 2
    
    for (int i = 6; i < 12; i++) {   // วนลูปแสดงค่าทีละตัว
        Serial.print(" ");
        Serial.print(ans[i]);
    }
    
    Serial.println("");
    lastDebounceTime = currentTime; // อัปเดตเวลาล่าสุดที่กดปุ่ม
  }
}
