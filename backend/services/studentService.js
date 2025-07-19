const Student = require('../models/Student');

exports.createStudentService = async (studentData) => {
  const student = new Student(studentData);
  return await student.save();
};

exports.getStudentsService = async () => {
  const students = await Student.find()
  return students
};

exports.getStudentsByIdService = async (studentId) => {
  const students = await Student.findById(studentId).populate('createdBy', 'name email').exec();
  return students
};

exports.updateStudentService = async (studentId,studentData) => {
  const updated = await Student.findByIdAndUpdate(studentId, studentData, { new: true });
  return updated
};

exports.deleteStudentService = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
  return { message: "Deleted" }
};
