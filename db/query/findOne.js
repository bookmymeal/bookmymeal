function findOne(schema, query) {
  return new Promise((resolve, reject) => {
    schema.findOne(query, function(err, data) {
      console.log("findOne Query:", query)
      if (err) {
        reject(err)
      } else if (data) {
        resolve(data)
      } else {
        resolve(null)
      }
    })
  })
}

module.exports = findOne