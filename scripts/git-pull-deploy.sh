#!/bin/bash

# Start the SSH agent
eval "$(ssh-agent -s)"
ssh-add /home/alfons/.ssh/id_ed25519

# Navigate to the project directory
cd /home/alfons/git/IAmagochi || exit

# Discard any local changes to avoid issues
git reset --hard HEAD

# Ensure the latest state of the branch is fetched
git clean -fd
git fetch origin

# Pull the latest changes from the repository
git pull origin $(git rev-parse --abbrev-ref HEAD)

# Set permissions for Apache to access the files (if necessary)
chmod -R 755 /home/alfons/git/IAmagochi

# Reload Apache to apply changes (optional)
sudo systemctl reload apache2
