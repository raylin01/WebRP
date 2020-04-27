# WebRP
This is a small program that would allow you to show your web activity on Discord via Rich Presence, running on top of existing Rich Presence software EasyRP. WebRP is split up into three parts:

# WebRP Chrome Extension
The Chrome Extension will interface with your browser and update your web activity as you browse the web. As soon as a webpage changes or the tab is activated, it will send an AJAX request to the WebRP Server, which will note down the new activity, and at what time. To run this Chrome Extension, you must first change your user ID (make this something unique, alphanumeric only) in the code (manifest.json:20).

Then, follow these instructions to load an unpacked extension into Chrome/Chromium based browser:
https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension#install-the-extension

After this, your Chrome Extension should be up and running, if there are no errors!

# WebRP Client Python Script
In order to run the client script, you must download the latest version of EasyRP: https://github.com/Pizzabelly/EasyRP/releases

Set up EasyRP as shown on their readme (you will need to create a custom Discord app!): https://github.com/Pizzabelly/EasyRP/blob/master/README.md

Then copy over both getdata.py and known_sites.txt into the EasyRP folder. Edit your user ID (must match your Chrome Extension userID!) in the code (getdata.py:14). 

Run EasyRP AND run getdata.py, and you should see your Web Rich Presence update!

# WebRP Server (Optional, hosted already)
I am currently hosting a WebRP Server, which you can feel free to use. The URLs are already filled in in the necessary places (Chrome Extension and Client Python Script). If you wish to host your own server, you must make sure to change the URL in the Chrome Extension (background.js:27) and in the Client Python Script (getdata.py:28).

To run this server, you will need:
- Node.JS
- MongoDB Database
- The following Node Modules: express, express-handlebars, cors, mongodb

You can install the Node Modules with:
```
npm install express express-handlebars cors mongodb
```

Then, you will need to change the following in the app.js code for the server:
- DB_PASS (app.js:8)
- uri (app.js:10)
- Collection location (app.js:51 and app.js:65)

After that, the WebRP server should be ready to run!

# WebRP Notes
WebRP should work on multiple browsers/computers. You will only need ONE client computer that runs EasyRP and getdata.py. You can install the extension on multiple browsers. As long as you use the same userID, it should all sync. It will use your most recent browser change.
