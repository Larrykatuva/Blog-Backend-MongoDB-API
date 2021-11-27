import User from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


/**
 * Utility functions for the UserController
 */

export class UserControllerHelper{

    /**
     * 
     * Create new user function helper
     * 
     * @param {object} user 
     * @returns {object} 
     * res a json of created user details
     */
    static async registerUser(user){
        const { username, email, password, phone } = user;
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        try {
            const user = new User({
                username: username,
                email: email,
                password: hashPassword,
                phone: phone
            })
            return await user.save();
        } catch (error) {
            throw error;
        }
    }


    /**
     * 
     * Get a user by id
     * 
     * @param {Number} _id 
     * @returns {Objects}
     * res a json of the user matching the id
     */
    static async findUserById(_id){
        try {
            return await User.findOne({_id})
        } catch (error) {
            throw error;
        }
    }




    /**
     * 
     * Get a user by email
     * 
     * @param {email} email 
     * @returns {Objects}
     * res a json of the user matching the email
     */
    static async findUserByEmail(email){
        try {
            return await User.findOne({email})
        } catch (error) {
            throw error;
        }
    }


    /**
     * 
     * Login user
     * 
     * @param {Object} user 
     * @returns {object} 
     * 
     * res boolean of true or false
     */
    static async loginUser(user, password){
        try {
            const response = user && bcrypt.compareSync(password, user.password);
            return response ? true : false;
        } catch (error) {
            throw error
        }
    }

    static async generateAccessToken(_id){
        const accessToken =
            'Bearer ' +
            (await jwt.sign({ user: _id },
                process.env.PRIVATE_KEY
            ));
        return accessToken;
    }
}