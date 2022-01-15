module.exports = {
  apps : [{
    name   : "Express-App",
    script : "server.js",
    env_development:{
      NODE_ENV:"development"
    },
    env_production:{
      NODE_ENV:"production"
    },
    exec_mode:"cluster",
    instances:"MAX",
    autorestart:true,
    watch:true,
    max_memory_restart:"512M"
  }]
}
