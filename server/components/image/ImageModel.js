var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
   url: String,
   caption: String,
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   reposters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   likers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Image', ImageSchema);