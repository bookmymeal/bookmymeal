// send notification btn

const btn = document.getElementsByTagName('button')[3]

btn.addEventListener('click', sendNotification)

function sendNotification() {
  btn.classList.add("active");
  setTimeout(() => {
    btn.classList.remove("active");
  }, 200);

  console.log('btn clicked')
  fetch("/notification/sendNotification", {
    method: 'get'
  })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

// subsribe button 

const subBtn = document.getElementsByTagName('button')[1]

subBtn.addEventListener('click', subscribeForNotification)

function subscribeForNotification() {
  subBtn.classList.add("active");
  setTimeout(() => {
    subBtn.classList.remove("active");
  }, 200);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/notification/sw.js', { scope: '/notification/' })
      .then(registration => {
        registration.pushManager.getSubscription()
          .then(subscription => {
            if (subscription) {
              stat.textContent = "Already Subscribed"
              console.log("Aleady subscribed")
            } else {
              registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BFTzVEFngBWKg6-NMR_QiHUR7nm1NbPACSHUDYMzHQ9nJeKcAcRPc8aRNJwiby8MEwEyuB7dYOp3DGi4leAC1U0'
              })
                .then(pushObject => {
                  console.log(JSON.stringify(pushObject))
                  fetch('/notification/subscribe', {
                    method: "post",
                    body: JSON.stringify(pushObject),
                    headers: {
                      'content-type': 'application/json'
                    }

                  })
                    .then(msg => msg.json())
                    .then(data => {
                      console.log("DATA", data)
                      console.log("subscribed")
                      stat.textContent = "Subscribed"
                    })
                    .catch(err => console.log(err))
                    
                })
                .catch(err => console.log("Error: ", err))
            }
          })
      })
  }

}

// unsubscribe
const unSubBtn = document.getElementsByTagName('button')[2]

unSubBtn.addEventListener('click', un_subscribe)

function un_subscribe() {

  unSubBtn.classList.add("active");
  setTimeout(() => {
    unSubBtn.classList.remove("active");
  }, 200);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      console.log('List of installed service workers:', registrations);
      registrations[0].pushManager.getSubscription()
        .then(subscription => {
          if (subscription) {
            subscription.unsubscribe().then(() => {
              stat.textContent = "Not-Subscribed"
              console.log('User has been unsubscribed from push notifications.');
            }).catch(error => {
              console.error('Error unsubscribing from push notifications:', error);
            });
          } else {
            console.log('You are not subscribed')
          }
        })
    }).catch(error => {
      console.error('Error getting list of service workers:', error);
    });
  }
}

// on loading check and update status on staus field

const stat = document.getElementsByTagName('span')[1]

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('List of installed service workers:', registrations);
    registrations[0].pushManager.getSubscription()
      .then(subscription => {
        if (subscription) {
          stat.textContent = "Subscribed"
        } else {
          stat.textContent = "Not-Subscribed"
          console.log('You are not subscribed')
        }
      })
  }).catch(error => {
    stat.textContent = "Not-Subscribed"
    console.error('Error getting list of service workers:', error);
  });
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