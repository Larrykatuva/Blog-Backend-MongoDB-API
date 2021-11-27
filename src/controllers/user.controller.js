import { UserControllerHelper as User } from "../helpers";
import { EmailUtil } from "../utils";
import { UserCache } from "../cache";
import createError from "http-errors";
import { handleUserErrors } from "../errors/user.errors";
// import redis from 'redis';

// make a connection to the local instance of redis
// const client = redis.createClient(6379);
var client = require('redis').createClient(6379);
client.on("error", (error) => {
    console.error(error);
});


export class UserController{

    static async registerUser(req, res, next){
        const {
            body: { username, email, password, phone }
        } = req;
        if(!username || !email || !password || !phone){
            return res 
                .status(400)
                .send(handleUserErrors('USR_02', 400, 'fields'))
        }
        try {
            const exists = await User.findUserByEmail(email)
            if(exists){
                return res
                    .status(400)
                    .send(handleUserErrors('USR_04', 400, 'email'));
            }
            UserCache.getClient()
            const code = Math.floor(Math.random() * (9999 - 999 + 1)) + 999;
            await EmailUtil.sendActivationMail(email, code);
            const user = await User.registerUser({username, email, password, phone})
            if(user){
                return res 
                    .status(201)
                    .send(user)
            }
        } catch (error) {
            next({
                data: createError(
                    error.status,
                    error.message
                )
            });
        }
    }

    static async loginUser(req, res, next){
        const {
            body: { email, password}
        } = req;
        if(!email || !password){
            return res 
                .status(400)
                .send(handleUserErrors('USR_02', 400, 'fields'))
        }
        try {
            const exists = await User.findUserByEmail(email)
            if(!exists){
                return res 
                    .status(400)
                    .send(handleUserErrors('USR_05', 400, 'email'))
            }
            const user = await User.loginUser(exists, password)
            if(!user){
                return res 
                    .status(400)
                    .send(handleUserErrors('USR_01', 400, 'password'))
            }
            const token = await User.generateAccessToken(exists._id)
            return res
                .status(200)
                .send({user: exists, accessToken: token})
        } catch (error) {
            next({
                data: createError(
                    error.status,
                    error.message
                )
            });
        }
    }
}