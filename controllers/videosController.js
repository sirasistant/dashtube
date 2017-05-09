const services = require("../utils/services.js"),
    config = services.config,
    mongoose = require('mongoose'),
    CodedError = require('../utils/CodedError.js'),
    winston = require('winston'),
    Promise = require('bluebird'),
    fs = require("fs"),
    exec = require('child_process').exec;
ffmpeg = require('fluent-ffmpeg-withgoplength'),
    Video = mongoose.model('VideoModel');

const systemLogger = winston.loggers.get('system');
const storagePath = config.uploadedBase + '/videos';

var codings = [
    { name: "high", size: "1280x720" },
    { name: "med", size: "640x360" },
    { name: "low", size: "320x180" },
    { name: "base", size: "160x90" }
];

var convertVideo = function (input, output, video, audio, size, fps, noVideo, noAudio) {
    return new Promise(function (resolve, reject) {
        var instance = ffmpeg(input)
            .output(output)
            .on('end', function () {
                resolve(output);
            }).on('error', function (err, stdout, stderr) {
                reject(err)
            });
        if (noVideo) {
            instance.noVideo();
        } else {
            instance.videoCodec(video).fps(fps).GOPLength(fps)
                .size(size)
        }
        if (noAudio) {
            instance.noAudio();
        } else {
            instance.audioCodec(audio)
        }
        instance.run();

    })
}

var segmentVideos = function (folder, fileNames, fileExtensions) {
    var command = 'MP4Box -dash 4000 -dash-profile onDemand ';
    fileNames.forEach((name, i) => {
        command += name + '.' + fileExtensions[i] + " ";
    })
    return new Promise(function (resolve, reject) {
        exec(command, {
            cwd: folder
        }, function (error, stdout, stderr) {
            if (error) return reject(error);
            resolve(fileNames[0] + "_dash.mpd");
        })
    });
}


exports.move = function (req, res, next) {
    var video = req.files ? req.files.video ? req.files.video[0] : null : null;
    if (!video)
        return next(new CodedError("Bad request", 400));;
    var extension = video.originalname.match(/\.[0-9a-z]+/i)[0];
    if (!extension || extension.length == 0)
        return next(new CodedError("Bad request", 400));;
    services.fileUtils.ensureExists(storagePath + '/' + video.filename + "-storage").then(() => {
        return services.fileUtils.moveFile(config.uploadedBase + '/' + video.filename, storagePath + '/' + video.filename + "-storage/original" + extension);
    }).then(nothing => {
        req.video = {
            extension: extension,
            filename: video.filename,
            folder: storagePath + '/' + video.filename + "-storage"
        }
        next();
    });
}

exports.encode = function (req, res, next) {
    Promise.all(codings.map(coding => {
        return convertVideo(req.video.folder + "/original" + req.video.extension, req.video.folder + "/" + coding.name + ".mp4", 'libx264', 'aac', coding.size, 24, false, true)
    }).concat(convertVideo(req.video.folder + "/original" + req.video.extension, req.video.folder + "/audio.mp4", 'libx264', 'aac', "800x600", 24, true, false))).then(result => next()).catch(err => next(err));
}

exports.generateDash = function (req, res, next) {
    segmentVideos(req.video.folder, codings.map(coding => coding.name).concat("audio"), codings.map(coding => "mp4").concat("mp4")).then(mpd => {
        req.video.mpdFile = mpd;
        return Promise.resolve();
    }).then(nothing => next()).catch(err => next(err));
}

exports.saveVideo = function (req, res, next) {
    var image = req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;
    if (!image)
        return next(new CodedError("Bad request", 400));
    var extension = image.originalname.match(/\.[0-9a-z]+/i)[0];
    if (!extension || extension.length == 0)
        return next(new CodedError("Bad request", 400));;
    services.fileUtils.moveFile(config.uploadedBase + '/' + image.filename, req.video.folder + '/' + image.filename + extension).then(nothing => {
        var video = new Video({
            name: req.body.name,
            mpd: "files/videos/" + req.video.filename + "-storage/" + req.video.mpdFile,
            thumbnail: "files/videos/" + req.video.filename + "-storage/" + image.filename + extension,
        })
        return video.save();
    }).then((doc) => {
        res.status(200).jsonp(doc.toJSON());
    }).catch(err => next(err));
}

exports.list = function(req,res,next){
    Video.find({}).exec().then((videos) => {
        return res.status(200).jsonp(videos);
    }).catch((err) => {
        return next(err);
    });
}