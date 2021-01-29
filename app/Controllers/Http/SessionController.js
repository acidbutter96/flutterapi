'use strict'

const User = require("../../Models/User")

class SessionController {
    async create({request,auth}){
        const {email, password} = request.all()
        const token = await auth
            .attempt(email,password)

        return token
    }

    async destroy({request,auth}){
        const token = await auth.logout()
        return token
    }
}

module.exports = SessionController
