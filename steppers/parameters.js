var laasRepository=require("../db/laasRepository");
var logger = require("../utils/logger");
var responseUtil = require('../utils/responseUtil');
exports.getSPParamters=function(req,res,next){

    logger.log('info',"inside getSPParameters");

    const productCode=res.locals.productCode;

    const ssid=res.locals.sourceSystemId;

    const txnTypeId=req.body.txntypeid;

    if(productCode===undefined || ssid===undefined ||txnTypeId===undefined){

        logger.log('info',"error in getSPParameters doesnot contain the required fields");
        req.headers.statusCode="E00002";
        var response = responseUtil.createResponse('failure','E00002', req.body.txnno);
        res.send(response);
        return;
    }

    laasRepository.getParameters(ssid,txnTypeId,productCode)
        .then((result)=>{
            logger.log('info',"in getSPParameters Result ------>>>>>"+ JSON.stringify(result));
            res.locals.parameters=result;
            next();
        })
        .catch((err)=>{
            logger.log('error',"error in p_getTxnParamMapper  "+err.message);
            req.headers.statusCode="D75100";
            var response = responseUtil.createResponse('failure','D75100', req.body.txnno);
            res.send(response);
        });




};