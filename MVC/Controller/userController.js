import userModel from "../Model/userModel.js";
import jwt from 'jsonwebtoken';
import {comparePassword,hashPassword} from '../Helper/authHelper.js'

const JWT_SECRET = process.env.JWT_SECRET;

// add user
export const registerUser = async (req, res) => {

    try {
        const { name, email, password,verified } = req.body;


        // validate input
        if (!name) {
            return res.status(400).send("Enter your name");
        }
        if (!email) {
            return res.status(400).send("Enter your email id");
        }
        if (!password) {
            return res.status(400).send("Enter your Password");
        }
        // if(!verified){
        //     verified = 0;
        // }
        // check is user exist
        const chkExisting = await userModel.findOne({ email });
        if (chkExisting) {
            return res.status(400).send("Email already registered");
        }
    const hashedPassword = await hashPassword(password);

        // Create user  
        const newUser = await userModel.create({
            name,
            email,
            password:hashedPassword,
            verified
        });
        // const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1hr" });
        // Send response
        return res.status(201).send({
            status: "success",
            message: 'User registered successfully',
            user: newUser,
        });

    } catch (error) {
        console.log(`Error in API: ${error}`);
        return res.status(500).send("Internal Server Error");
    }
};

// get 
export const getAllUser = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(`Error getting mobile phones: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};

export const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user) return res.status(200).json(user);
        else return res.status(404).send("User not found");
    } catch (error) {
        console.error(`Error getting user by ID: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};


// User login controller
export const userLoginController = async (req, res) => {
    try {
      const { email, password ,verified} = req.body;
      // Validation
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Check if password matches
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
  
      // Generate token
    //   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).send({
        status: "success",
        message: "User logged in successfully",
        user
      });
    } catch (error) {
      console.log(`Error in API: ${error}`);
      res.status(500).send("Internal server error");
    }
  };



// update

export const userUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            // Check if password is provided in the request body
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updateUser = await user.save();
            return res.status(200).send({
                status: "success",
                message: "User updated successfully",
                updateUser
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }
    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
};


// delete


export const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user) {
            await user.deleteOne();
            return res.status(200).send({
                success: true,
                message: "User deleted successfully",
            })
        } else {
            res.status(404).send({
                status: "error",
                message: "User not found"
            });
        }
    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
};


