const express = require('express')

const deleteMeal = express.Router()

//middleware
const vfyToken = require('../middleware/vfyToken')

const deleteSelectedMeal = require('../controller/deleteMeal_c')

deleteMeal.route('/').post(vfyToken, deleteSelectedMeal)

module.exports = deleteMeal

