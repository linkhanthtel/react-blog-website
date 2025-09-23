#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Upgrade pip
pip install --upgrade pip

# Install requirements with no cache to avoid issues
echo "Installing Python dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "Build completed successfully!"
