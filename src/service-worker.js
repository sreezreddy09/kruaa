"use strict";

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
self.addEventListener('push', function(event) {
    event.waitUntil(
        Promise.all([
            self.registration.showNotification('Kruaa Messenger', {
               body: event.data.text(),
            //    icon: '/lib/images/icon.png',
               badge: '/lib/images/badge.png',
               data : "Hello"
           })
        ])
    )
});

self.addEventListener("activate", async (event) => {
    console.log("Inside activate event listener");
    let options = {
        "applicationServerKey" : urlB64ToUint8Array("BOVlM6LHcVtS4di5jYsGLEI1KQcmlx4L-LJn-9q_Jo5z8aZx8RP6aiIA4nIjofslpxSJmmvi5SBb7zqul-muTjY"),
        "userVisibleOnly" : true
    };

    // let subscription = await self.registration.pushManager.subscribe(options);
    // console.log(JSON.stringify(subscription));

});


self.addEventListener("enablePush", function (event) {
    console.log("Inside Enable Push service Worker");
});


self.addEventListener("disablePush", function (event) {
    console.log("Inside Disable Push service Worker");
});

//self.registration.pushmanager.getSubscriptions 
//self.registrations.pushmanager.