const Database = require('../config/database')


module.exports = {
    Index (req,res){
       res.render('pages/index')
    },
    Login (req,res){
        res.render('pages/login')
    },
    Home(req,res){
        if(req.session.loggedin === true){
            res.render('pages/home')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Catalog (req,res){
        console.log(req.query.scale);
        console.log(req.query.vendor);
        var scale = req.query.scale;
        var vendor = req.query.vendor;
        if((scale === undefined && vendor === undefined) || (scale === "All" && vendor === "All") ){
        Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine)',function(err,result,fields){
      
            // response.end;
            //var myJ = [{data : 'aawfawf'},{data : 'sfkiohek5o'}];
             res.render('pages/catalog/catalog',{result : result })
            //res.render('pages/catalog/catalog',{data : 'aawfawf'})
           // res.json(result);
            // res.send("Success"); 
         });
        }else if( scale === "All" && vendor !== "All"){
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productVendor = ?',vendor,function(err,result,fields){
                 res.render('pages/catalog/catalog',{result : result })
            })
        }else if(scale !== "All" && vendor === "All"){
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ?',scale,function(err,result,fields){
                res.render('pages/catalog/catalog',{result : result })
           })
        }else{
            Database.query('SELECT * FROM `products` JOIN `productlines` USING (productLine) where productScale = ? and productVendor = ?',[scale,vendor],function(err,result,fields){
                res.render('pages/catalog/catalog',{result : result })
           })
        }
       
    },

    
    Instock(req,res){
        if(req.session.loggedin === true){
            res.render('pages/ordering/instock')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Preorder(req,res){
        if(req.session.loggedin === true){
            res.render('pages/ordering/pre-order') 
        }else{
            res.redirect('/authenFailed')
        }
    },
    Status(req,res){
        if(req.session.loggedin === true){
            res.render('pages/status') 
        }else{
            res.redirect('/authenFailed')
        }
    },
    Discount(req,res){
        if(req.session.loggedin === true){
            res.render('pages/discount')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Preordermanage(req,res){
        if(req.session.loggedin === true){
            res.render('pages/preorder')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Customer(req,res){
        if(req.session.loggedin === true){
             res.render('pages/customer')
        }else{
            res.redirect('/authenFailed')
        }
    },
    Employee(req,res){
        if(req.session.loggedin === true){
            res.render('pages/employee')
        }else{
            res.redirect('/authenFailed')
        }
    },
    addUser (req,res){
        res.render('pages/addUser',{x:10})
        
    },
    authenFailed (req,res){
        res.render('pages/redirectPage')
    }
}