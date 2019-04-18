"use strict";
self.addEventListener('push', function(event) {
    event.waitUntil(
        Promise.all([
            self.registration.showNotification('Kruaa Messenger', {
               body: event.data.text(),
           })
        ])
    )
});
