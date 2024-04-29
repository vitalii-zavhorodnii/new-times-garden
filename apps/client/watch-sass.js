// watch-sass.js
const chokidar = require('chokidar');
const sass = require('sass');
const fs = require('fs');

const watcher = chokidar.watch('src/**/*.scss'); // Отслеживание всех файлов с расширением .scss в папке styles

const compileSass = () => {
    sass.render({
        file: 'src/main.scss',
        outFile: 'public/css/main.css',
        sourceMap: true,
        outputStyle: 'compressed'
    }, function(error, result) {
        if (!error) {
            fs.writeFile('public/css/main.css', result.css, function(err){
                if(!err){
                    console.log('🚀 Sass compiled successfully!');
                }
            });
        } else {
            console.error(error);
        }
    });
};

watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    compileSass();
});

console.log('Watching for changes in Sass files...');
