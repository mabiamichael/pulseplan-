# PulsePlan — React Personal Planner

A responsive React frontend for tasks and daily habits, built with React + Vite. Task and habit changes persist in browser local storage.

## Features
- Task dashboard and completion stats
- Add, complete, search, filter, and delete tasks
- Toggle daily habits
- Responsive desktop and mobile layouts
- Multi-stage Docker build using Nginx
- Health endpoint at `/health`

## Run locally
Requires Node.js and npm.
```bash
npm install
npm run dev
```
Open the URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Docker
```bash
docker build -t pulseplan:1.0.0 .
docker run --rm -d --name pulseplan -p 8080:80 pulseplan:1.0.0
```
Open `http://localhost:8080`; check `http://localhost:8080/health`.
Stop with `docker stop pulseplan`.

## Push to GitHub
Create an empty GitHub repository called `pulseplan`, then run these commands in this folder:
```bash
git init
git add .
git commit -m "Build PulsePlan React planner with Docker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pulseplan.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username. If a remote already exists, use `git remote set-url origin https://github.com/YOUR_USERNAME/pulseplan.git`.

## Publish to Docker Hub
```bash
docker login
docker tag pulseplan:1.0.0 YOUR_DOCKERHUB_USERNAME/pulseplan:1.0.0
docker push YOUR_DOCKERHUB_USERNAME/pulseplan:1.0.0
```
Replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username.

Note: this is a frontend demo; there is no backend or account sync. Google Fonts load externally when internet access is available.
