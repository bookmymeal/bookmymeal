let btn = document.getElementById("btn");
let table = document.getElementById("table");

btn.addEventListener("click", trueFetch);

function trueFetch(e) {
  // console.log("hellow")

  clearPage(table)
  addTable()

  // press button effect
  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  // fetch data

  getData = {
    from: document.getElementById('from').value,
    to: document.getElementById('to').value,
    user: document.getElementById('user').value
  }

  fetch('/search',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getData)
    })
    .then((res) => {
      // console.log(res)
      return res.json()
    })
    .then((data) => {
      // console.log("DATA", data)

      if (data.length) {
        data.forEach((val, index) => {
          const block = val
          const number = index + 1
          let tr = document.createElement("tr");

          let srno = document.createElement("td");
          let date = document.createElement("td");
          let userid = document.createElement("td");
          let meal = document.createElement("td");
          let four = document.createElement("td");
          let quantity = document.createElement("td");
          let location = document.createElement("td");
          let comment = document.createElement("td");
          let firstname = document.createElement("td");
          let lastname = document.createElement("td");

          const person = [
            srno, date, userid, firstname, lastname, meal, four, quantity, location, comment
          ]

          person.forEach((val) => {
            srno.innerText = number
            date.innerText = block.date;
            userid.innerText = block.id
            meal.innerText = block.meal
            four.innerText = block.for
            quantity.innerText = block.quantity
            location.innerText = block.location
            comment.innerText = block.comment
            firstname.innerText = block.firstname
            lastname.innerText = block.lastname
          })

          location.classList.add("special");
          comment.classList.add("special");

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
function clearPage(table) {
  let err = document.getElementsByClassName("error")[0];
  let nodata = document.getElementsByClassName("nodata")[0];
  if (err) err.remove();
  if (nodata) nodata.remove()
  let gettable = document.getElementsByTagName('table')[0];
  gettable.remove();

}

function addTable() {
  let newTable = document.createElement("table");
  // document.body.appendChild(newTable);
  document.getElementById('table-wrapper').appendChild(newTable)
  let table = document.getElementsByTagName("table")[0];

  let newTr = document.createElement("tr");
  table.appendChild(newTr);
  let tr = document.getElementsByTagName("tr")[0];
  // console.log(table);

  const head = ["Sr.No.", "Booking Date", "USER ID", "First Name", "Last Name", "Meal", "Booking For", "Quantity", "Location", "Comment"];

  head.forEach((val) => {
    let th = document.createElement("th");
    th.innerText = val;
    tr.appendChild(th);
  });

}

// export data to excel

function exportExcel() {
  // press button effect
  exportBtn.classList.add("active");
  setTimeout(() => {
    exportBtn.classList.remove("active");
  }, 200);
  console.log("test");

  getData = {
    from: document.getElementById('from').value,
    to: document.getElementById('to').value,
    user: document.getElementById('user').value
  }

  fetch(
    '/search',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getData)
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

      /* fix headers */
      // XLSX.utils.sheet_add_aoa(worksheet, [["One", "Two", "Three"]], {
      //   origin: "A1"
      // });

      /* create an XLSX file and try to save to Presidents.xlsx */
      XLSX.writeFile(workbook, `BMM ${new Date()}.xlsx`, { compression: true });
    });
}

const exportBtn = document.getElementById("export");

exportBtn.addEventListener("click", exportExcel);


// adding delete functionality --> function related to select btn

const selectBtn = document.getElementById('select')
const selectAllBtn = document.getElementById('selectAll')
const deleteBtn = document.getElementById('delete')

selectBtn.addEventListener('click', () => {
  
  selectBtn.classList.add("active");
  setTimeout(() => {
    selectBtn.classList.remove("active");
  }, 200);

  console.log('select')
  const rows = document.getElementsByTagName('table')[0]
  const count = document.getElementsByTagName('table')[0].children.length
  if (selectAllBtn.style.display === 'none') {
    console.log('set display visible')
    selectAllBtn.style.display = 'inline'
    deleteBtn.style.display = 'inline'
  } else {
    console.log('set display none')
    selectAllBtn.style.display = 'none'
    deleteBtn.style.display = 'none'

    // remove checkboc when select button is pressed again

    for (let box = 1; box <= count; box++) {
      document.querySelector('input[type=checkbox]').remove()
    }

  }

  // check for checkbox element if not then add
  if (rows.children[1].lastChild.getAttribute('type') !== 'checkbox') {
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

  selectAllBtn.classList.add("active");
  setTimeout(() => {
    selectAllBtn.classList.remove("active");
  }, 200);
  
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

  deleteBtn.classList.add("active");
  setTimeout(() => {
    deleteBtn.classList.remove("active");
  }, 200);

  var ids = []
  const selectedItems = document.querySelectorAll('input[type=checkbox]').length

  for (let i = 0; i <= selectedItems - 1; i++) {
    if (document.querySelectorAll('input[type=checkbox]')[i].checked) {
      let id = document.querySelectorAll('input[type=checkbox]')[i].parentElement.getAttribute('id')
      ids.push(id)
    }
  }
  console.log(ids)
  fetch('/delete', {
    method: "POST",
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

// navbar 

const close_btn = document.getElementById('btn-close')
const open_btn = document.getElementsByTagName('svg')[0]
const logout_btn = document.getElementById('logout')

const navbar = document.getElementsByClassName('sidebar')[0]

close_btn.addEventListener('click', closeNav)
open_btn.addEventListener('click', openNav)
logout_btn.addEventListener('click', logout)

document.addEventListener('click', closeNav)

function closeNav(){
  // console.log('close')
  navbar.style.display = 'none'
}

function openNav(e){
  e.stopPropagation()
  // console.log('open')
  navbar.style.display = 'flex'
}

function logout(){
  window.location.pathname = '/logout'
}