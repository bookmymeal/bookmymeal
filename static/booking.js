const close_btn = document.getElementById('btn-close')
const open_btn = document.getElementsByTagName('svg')[0]
const logout_btn = document.getElementById('logout')

const navbar = document.getElementsByClassName('sidebar')[0]

close_btn.addEventListener('click', closeNav)
open_btn.addEventListener('click', openNav)
logout_btn.addEventListener('click', logout)

function closeNav(){
  navbar.style.display = 'none'
}

function openNav(){
  navbar.style.display = 'flex'
}

function logout(){
  window.location.pathname = '/logout'
}


// form javascript


const ele = document.getElementById("lunch_for");
const comment = document.getElementById("comment");

const form = document.getElementsByClassName('form')[0]

ele.addEventListener("change", disable);

function disable(e) {
  if (e.target.value == "self") {
    comment.setAttribute("disabled", "true");
  } else {
    comment.removeAttribute("disabled");
  }
}

const btn = document.getElementById("button");

// btn.addEventListener("click", active);
form.addEventListener("submit", active);

function active(e) {
  e.preventDefault()

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  // let userid = document.getElementById('userid').value
  let date = document.getElementById('date').value
  let meal_type = document.getElementById('meal_type').value
  let meal_location = document.getElementById('meal_location').value
  let lunch_for = document.getElementById('lunch_for').value
  let quantity = document.getElementById('quantity').value
  // let comment = document.getElementById('comment')
  let button = document.getElementById('button').value

  const getData = {
    // id: userid,
    date: date,
    meal: meal_type,
    location: meal_location,
    for: lunch_for,
    quantity: quantity,
    comment: comment.value
  }
  console.log(getData)
  fetch(
    '/booking',
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
      if (data.msg) {
        success(data.msg)
      } else {
        error(data.err)
      }
    })
    .catch(err => {
      console.log("ERROR", err)
      error(err)
    })
}

// response msg notification

// let success_banner = document.getElementsByClassName('msg_wrapper')[0]
// let error_banner = document.getElementsByClassName('msg_wrapper')[1]

let success_banner = document.getElementById('success')
let error_banner = document.getElementById('error')

function success(msg) {
  // reset form on sucessful submission
  form.reset()

  success_banner.classList.add("vis")
  success_banner.innerHTML = msg
  setTimeout(() => {
    console.log("hi")
    success_banner.classList.remove("vis")
  }, 3000)
}

function error(err) {
  // console.log("ok")
  error_banner.classList.add("vis")
  success_banner.innerHTML = err
  setTimeout(() => {
    console.log("hi")
    error_banner.classList.remove("vis")
  }, 5000)
}




