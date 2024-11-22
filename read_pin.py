import serial
arduino_port = "COM7"
baud_rate = 9600

default_data = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]

try:
    ser = serial.Serial(arduino_port, baud_rate, timeout=1)

    while True:
        if ser.in_waiting > 0:
            raw_data = ser.readline().decode('utf-8').strip()
            data = list(map(int, raw_data.split()))
            
            if data != default_data:
                print(data)

except Exception as e:
    print(f"Error: {e}")
finally:
    if 'ser' in locals() and ser.is_open:
        ser.close()
