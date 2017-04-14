/**
 * Created by user on 07.04.17.
 */

var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname)
    },

    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    }
});
var uploadFile = multer({ //multer settings
    storage: storage
}).single('file');


var image = {

        upload: function(req, res) {
            uploadFile(req, res, function (err) {
                if (err) {
                    console.log(err);
                    res.json({error_code: 1, err_desc: err});
                    return;
                }
                res.json({error_code: 0, err_desc: null});
            });

        }

};


module.exports = image;