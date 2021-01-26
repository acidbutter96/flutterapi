"use strict"

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

/** @type {typeof import("@adonisjs/framework/src/Route/Manager")} */
const Route = use("Route")

// User
Route.post("v1/user","UserController.create" )


// Session 
Route.post("v1/sessions","SessionController.create")

//Content
/* Route.resource("contents","ContentController")
    .apiOnly()
    .middleware("auth") */

Route.post("v1/contents", "ContentController.store")

Route.post("v1/contents/:id/images", "ImageController.store")
  .middleware("auth")
