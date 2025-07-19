const mongoose = require("mongoose")
const ROLES = require('../constants/roles');


const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [ROLES.SUPER_ADMIN, ROLES.STAFF], default: ROLES.STAFF },
    permissions: {
        studentCreate: { type: Boolean, default: false },
        studentRead: { type: Boolean, default: false },
        studentUpdate: { type: Boolean, default: false },
        studentDelete: { type: Boolean, default: false }
    },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Staff", StaffSchema)