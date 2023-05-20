self.addEventListener('install', function(event) {
    console.log("Install Event", event)
    // event.waituntil(self.skipWaiting())
    self.skipWaiting()
  });
  
  console.log('service worker loaded...')
  
  self.addEventListener('push', (e) => {
    console.log("Event: ", e)
    const data = e.data.json()
    self.registration.showNotification(data.title, {
      body: data.body,
      image: 'http://localhost:3000/notification/test.jpeg',
      icon: 'https://cdn-icons-png.flaticon.com/128/5208/5208892.png',
      badge: 'https://cdn-icons-png.flaticon.com/128/411/411776.png',
      actions: [
        {
          action: 'reply',
          type: 'text',
          title: 'OK',
          // icon: '/images/demos/action-5-128x128.png',
          placeholder: 'Type text here.',
        }
      ],
    })
  })
  
  // test code to redirect user to site on clicking on notification
  
  //browser push notification "onClick" event heandler
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();
  
    /**
     * if exists open browser tab with matching url just set focus to it,
     * otherwise open new tab/window with sw root scope url
     */
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      console.log("clientList: ", clientList)
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        console.log("CLIENT URL: ", client.url)
        console.log("SW SCOPE: ", self.registration.scope)
        if (client.url == self.registration.scope && 'focus' in client) {
          console.log("window already open")
          return client.focus();
        }
      }
      if (clients.openWindow) {
        console.log("new window opened")
        return clients.openWindow('/');
      }
    }));
  });