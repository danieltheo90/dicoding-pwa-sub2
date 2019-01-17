var dbPromised = idb.open('team', 1, upgradeDb => {
  var teamObjectStore = upgradeDb.createObjectStore('teamFav', {
    keyPath: 'id'
  });
  teamObjectStore.createIndex('namaTeam', 'name', { unique: false});
});

function saveFavoriteTeam(data) {
  dbPromised.then(function(db) {
      var tx = db.transaction('teamFav', 'readwrite');
      var store = tx.objectStore('teamFav');
      var dataSave = {  
              id: data.id,
              name: data.name,
              address: data.address,
              website: data.website,
              email: data.email,
              crestUrl : data.crestUrl,

        };
       tx.objectStore('teamFav').put(dataSave);
        return tx.complete;
  }).then(function() {
      //console.log('Team Favorit berhasil disimpan.');
       var title = `Save to favorite  ${data.name}`;
            var options = {
                'body': `${data.name} ${data.email}`
            }
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification(title, options);
                });
            } else {
                console.error('FItur notifikasi tidak diijinkan.');
            }
  }).catch(function(err) {
      console.log(err);
  })
}

function cekDataTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
                var tx = db.transaction('teamFav', "readonly");
                var store = tx.objectStore('teamFav');
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve(true)
                }else {
                  reject(false);
                }
            });
    });
}

function deleteFavoriteTeam(data) {
   dbPromised.then(function(db) {
      var tx = db.transaction('teamFav', 'readwrite');
      var store = tx.objectStore('teamFav');
      
      store.delete(data);
      return tx.complete;
  }).then(function() {
     var title = `Succes Delete Favorit`;
        
      if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification(title);
          });
      } else {
          console.error('FItur notifikasi tidak diijinkan.');
      }
  }).catch(function(err) {
      console.log(err);
  })
}

function getAllDataFavorit() {
  return new Promise(function (resolve, reject) {
      dbPromised
          .then(function (db) {
              var tx = db.transaction('teamFav', "readonly");
              var store = tx.objectStore('teamFav');
              return store.getAll();
          })
          .then(function (data) {
              resolve(data);
          });
  });
}