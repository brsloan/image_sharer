var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

var path = process.cwd();
var ImageHandler = require(path + '/server/components/image/imageHandler.server.js');
var imageHandler = new ImageHandler();

var UserHandler = require(path + '/server/components/user/userHandler.server.js');
var userHandler = new UserHandler();

router.param('user', userHandler.getByName);

router.get('/images', imageHandler.getAllImages);
router.put('/images', auth, imageHandler.saveImage);
router.get('/images/user/:user', imageHandler.getUserImages);
router.get('/images/:id', imageHandler.getImage);
router.delete('/images/:id', auth, imageHandler.deleteImage);
router.put('/images/:id/like', auth, imageHandler.likeImage);

module.exports = router;
