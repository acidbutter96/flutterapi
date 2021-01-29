'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// User
Route.post('v1/users', 'UserController.create')
Route.get('v1/users', 'UserController.index')
  .middleware('auth')
Route.get('v1/users/:id', 'UserController.show')
  .middleware('auth')
Route.put('v1/users/:id', 'UserController.update')
  .middleware('auth')
Route.delete('v1/users/:id', 'UserController.delete')
  .middleware('auth')


// Session 
Route.post('v1/sessions', 'SessionController.create')
Route.get('v1/sessions', 'SessionController.destroy')
  .middleware('auth')

//Content
Route.resource('contents', 'ContentController')
  .apiOnly()
  .middleware('auth')
Route.get('v1/contents', 'ContentController.index')
  .middleware('auth')
Route.post('v1/contents', 'ContentController.store')
  .middleware('auth')
Route.put('v1/contents/:id', 'ContentController.update')
  .middleware('auth')

Route.post('v1/contents/:id/images', 'ImageController.store')
  .middleware('auth')
