const Student = require('../models/student');

exports.getAddStudent = (req, res, next) => {
  console.log(req.session.IsLoggedIn)
  res.render("store/data", {
    pageTitle: "Upload Page",
    currentPage: "Upload",
    IsLoggedIn: req.session.IsLoggedIn,
    error: [],
    oldInput: {},
    user: req.session.user || {},
  }
)
}; 

exports.postAddStudent = async (req, res) => {
  try {
    const { className, sectionName, year,students } = req.body;

    // console.log('Received data:', { className, sectionName, students });

    // Validate required fields
    if (!className || !year || !sectionName || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: 'Invalid or incomplete data format' });
    }

    let classDoc = await Student.findOne({ className, sectionName ,year});
    // console.log("class",classDoc);
    
    if (classDoc) {
      const existingEnrollments = new Set(classDoc.students.map(s => String(s.enrollmentNo)));
      // Filter out students whose enrollmentNo already exists in the class
      // console.log('see',existingEnrollments);
      
      const uniqueStudents = students.filter(
        s => !existingEnrollments.has(String(s.enrollmentNo))
      );
      console.log('Unique students to be added:', uniqueStudents);

      if (uniqueStudents.length === 0) {
        return res.status(409).json({ message: 'All students already exist or are invalid.' });
      }
      classDoc.students.push(...uniqueStudents);
      console.log('reached');
      
      await classDoc.save();
    } 
    else {
      const validStudents = students.filter(s => s.name && String(s.enrollmentNo));
      // console.log('Valid students to be added:', validStudents);
      classDoc = new Student({
        className,
        sectionName,
        students: validStudents
      });
      await classDoc.save();
    }
    res.status(200).json({ message: 'Students saved successfully!' });
  } catch (error) {
    // console.error('Error saving students:', error);   
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getStudentsByClassAndSection = async (req, res) => {
  const { className, sectionName ,year } = req.query;
  console.log('Query parameters:', { className, sectionName });
  console.log(req.session.IsLoggedIn);
  if (!className || !sectionName || !year) {
    return res.render('store/showStudents', {
      selectedClass: '',
      selectedSection: '',
      students: [],
      pageTitle: "Show Students",
      currentPage: "Show_Students",
      IsLoggedIn: req.session.IsLoggedIn,
      user: req.session.user || {},
    });
  }
    const classDoc = await Student.findOne({ className, sectionName,year });

    if (!classDoc || classDoc.students.length === 0) {
      return res.render('store/showStudents', {
        selectedClass: className,
        selectedSection: sectionName,
        students: [],
        pageTitle: "Show Students",
        currentPage: "Show_Students",
        IsLoggedIn: req.session.IsLoggedIn,
        user: req.session.user || {},
      });
    }
    else {
    res.render('store/showStudents', {
      selectedClass: className,
      selectedSection: sectionName,
      students: classDoc ? classDoc.students : [],
      pageTitle: "Show Students",
      currentPage: "Show_Students",
      IsLoggedIn: req.session.IsLoggedIn,
      user: req.session.user || {},
    });
  } 
}

exports.addNewStudent = async (req,res,next) =>
{
    const className = req.body.className;
    const sectionName = req.body.sectionName;
    
    const {studentName,enrollmentNo} = req.body;

    if (!className || !sectionName || !studentName || !enrollmentNo) {
      return res.status(400).json({ message: 'Incomplete data format' });
    }

    let classDoc = await Student.findOne({ className,sectionName});
    if (classDoc) {

      const existUser = await Student.exists({ enrollmentNo: enrollmentNo })
      if(existUser)
      {
        return res.status(409).json({ message: 'Student with this enrollment number already exists.' });
      }
      else
      {
        classDoc.students.push({ name: studentName, enrollmentNo });
        await classDoc.save();
      }
    }
    else
    {
          classDoc = new Student({
          className: className,
          sectionName: sectionName,
          students: [{ name: studentName, enrollmentNo: enrollmentNo }]
        });
      classDoc.students.push({ name: studentName, enrollmentNo });
      await classDoc.save();
    }
    console.log("New Student Added")

    const student = await Student.findOne({
      className: className,
      sectionName: sectionName,
    });
    res.render('store/showStudents', {
      selectedClass: className,
      selectedSection: sectionName,
      students: student.students,
      pageTitle: "Show Students",
      currentPage: "Show_Students",
      IsLoggedIn: req.session.IsLoggedIn,
      user: req.session.user || {},
    });
}

exports.deleteStudent = async (req, res, next) => {

    const { className, sectionName,studentIds} = req.body;
    console.log(req.body);
    const student = await Student.findOne({className,sectionName})

    if(!Array.isArray(studentIds))
    student.students.pull({_id: studentIds})
    else
    student.students.pull(...studentIds.map(id => ({ _id: id })));

    await student.save();
     /*student.students.pull({ _id: Student_id }); // Use pull to remove by id*/
    console.log("students deleted")
    res.render('store/showStudents', {
      selectedClass: className,
      selectedSection: sectionName,
      students: student.students,
      pageTitle: "Show Students",
      currentPage: "Show_Students", 
      IsLoggedIn: req.session.IsLoggedIn,
      user: req.session.user || {},
    });
}