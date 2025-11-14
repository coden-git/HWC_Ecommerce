
const express = require('express')
const path = require('path')
const app = express();

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// serve up production assets with absolute path and proper headers
app.use(express.static(path.resolve(__dirname, 'client/dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Also serve the Assets folder for images
app.use('/Assets', express.static(path.resolve(__dirname, 'client/Assets')));

// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
app.use((req, res) => {
  console.log('Fallback route hit for:', req.url);
  res.sendFile(path.resolve(__dirname, 'client/dist/index.html'));
});

console.log('server started on port:',5001);
app.listen(5001, async()=>{
    
      
});
