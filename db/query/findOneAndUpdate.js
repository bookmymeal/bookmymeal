function findOneAndUpdate(schema, query, body) {
  return new Promise((resolve, reject) => {
    schema.findOneAndUpdate(query, body, { returnDocument: 'after' }, function(err, update) {
      console.log(query)
      if (err) {
        reject(err)
      } else {
        resolve(update)
      }
    })
  })
}

module.exports = findOneAndUpdate