var mongoose = require('mongoose');
var passport = require('passport');
var Image = mongoose.model('Image');

var path = process.cwd();
var UserHandler = require(path + '/server/components/user/userHandler.server.js');
var userHandler = new UserHandler();

function ImageHandler(){
    
    this.getAllImages = getAllImages;
    this.saveImage = saveImage;
    this.getUserImages = getUserImages;
    this.deleteImage = deleteImage;
    this.getImage = getImage;
    this.likeImage = likeImage;
    
    function getAllImages(req, res, next){
        Image.find(function(err, images){
            if(err){return next(err);}
            
            res.json(images);
        }).populate('user');
    }
    
    function saveImage(req, res, next){
        userHandler.getUserByNameServer(req.payload.username, function(user){
           var image = new Image(req.body);
           image.user = user;
           
           image.save(function(err,book){
              if(err){return next(err);}
              
              res.json(image);
           });
        });
    }
    
    function getUserImages(req, res, next){
        Image.find({user: req.user._id}, function(err, images){
            if(err){return next(err);}
            
            res.json(images);
        }).populate('user');
    }
    
    function deleteImage(req, res, next){
        Image.findById(req.params.id).remove(function(err,image){
            if(err){return next(err);}
            
            res.json(req.params.id);
        })
    }
    
    function getImage(req, res, next){
        Image.findById(req.params.id, function(err,image){
            if(err){return next(err);}
            
            res.json(image);
        }).populate('user');
    }
    
    function likeImage(req, res, next){
        userHandler.getUserByNameServer(req.payload.username, function(user){
            Image.findById(req.params.id, function(err,image){
                if(err){return next(err);}
                
                var matchingUser = image.likers.filter(function(liker){
                    return liker._id = user._id;
                })[0];
                

                if (!matchingUser){
                    image.likers.push(user);
                    image.save(function(err, image){
                       if(err){return next(err);}
                       
                       res.json(image);
                    });
                }
                else{
                    var userIndex = image.likers.indexOf(matchingUser);
                    image.likers.splice(userIndex,1);
                    
                    image.save(function(err, image){
                       if(err){return next(err);}
                       
                       res.json(image);
                    });
                }
            });
        });
    }

}

module.exports = ImageHandler;