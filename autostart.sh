#!/usr/bin/env bash

SERVER_NPM="sudo npm start"
LAUNCH_CHROMIUM="chromium-browser http://localhost:3000 -start-fullscreen"

cd ~/Desktop/git_repos/mavboard
echo "Starting the web server"
$SERVER_NPM &
echo "Successfully started the web server"
echo "Going to sleep for a bit ..."
sleep 2m
echo "Waking back up ..."
echo "Displaying the browser"
DISPLAY=:0 $LAUNCH_CHROMIUM
