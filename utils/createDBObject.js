async function createDBObject(model, vals, optional = {}) {
  return (
    new model({
      ...vals,
      ...optional
    })
  )
}

module.exports = createDBObject