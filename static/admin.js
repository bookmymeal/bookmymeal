const removeBtn = document.getElementsByTagName('button')[0]
const addBtn = document.getElementsByTagName('button')[1]

removeBtn.addEventListener("click", changeAdmin);
addBtn.addEventListener("click", changeAdmin);

function changeAdmin(e) {

  const btn = e.target;
  var url = null

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  const getData = {
    id: document.getElementsByTagName("input")[0].value,
    pwd: document.getElementsByTagName("input")[1].value
  };

  console.log('OBJECT', getData)

  if (btn.id === 'removeBtn') {
    url = '/removeAdmin'
  }
  if (btn.id === 'addBtn') {
    url = '/createAdmin'
  }

  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(getData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        success(data.msg)
      } else {
        error(data.err)
      }
    })

  console.log('url', url)

}


// response msg notification



function success(val) {
  let success_banner = document.getElementById('success')
  success_banner.innerText = val
  success_banner.classList.add("vis")
  setTimeout(() => {
    console.log("hi")
    success_banner.classList.remove("vis")
  }, 3000)
}

function error(val) {

  let error_banner = document.getElementById('error')
  error_banner.innerText = val
  error_banner.classList.add("vis")
  setTimeout(() => {
    console.log("hi")
    error_banner.classList.remove("vis")
  }, 5000)
}
