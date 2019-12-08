var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'O0Kmh-NPOGAAAAAAAAAAES9IZfyylCRrDdK5MlbYIHq0OSrll7b1896epL-EAnzk'});

dbx.filesListFolder({path: ''})
  .then(files => {
    files.entries.forEach(elem => {
      console.log(elem);
    })
  })
  .catch(error => console.log('error - 1 - ', error ));


// response.entries[0].id.replace('id:', '')
// console.log('idddddd - ', files.entries[0].id.replace('id:', ''))


// dbx.fileRequestsGet({id: 'Nm2-G-XqX2AAAAAAAAAAFA'})
//   .then(file => console.log('file - ', file))
//   .catch(err => console.log('err.message --------- ', err));
// })


// dbx.fileRequestsDelete({ids: [response.entries[0].id.replace('id:', '')]})
//   .then(console.log)
//   .catch(console.log);
