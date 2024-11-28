import serial
import json

arduino_port = "/dev/ttyACM0"
baud_rate = 9600

default_data = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
counter = 0

json_data = {
    "data": default_data,
    "counter": counter
}

with open("input.json", 'w') as json_file:
    json.dump(json_data, json_file, indent=1)

try:
    ser = serial.Serial(arduino_port, baud_rate, timeout=1)
    print(f"Connected to {arduino_port} at {baud_rate} baud rate.")

    while True:
        if ser.in_waiting > 0:
            try:
                raw_data = ser.readline().decode('utf-8').strip()
                data = list(map(int, raw_data.split()))
                
                if data != default_data:
                    counter += 1
                    
                    json_data = {
                        "data": data,
                        "counter": counter
                    }
                    
                    with open("input.json", 'w') as json_file:
                        json.dump(json_data, json_file, indent=1)
                    
                    print("New Data:", data)
                    print("Update Count:", counter)
            except ValueError:
                print("Error parsing incoming data:", raw_data)
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'ser' in locals() and ser.is_open:
        ser.close()
        print("Serial connection closed.")
