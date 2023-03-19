const express = require('express')

const search = express.Router()

//middleware
const vfyToken = require('../middleware/vfyToken')

const {sendSearchPage, getSearchResult} = require('../controller/search_c.js')

search.route('/').get(vfyToken, sendSearchPage).post(vfyToken, getSearchResult)

module.exports = search