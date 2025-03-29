// connect mobile with cable and make sure -> developer option is on

npx react-native run-android

how to run wihtout usd

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
-> splach screen
-> app logo

✅ folder structure
-> pages
-> component
-> utils - router

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

header bheaviour
homepage ->

     show location -> userIcon
     search bar -> veg option s
     banner

     --- on scroll ----
     fix search bar with veg and non veg option

order View

show back --- account
cliked item hotel name -> rating
distance

after scrooll
back button - and search
