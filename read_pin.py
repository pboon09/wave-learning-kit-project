import serial
import time

arduino_port = "COM7"
baud_rate = 115200

try:
    # Establish the serial connection
    ser = serial.Serial(arduino_port, baud_rate, timeout=1)
    # print(f"Connected to {arduino_port} at {baud_rate} baud.")
    time.sleep(2)

    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()
            print(f"{data}")
except serial.SerialException as e:
    print(f"Error: {e}")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    if 'ser' in locals() and ser.is_open:
        ser.close()
        print("Serial connection closed.")
