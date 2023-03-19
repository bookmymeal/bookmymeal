let btn = document.getElementsByClassName("btn")[0];
let form = document.getElementsByTagName('form')[0]

form.addEventListener("submit", active);

function active(e) {
  e.preventDefault()

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);
  
  const getData = {
    firstname: document.getElementsByName('firstname')[0].value,
    lastname: document.getElementsByName('lastname')[0].value,
    email: document.getElementsByName('email')[0].value,
    id: document.getElementsByName('userid')[0].value,
    password: document.getElementsByName('password')[0].value
  }

  fetch(
    '/register',
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
    if(document.getElementsByClassName('msg_wrapper')[0]){
      return
    }
    console.log(data)
    if(data.send){
      console.log('data.send', data.send)
      element('div', 'msg_wrapper', data.send)
      setTimeout(removeEle, 5000)
      
    }else if(data.pending){
      console.log('data.pending', data.pending)
      element('div', 'msg_wrapper', data.pending)
      setTimeout(removeEle, 5000)
    }else{
      console.log('exist', data.exist)
      element('div', 'msg_wrapper', data.exist)
      setTimeout(removeEle, 5000)
    }
  })
}

// notification response

function element(type, cls, value){
  let wrapper = document.createElement(type)
  wrapper.classList.add(cls)
  wrapper.classList.add('vis')
  document.body.append(wrapper)

  let main = document.getElementsByClassName(cls)[0]

  let child = document.createElement(type)
  child.setAttribute('id', 'success')
  child.innerText = value

  main.appendChild(child)
}

function removeEle(){
  let ele = document.getElementsByClassName('msg_wrapper')[0]
  console.log("Remove", ele)
  ele.remove()
}

