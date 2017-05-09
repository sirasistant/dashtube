const express = require('express'),
    multer = require('multer'),
    videosController = require('../controllers/videosController.js'),
    authController = require('../controllers/authController.js'),
    upload = multer({ dest: './uploaded/' });

let router = express.Router();

router.route('/').post(upload.fields([{ name: "video" }, { name: "thumbnail" }]), authController.auth, videosController.move, videosController.encode, videosController.generateDash, videosController.saveVideo)
    .get(videosController.list);
module.exports = router;