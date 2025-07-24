how to run wihtout usb

FRIST TIME NEED TO BE CONNECT AND RUN BY USING USB

- connect the USB cable.
- Go to Settings → About Phone → Tap "Build Number" 7 times to enable Developer Options.
- Go to Settings → Developer Options → Enable USB Debugging.
- Also, enable Wireless Debugging if using Android 11+.
- Run this command to check if your device is detected (adb devices):
- Go to Settings → Wi-Fi → Click on the Connected Network → Note the IP Address (e.g., 192.168.1.1).
- Run this command to enable TCP/IP mode for ADB : adb tcpip 5555
- Disconnect the USB cable.
- adb connect 192.168.1.5:5555
- npx react-native run-android

✅ splasch screen
✅ folder structure
✅ Router Set-up

-- \*\* Users ---
1️⃣ Home (header -> food category default is all) -> all food cart
👉 Order View : header show restraunt name (list there all items) wwhen clikc on plus icon opne a bottom slider to add to card;
on click go to cart -> go to order pages

    2️⃣ Cart Screen (show all selected product and have a option to remove and view there product) and button to add addres
     👉 Address : show previous order to edit , or select from map -> show all prices final -> go to pay
     👉 show all payment method and take a payemnt and show
     👉 order conformation screen (redirect to tracking screen)

     3️⃣ Traccking  (tracking map -> order Name -> item read only -> download invoide)
     4️⃣ profile -> (show user profile )
      👉 edit basic info
      👉 order history


//**  1️⃣ Logo desgin is pending  ***//

* measure a image size for banner/restaurant/item image size

* create A LADO (text logo) new way, For APP ;
* create a splash screen of lado by Effect -> 
    i am thinking to create something on Home Page Loading is like show garhwa ghanta ghar image in main screen and  in down show lado animeted text loading
    ites fell like this is for garhwa  


//** 2️⃣ Login And WelCome Screen **//

* Log In Screen
* singUp Screen
* Select Location
* Location Check (if the location is not mached the show a error and tell to come under delivery area)
    do same at firs time open/whe they inter location


//** 3️⃣ Home (Optimise) **//

 -> header
 -> banner carosol screen
 -> filter Items
 -> restaurant card 

 * Restaurant View (not optimized code)
    * carosal restaurant Image View (Check for standerd size )
    * header search - back
    * food card
    * selected Item - go To Top
    * provde whathsap button as ask for healp (think about it)

* Cat (This Screen is Required a re desgin and optimization)
    * show all selected Cart
    
 
//** 4️⃣   **//


