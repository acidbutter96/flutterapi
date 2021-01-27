'use strict'

const User = use("App/Models/User")


class UserController {
    async create({ request }) {
        const data = request.only(["username", "email", "password"])
        const user = await User.create(data)

        return user
    }

    async index({ request, response }) {
        const data = await User.all()

        if (data) return response.status(200).json({
            error: false,
            users: data
        })

        return response.status(400).json({
            error: true,
            code: 110
        })
    }
}

module.exports = UserController