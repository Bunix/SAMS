let billingDB = require('../db/billing.db');
module.exports = function(app){
	app.get('/productsBilling',function(request , response){
        let billing = {};
        console.log(billingDB);
        billingDB.getProductsBilling((err,rows) => {
            if(!err){
                rows.forEach(val => {
                    billing[val.productId] = val;
                });
                response.json(billing);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.get('/productBilling/:transactionId',function(request , response){
        let transaction = {};
        billingDB.getProductBilling(request.params.transactionId,(err,rows) => {
            if(!err){
                rows.forEach(val => {
                    transaction[val.productId] = val.count;
                });
                
                response.json(transaction);
            }
            else
                response.json({ error: "failed request"});
        });
        
        
    });

    app.post('/productBilling',function(request , response){
        billingDB.create(request.body , (err,rows) => {
            if(!err)
                response.json({ message: "added data"});
            else
                response.json({ error: "failed request"});
        });
    });

    app.put('/productBilling/:transactionId',function(request , response){
        billingDB.updateProductDeliveryStatus( request.params.transactionId,request.body.deliveryStatus,(err,result) => {
            if(!err)
                response.json({ message: "changed state"});
            else
                response.json({ error: "failed request"});
        });
    });	
};
