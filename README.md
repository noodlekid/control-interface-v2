# CONTROL INTERFACE FOR CPRT MARS ROVER (NAME PENDING)

1. clone the repository

Start services: (AWAITS FURTHER DOCUMENTATION)
```bash
tileserver-gl
rosbridge-server
```

You dont need to start those services to work on the UI for the most part, but they are 
required when working on core features such as the map display, video streams and any functionallity with
ROS2 Humble.

### Run Locally

2.a. Install dependencieshttps://github.com/kitloong/nextjs-dashboard
```bash
npm install
```
3.a To run developemt
```bash
npm run dev
```
To run production build
```bash
npm run build
npm run start
```

Access interface in web browser (has only beem tested in brave, chromium, and safari) at 
localhost:3000/connect


### Run Dockerized

2.b To run development
```bash
make build-development
make start-development
```
Access at http://localhost:3001/connect

To run production
```bash
make build-production
make start-production
```

Access at http://localhost:3003/connect

To run enviroment for UAT Testing
```bash
make build-staging
make start-staging
```

Access at http://localhost:3002
