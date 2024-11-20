enum PinAssignments {
  encoderPinA = 19,  // ขา S1
  encoderPinB = 18,  // ขา S2
  countButton = 21,  // ขา Key

  encoderPinC = 2,
  encoderPinD = 3,
  countButton2 = 20  //รอแก้ไข
};

volatile int encoderPos = 0;   // สำหรับนับจำนวน
volatile int encoderPos2 = 0;  // สำหรับนับจำนวน
static boolean rotating = false;        // debounce management
static boolean rotating2 = false;       // debounce management

boolean A_set = false;
boolean B_set = false;
boolean C_set = false;
boolean D_set = false;

volatile int b1 = 0;
volatile int b2 = 0;
int pinLeft[6] = { A0, A1, A2, A3, A4, A5 };
int pinRight[6] = { A6, A7, A8, A9, A10, A11 };

void setup() {
  pinMode(encoderPinA, INPUT_PULLUP);  // กำหนดโหมดเป็นแบบ Input pullup
  pinMode(encoderPinB, INPUT_PULLUP);
  pinMode(countButton, INPUT);

  pinMode(encoderPinC, INPUT_PULLUP);  // กำหนดโหมดเป็นแบบ Input pullup
  pinMode(encoderPinD, INPUT_PULLUP);
  pinMode(countButton2, INPUT);

  attachInterrupt(digitalPinToInterrupt(encoderPinA), doEncoderA, CHANGE);  //ทำงานแบบ interrupt บนขา 2
  attachInterrupt(digitalPinToInterrupt(encoderPinB), doEncoderB, CHANGE);  //ทำงานแบบ interrupt บนขา 3

  attachInterrupt(digitalPinToInterrupt(encoderPinC), doEncoderC, CHANGE);  //ทำงานแบบ interrupt บนขา 2
  attachInterrupt(digitalPinToInterrupt(encoderPinD), doEncoderD, CHANGE);  //ทำงานแบบ interrupt บนขา 3

  Serial.begin(115200);
}

void loop() {
  Serial.print(encoderPos, DEC);
  Serial.print(" ");
  Serial.print(digitalRead(countButton));

  for (int i = 0; i < 6; i++) {
    Serial.print(" ");
    Serial.print(analogRead(pinLeft[i]));
  }

  Serial.print(" ");
  Serial.print(encoderPos2, DEC);  //pulse 2
  Serial.print(" ");
  Serial.print(digitalRead(countButton2));  //button 2

  for (int i = 0; i < 6; i++) {
    Serial.print(" ");
    Serial.print(analogRead(pinRight[i]));
  }

  Serial.println("");

  rotating = true;
}

void doEncoderA() {
  if (digitalRead(encoderPinA) != A_set) {
    A_set = !A_set;
    if (A_set && !B_set)
      encoderPos += 1;
    rotating = false;
  }
}

void doEncoderB() {
  if (digitalRead(encoderPinB) != B_set) {
    B_set = !B_set;
    if (B_set && !A_set)
      encoderPos -= 1;
    rotating = false;
  }
}

void doEncoderC() {
  if (digitalRead(encoderPinC) != C_set) {
    C_set = !C_set;
    if (C_set && !D_set)
      encoderPos2 += 1;
    rotating2 = false;
  }
}

void doEncoderD() {
  if (digitalRead(encoderPinD) != D_set) {
    D_set = !D_set;
    if (D_set && !C_set)
      encoderPos2 -= 1;
    rotating2 = false;
  }
}
