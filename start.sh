#!/bin/sh

install_dependencies() 
{
    npm install 
}

install_react() 
{
    npm install react-scripts@3.4.1 -g 
}

start_application() 
{
    npm start
}

echo "Installing dependencies..."
install_dependencies
install_react
echo "Dependencies installed successfully."

echo "Starting the application..."
start_application