const Employee = require('../models/Employee');

// This gets all the employee through the system 
//http://localhost:3000/api/v1/emp/employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// This creates a new employee
//http://localhost:3000/api/v1/emp/employees
exports.createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    const employee = new Employee({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// This retrieved the employee information from ID
//http://localhost:3000/api/v1/emp/employees/{eid}
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// This updates employee if I get from MongoDB
//http://localhost:3000/api/v1/emp/employees/{eid}
exports.updateEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.eid, {
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(200).json({ message: 'Employee updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// This would delete employee if I get it ID from MongoDB
//http://localhost:3000/api/v1/emp/employees?eid={eid}
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.query.eid);
    if (!employee) {
      res.status(404).json({ message: 'Employee successfully deleted' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
