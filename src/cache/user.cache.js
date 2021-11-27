
export class UserCache{
    
    static getClient(){
        var client = require('redis').createClient(6379);
        client.on("error", error => {
            console.log(error)
        })
        client.on("connect", connect => {
            console.log("connected")
        })
        console.log("refused")
    }
}