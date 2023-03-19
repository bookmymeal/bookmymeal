let form = document.getElementsByTagName("form")[0];

let btn = document.getElementsByTagName("button")[0];

form.addEventListener("submit", resetPwd);
// btn.addEventListener("click", resetPwd);

function resetPwd(e) {
  e.preventDefault();

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  const getData = {
    password: document.getElementsByTagName("input")[0].value
  };
  fetch(`/resetPwd${window.location.search}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(getData)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)

    if(document.getElementsByClassName('msg_wrapper')[0]){
      return
    }
    
    if(data.msg){
      element('msg', data.msg)
      setTimeout(removeEle, 5000)
    }else {
      element('err', data.err)
      setTimeout(removeEle, 5000)
    }
  })
  .catch(err => console.log(err))
}


// notification response

function element(id, value){
  let wrapper = document.createElement('div')
  wrapper.classList.add('msg_wrapper')
  wrapper.classList.add('vis')
  document.body.append(wrapper)

  let main = document.getElementsByClassName('msg_wrapper')[0]

  let child = document.createElement('div')
  child.setAttribute('id', id)
  child.innerText = value

  main.appendChild(child)
}

function removeEle(){
  let ele = document.getElementsByClassName('msg_wrapper')[0]
  console.log("Remove", ele)
  ele.remove()
}