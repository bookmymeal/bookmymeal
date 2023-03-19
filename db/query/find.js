function find(schema, query) {
  return new Promise((resolve, reject) => {
    schema.find(query, function(err, data) {
      console.log(query)
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

module.exports = find