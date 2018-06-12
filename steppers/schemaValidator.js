var  Validator=require("jsonschema").Validator;
var laasSchema=require("../schema/laasSchema");
var currency=require("../schema/currency");
var sender=require("../schema/sender");
var receiver=require("../schema/receiver");
var charges=require("../schema/charges");
var othertxnInfo=require("../schema/othertxnInfo");
var logger = require("../utils/logger");
const http = require("../utils/http");
var requestResponse=require("../utils/requestResponse");

exports.validateSchema=function(req,res,next){

    logger.log('info','inside Validate Schema');

    var  laasData=req.body;

    var schemaValidator=new Validator();
    schemaValidator.addSchema(currency,'/currency');
    schemaValidator.addSchema(sender,"/sender");
    schemaValidator.addSchema(receiver,"/receiver");
    schemaValidator.addSchema(charges,"/charges");
    schemaValidator.addSchema(othertxnInfo,"/othertxnInfo");

    var result=schemaValidator.validate(laasData,laasSchema);

    if(result.valid){
        next();
    }
    else{
        var response=requestResponse.requestResponseLog(req,res);
        logger.log('error',"error in validate Schema "+result.errors);
        res.send(result.errors);
    }
};