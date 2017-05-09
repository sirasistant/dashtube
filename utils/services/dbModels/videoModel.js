const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const videoSchema = new Schema({
    name: { type: String, default: "" },
    mpd: { type: String,default:""},
    thumbnail:{ type: String,default:""}
});

mongoose.model('VideoModel', videoSchema);