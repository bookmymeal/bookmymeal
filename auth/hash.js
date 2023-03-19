const bc = require('bcryptjs')


const genSalt = () => {
  return new Promise((resolve, reject) => {
    const salt = bc.genSalt(10, function (err, salt) {
      if(err){
        reject(err)
      }else{
        resolve(salt)
      }
    })
  })
}

const genHash = (salt, password) => {
  console.log(password)
  return new Promise((resolve, reject) => {
    const hash = bc.hash(password, salt, function (err, hash) {
      if(err){
        reject(err)
      }else{
        resolve(hash)
      }
    })
  })
}

// as per documatation if callback is omited then bc.compare returns promise
// that's why promise is not required to be retrun like functions above

const vfyHash = (password, hash) => {
  return bc.compare(password, hash)
}

module.exports = {genSalt, genHash, vfyHash}