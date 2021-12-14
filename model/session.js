const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    user_id: { type: String, unique: true  },
    jwt_token: { type: String },
    last_requested_at: { type: Date }
});


module.exports = mongoose.model("session", sessionSchema);