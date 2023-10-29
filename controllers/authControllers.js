const { hashPassword, comparePassword } = require("../authHelper/auth");
const Users = require("../Model/Users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, date, address, phone, role, answer } =
      await req.body;

    if (!firstName) {
      return res.send({ message: "First name is required" });
    }
    if (!lastName) {
      return res.send({ message: "Last name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (role === 0 || role === 1) {
      return res.send({ message: "Role is required" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User is already exist with this email",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new Users({
      firstName,
      lastName,
      email,
      date,
      password: hashedPassword,
      phone,
      address,
      answer,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating the user",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ messgae: "password is required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registred",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credintials, Please cheak your email and Password !",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        user: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
        date: user.date,
        answer: user.answer,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "login not successfull",
      error,
    });
  }
};

//For Current
const currentController = async (req, res) => {
  res.send("protected routes");
};

//For forget passowrd
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //check
    const user = await Users.findOne({ email, answer });
    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await Users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//To get all transporters
const getAllTransporters = async (req, res)=>{
  try {
    const transporters = await Users.find({role: 0});
    // const total = await Users.find().estimatedDocumentCount();
    // console.log(transporters)
     return res.status(200).send({
      success: true,
      // total,
      message: "Successfully fetch All Transporters",
      transporters
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to fetch All Transporters"
    })
  }
}

//To get all transporters
const getAllManufacturers = async (req, res)=>{
  try {
    const transporters = await Users.find({role: 1}).populate("transporter");
    // const total = await Users.find().estimatedDocumentCount();
    // console.log(transporters)
     return res.status(200).send({
      success: true,
      // total,
      message: "Successfully fetch All Manufacturers",
      transporters
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to fetch All Manufacturers"
    })
  }
}

//to get single transporter
const getTransporter = async (req,res)=>{
  try {
      const {_id} = req.params;
      const transporter = await Users.findById(_id);
      res.status(200).send({
        success: true,
        message: "Fetch transporter Successfully",
        transporter
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in fetching Transporter",
      error
    })
  }
}

module.exports = {
  registerController,
  loginController,
  currentController,
  forgotPasswordController,
  getAllTransporters,
  getAllManufacturers,
  getTransporter
};
