const imagesDirectory = require('fs');
const multerpackage = require('multer');

const engine = multerpackage.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './images');

    }, filename: (req, file, cb) => {
        imagesDirectory.readdir('images', (err, files) => {
            if (err !== null) {
                console.error(err, 'Directory error !');
                cb(new Error('Directory error !'));
            }
            else {
                const prefix = 'post_';
                let date = Date.now();
                let extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];


                if (extensions.includes(file.mimetype.split('/')[1])) {

                    if (file.originalname.match(/[<>/;'{}]+/)) {
                        cb(new Error('You have to enter a valid file name !'));
                    }
                    else {
                        let newFilename = prefix + date + '.' + file.mimetype.split('/')[1];

                        cb(null, newFilename);
                    }
                }

                else if (!extensions.includes(file.mimetype.split('/')[1])) {

                    if (file.originalname.match(/[<>/;'{}]+/)) {
                        cb(new Error('You have to enter a valid file name !'));
                    }
                    else {
                        cb(new Error('You have to enter a valid file extension !'));
                    }
                }
            }
        });
    }
});
module.exports = multerpackage({
    storage: engine, limits: { fileSize: 5000000 }
}).single('image');
