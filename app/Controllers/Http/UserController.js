'use strict'

const User = use('App/Models/User')


class UserController {
    async create({ request, response }) {
        const data = request.only(['username', 'email', 'password'])
        const email = request.only(['email'])
        const username = request.only(['username'])

        const emailTest = await User.findBy(email, 'email')
        const userTest = await User.findBy(username, 'username')


        if (emailTest) {
            return response.status(400).json({
                error: true,
                message: 'Email used by another user, please put a different one'
            })
        }

        if (userTest) {
            return response.status(400).json({
                error: true,
                message: 'username used by another user, please put a different one'
            })
        }

        const user = await User.create(data)

        return response.json({
            error: false,
            message: 'User created'
        })
    }

    async index({ request, response, auth }) {
        if (auth.user.username != 'admin') {
            return response.status(400).json({
                error: true,
                body: 'Not allowed!'
            })
        }

        const page = request.get().page || 1
        const limit = request.get().limit || 10

        const users = await User.query().paginate(page, limit)

        return response.send(users)
    }

    async show({ params, response, auth }) {

        const user = await User.findOrFail(params.id, ['username', 'email', 'created_at'])
        if (auth.user.id == params.id) {
            return response.json({
                error: false,
                user: user
            })
        }

        return response.json({
            error: false,
            message: 'An error has ocurred, you are not allowed to access another users data'
        })
    }

    async update({ params, response, auth }) {
        const user = await User.findOrFail(params.id)

        if (user) {
            if (auth.user.id == params.id || auth.user.id == '12') {
                return response.json(user)
            }

            return response.status(400).send('lol')
        }
    }

    async delete({ params, response, auth }) {
        const user = await User.findOrFail(params.id)

        if (user) {
            if (auth.user.id == user.id || auth.user.id == '12') {
                if (await user.delete()) {
                    return response.json({
                        error: false,
                        message: 'You are not here'
                    })
                }

                return response.status(400).json({
                    error: true,
                    message: 'An error has ocurred'
                })
            }

            return response.status(401).json({
                error: true,
                message: 'You have not permission to do this'
            })
        }

        return response.status(400).json({
            error: true,
            message: 'An error has ocurred, try again in few minutes.'
        })

    }


}

module.exports = UserController