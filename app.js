var express=require('express');
var bodyParser=require('body-parser');
var logger=require('./utils/logger');
var helmet=require('./utils/helmet');
var path=require('path');
var laasRoutes=require("./routes/laasroutes");
const portNo=3000;
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
helmet.bind(app);
logger.bind(app,'info','log','access.log','1d',true);
laasRoutes(app);
var server=app.listen(portNo,function(){
   console.log("server is running at 3000");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



