import webview
import os
import threading
import keyboard

def on_esc_press(window):
    window.destroy()

def listen_for_escape(window):
    keyboard.wait('esc')
    on_esc_press(window)

def main():
    html_file = 'home_page.html'
    abs_path = os.path.abspath(html_file)
    file_url = f'file://{abs_path}'

    window = webview.create_window(
        title='Wave Learning Kit',
        url=file_url,
        fullscreen=True, 
        frameless=True,
        easy_drag=False,
    )

    # Start a separate thread to listen for the Esc key
    esc_thread = threading.Thread(target=listen_for_escape, args=(window,), daemon=True)
    esc_thread.start()

    webview.start()

if __name__ == '__main__':
    main()
