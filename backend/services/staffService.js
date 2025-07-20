const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const ROLES = require('../constants/roles');


exports.createStaffService = async (staffData) => {
  let password = staffData.password;
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  const staffBodyData = {
    name: staffData.name,
    email: staffData.email,
    password,
    role: ROLES.STAFF,
    permissions: staffData.permissions
  }
  const staff = new Staff(staffBodyData);
  return await staff.save();
};

exports.getStaffService = async () => {
  const staff = await Staff.find({ role: 'Staff' })
  return staff
};

exports.getStaffByIdService = async (staffId) => {
  const staff = await Staff.findById(staffId)
  return staff
};

exports.updateStaffService = async (staffId, staffData) => {
  if (staffData.password) {
    staffData.password = await bcrypt.hash(staffData.password, 10);
  }

  const updated = await Staff.findByIdAndUpdate(staffId, staffData, { new: true });
  return updated
};

exports.updateStaffPermission = async (staffId, staffData) => {

  const updated = await Staff.findByIdAndUpdate(
    staffId,
    { permissions: staffData },
    { new: true }
  )

  return updated
}

exports.deleteStaffService = async (staffId) => {
  await Staff.findByIdAndDelete(staffId);
  return { message: "Deleted" }
};


exports.findByEmail = async (email) => {
  const user = await Staff.findOne({ email })
  return user
};

exports.createUser = async ({ ...user }) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const newUser = new Staff({ ...user, password: hashedPassword })
  await newUser.save()
  return newUser
}

exports.getCurrentStaffService = async (staffId) => {
  const staff = await Staff.findById(staffId).select('-password');
  return staff;
};


exports.verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
