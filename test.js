const
  fs = require('fs'),
  path = require('path'),
  os = require('os');

fs.writeFile(path.resolve(os.tmpdir(),'test.js'), 'source',function(err){
    if(err) {
      console.log(path.resolve(os.tmpdir(),'test.js'))
    }else{
      console.log(path.resolve(os.tmpdir(),'test.js'))
    }
});
