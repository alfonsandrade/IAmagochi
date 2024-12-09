#!/bin/bash

# Start the SSH agent
eval "$(ssh-agent -s)"
ssh-add /home/alfons/.ssh/id_ed25519

# Navigate to the project directory
cd /home/alfons/git/IAmagochi || exit

# Reset any local changes and pull the latest changes from the default branch
git reset --hard HEAD
git pull origin $(git rev-parse --abbrev-ref HEAD)

# Set permissions for Apache to access the files (if necessary)
chmod -R 755 /home/alfons/git/IAmagochi

# Reload Apache to apply changes (optional)
sudo systemctl reload apache2
