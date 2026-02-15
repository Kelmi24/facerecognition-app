#!/bin/bash
# Navigate to the project root
cd ..

echo "Initializing Git repository in project root..."
git init

echo "Adding remote origin..."
git remote add origin https://github.com/Kelmi24/facerecognition-app.git

echo "Adding all files..."
git add .

echo "Committing changes..."
git commit -m "Ready for deployment: Added Procfile, init.sql, and config"

echo "Renaming branch to main..."
git branch -M main

echo "Pushing to GitHub..."
git push -u origin main

echo "Done! Your code is on GitHub."
