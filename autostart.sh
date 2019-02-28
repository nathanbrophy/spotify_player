#!/usr/bin/env bash
cd ~/Desktop/git_repos/mavboard
echo "Starting the web server"
sudo npm start &
echo "Successfully started the weberver"
echo "Going to sleep for a bit ..."
sleep 2m
echo "Waking back up ..."
echo "Displaying the browser"
DISPLAY=:0 chromium-browser http://localhost:3000 -start-fullscreen
