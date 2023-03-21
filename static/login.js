let btn = document.getElementsByClassName("btn")[0];

let userField = document.getElementsByClassName('username')[0]
let passField = document.getElementsByClassName('password')[0]

let form = document.getElementsByClassName('form')[0]

// btn.addEventListener("click", fetchData);

form.addEventListener("submit", fetchData);

// function active(e) {
//   btn[0].classList.add("active");
//   setTimeout(() => {
//     btn[0].classList.remove("active");
//   }, 200);
// }

function fetchData(e){
  e.preventDefault()

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  const getData = {
    id : document.getElementsByClassName('user-input')[0].value,
    password : document.getElementsByClassName('pass-input')[0].value
  }

  fetch(
    '/login',
    {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(getData)
    }
  )
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    if(data.redirect){
      window.location.href = data.redirect
    }
    if(data.userErr){
      if(document.getElementsByClassName('err')[0]){
        return
      }else{
        console.log("User: ", data.userErr)
        let err = document.createElement('div')
        err.innerText = data.userErr
        err.classList.add('err')
        userField.append(err)
        // console.log(userField)
      }

    }
    if(data.passErr){
      if(document.getElementsByClassName('err')[0]){
        return
      }else{
        console.log("Pass", data.passErr)
        let err = document.createElement('div')
        err.innerText = data.passErr
        err.classList.add('err')
        passField.append(err)
        // console.log(userField)
      }
    }
    if(data.verified){
      if(document.getElementsByClassName('err')[0]){
        return
      }else{
        console.log("verification", data)
        let err = document.createElement('div')
        err.innerText = data.verified
        err.classList.add('err')
        btn.insertAdjacentElement('afterend', err)
        // console.log(userField)
      }
    }
  })

}

// error block cleaning function

let userIpt = document.getElementsByClassName('user-input')[0]
let passIpt = document.getElementsByClassName('pass-input')[0]

userIpt.addEventListener('input', clearErr)
passIpt.addEventListener('input', clearErr)

function clearErr(){
  let errBlock = document.getElementsByClassName('err')[0]
  if(errBlock){
    errBlock.remove()
  }
}
