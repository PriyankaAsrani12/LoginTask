const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    role_id: { type: String, unique: true  },
    organization_id: { type: String },
    role_name: { type: String }
});


module.exports = mongoose.model("role", roleSchema);