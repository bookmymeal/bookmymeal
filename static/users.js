let btn = document.getElementById("btn");
let table = document.getElementById("table");

btn.addEventListener('click', fetchData)

function fetchData(e) {
  e.preventDefault()
  clearPage(table)
  addTable()

  // press button effect

  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  data = {
    user: document.getElementById('user').value
  }

  fetch('/users', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.length) {
        data.forEach((val, index) => {
          const block = val
          const number = index + 1
          let tr = document.createElement("tr");

          let srno = document.createElement("td");
          let userid = document.createElement("td");
          let firstname = document.createElement("td");
          let lastname = document.createElement("td");
          let role = document.createElement("td");
          let joined = document.createElement("td");
          let status = document.createElement("td");

          const person = [srno, userid, firstname, lastname, role, joined, status]

          person.forEach((val) => {
            srno.innerText = number
            userid.innerText = block.id
            firstname.innerText = block.firstname
            lastname.innerText = block.lastname
            role.innerText = block.role
            joined.innerText = block.joined.split('T')[0]
            status.innerText = block.verifiedbyadmin
          })

          person.forEach(val => {
            // console.log("line", val)
            tr.setAttribute('id', block._id)
            tr.appendChild(val)
          })

          document.getElementsByTagName("table")[0].appendChild(tr);
          // console.log(tr);
        });
      } else {
        let nodata = document.createElement("div");
        nodata.classList.add("nodata");
        nodata.innerText = "No Data Found";
        document.body.appendChild(nodata);

      }
    })
    .catch((err) => {
      console.log(err);
      let error = document.createElement("div");
      error.classList.add("error");
      error.innerText = "Error occured";
      document.body.appendChild(error);
    });
}


// clearing error msg and old data before fetching new data
function clearPage() {
  let err = document.getElementsByClassName("error")[0];
  let nodata = document.getElementsByClassName("nodata")[0];
  if (err) err.remove();
  if (nodata) nodata.remove()
  let gettable = document.getElementsByTagName('table')[0];
  gettable.remove();

}

function addTable() {
  let newTable = document.createElement("table");
  document.body.appendChild(newTable);
  let table = document.getElementsByTagName("table")[0];

  let newTr = document.createElement("tr");
  table.appendChild(newTr);
  let tr = document.getElementsByTagName("tr")[0];
  // console.log(table);

  const head = ['Sr.No.', 'User ID', "First Name", 'Last Name', 'Role', "Joined", "Status"]

  head.forEach((val) => {
    let th = document.createElement("th");
    th.innerText = val;
    tr.appendChild(th);
  });

}

// adding delete functionality --> function related to select btn

const selectBtn = document.getElementById('select')
const selectAllBtn = document.getElementById('selectAll')
const deleteBtn = document.getElementById('delete')

selectBtn.addEventListener('click', () => {
  console.log('select')
  const rows = document.getElementsByTagName('table')[0]
  const count = document.getElementsByTagName('table')[0].children.length
  if (selectAllBtn.style.display === 'none') {
    console.log('set display visible')
    selectAllBtn.style.display = 'inline'
    deleteBtn.style.display = 'inline'
    vfyBtn.style.display = 'inline'
  } else {
    console.log('set display none')
    selectAllBtn.style.display = 'none'
    deleteBtn.style.display = 'none'
    vfyBtn.style.display = 'none'

    // remove checkboc when select button is pressed again
    if (rows.children[1].lastChild.nodeName === 'INPUT') {
      for (let box = 1; box <= count; box++) {
        document.querySelector('input[type=checkbox]').remove()
      }
    }


  }

  // check for checkbox element if not then add
  if (rows.children[1].lastChild.nodeName !== 'INPUT') {
    for (let row = 1; row <= count; row++) {
      const checkBox = document.createElement('input')
      checkBox.setAttribute('type', 'checkbox')
      rows.children[row].appendChild(checkBox)
    }
  }

})

// select all btn
var click = true
selectAllBtn.addEventListener('click', () => {

  // var click = true why this not update if I define here??
  console.log('Global click', click)

  console.log("Selecta All Btn clicked")
  var table = document.getElementsByTagName('table')[0]
  var checkbox = table.querySelectorAll('input[type=checkbox]').length
  console.log("All checkBox", checkbox)

  if (click) {
    console.log("checking all box")
    for (let row = 0; row < checkbox; row++) {
      document.querySelectorAll('input[type=checkbox]')[row].setAttribute('checked', true)
    }
    click = false
    console.log('updated click', click)
    document.getElementById('selectAll').innerHTML = "Unselect All"
  } else {
    console.log("UN-CHECKING BOX", click)
    for (let row = 0; row < checkbox; row++) {
      document.querySelectorAll('input[type=checkbox]')[row].removeAttribute('checked')
    }
    click = true
    console.log('updated click', click)
    document.getElementById('selectAll').innerHTML = "Select All"
  }

})

// DELETE Btn 
deleteBtn.addEventListener('click', deleteItems)

function deleteItems() {
  var ids = []
  const selectedItems = document.querySelectorAll('input[type=checkbox]').length

  for (let i = 0; i <= selectedItems - 1; i++) {
    if (document.querySelectorAll('input[type=checkbox]')[i].checked) {
      let id = document.querySelectorAll('input[type=checkbox]')[i].parentElement.getAttribute('id')
      ids.push(id)
    }
  }
  console.log(ids)
  fetch('/users', {
    method: "delete",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: ids })
  })
    .then(res => res.json())
    .then(data => {
      const event = new Event('click', { bubbles: true, cancelable: true })
      document.getElementById("btn").dispatchEvent(event);
      console.log(data)
    })
    .catch(err => console.log(err))

}

// export data to excel

function exportExcel() {
  console.log("test");

  data = {
    user: document.getElementById('user').value
  }

  fetch(
    '/users',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");


      XLSX.writeFile(workbook, `BMM users ${new Date()}.xlsx`, { compression: true });
    });
}

const exportBtn = document.getElementById("export");

exportBtn.addEventListener("click", exportExcel);


// adding user verification by admin -> approve Btn

const vfyBtn = document.getElementById('verify')

vfyBtn.addEventListener('click', approveUsers)

function approveUsers() {
  var ids = []
  const selectedItems = document.querySelectorAll('input[type=checkbox]').length

  for (let i = 0; i <= selectedItems - 1; i++) {
    if (document.querySelectorAll('input[type=checkbox]')[i].checked) {
      let id = document.querySelectorAll('input[type=checkbox]')[i].parentElement.getAttribute('id')
      ids.push(id)
    }
  }
  console.log(ids)
  fetch('/vfyAccount', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: ids })
  })
    .then(res => res.json())
    .then(data => {
      const event = new Event('click', { bubbles: true, cancelable: true })
      document.getElementById("btn").dispatchEvent(event);
      console.log(data)
    })
    .catch(err => console.log(err))

}