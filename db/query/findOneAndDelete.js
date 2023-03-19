function findOneAndDelete(schema, query) {
  return new Promise((resolve, reject) => {
    schema.findOneAndDelete(query, function(err, deleted) {
      if (err) {
        reject(err)
      } else {
        console.log("deleted", deleted)
        resolve(deleted)
      }
    })
  })
}

module.exports = findOneAndDelete