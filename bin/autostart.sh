#This script runs along with a few other commands located in ~/.config/lxsession/LXDE-pi/autostart in order to automatically start the web server and open browser
cd $HOME/mavboard 
&& git pull 
&& npm start