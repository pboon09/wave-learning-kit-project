enum PinAssignments {
  encoderPinA = 19,
  encoderPinB = 18,
  countButton = 21,

  encoderPinC = 2,
  encoderPinD = 3,
  countButton2 = 7
};

volatile int encoderPos = 0;       // สำหรับนับจำนวน
volatile int encoderPos2 = 0;      // สำหรับนับจำนวน
static boolean rotating = false;   // debounce management
static boolean rotating2 = false;  // debounce management

boolean A_set = false;
boolean B_set = false;
boolean C_set = false;
boolean D_set = false;

int pinLeft[6] = { A0, A1, A2, A3, A4, A5 };
int pinRight[6] = { A7, A9, A13, A12, A14, A15 };

int prev_pos, prev_pos2, prev_b1, prev_b2;
int prev_val[12];

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

  Serial.begin(9600);
}

void loop() {
  Serial.print(checkEncoderState(prev_pos, encoderPos));
  Serial.print(" ");
  Serial.print(checkButtonState(prev_b1, digitalRead(countButton)));

  for (int i = 0; i < 6; i++) {
    Serial.print(" ");
    Serial.print(checkPotenState(prev_val[i], (analogRead(pinLeft[i]) / 100) % 10));
  }

  Serial.print(" ");
  Serial.print(checkEncoderState(prev_pos2, encoderPos2));
  Serial.print(" ");
  Serial.print(checkButtonState(prev_b2, digitalRead(countButton2)));  //button 2

  for (int i = 0; i < 6; i++) {
    Serial.print(" ");
    if (i == 4) {
      Serial.print("0");
    } else {
      Serial.print(checkPotenState(prev_val[i + 6], (analogRead(pinRight[i]) / 100) % 10));
    }
  }

  Serial.println("");

  rotating = true;
  rotating2 = true;
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

int checkEncoderState(int &prev_pos, int pos) {
  int state = 0;
  if (pos - prev_pos > 0) {
    state = 1;
  } else if (prev_pos - pos > 0) {
    state = -1;
  }
  prev_pos = pos;
  return state;
}

int checkButtonState(int &prev_button, int button) {
  int state = 1;
  if (button == 0 && prev_button == 1) {
    state = 0;
  }
  prev_button = button;
  return state;
}

int checkPotenState(int &prev_val, int val) {
  int state = 0;
  if (val - prev_val > 0) {
    state = 1;
  } else if (prev_val - val > 0) {
    state = -1;
  }
  prev_val = val;
  return state;
}