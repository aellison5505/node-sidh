const { copyFileSync, readdirSync, existsSync, mkdirSync} = require('fs');

let main = async () => {
   // await copyFile();
   try{
    if(!existsSync('lib'))
        mkdirSync('lib');
   let files = readdirSync('build/Release');
   files.forEach((item) => {
       console.log(item);
        copyFileSync(`build/Release/${item}`,`lib/${item}`);
   });
    } catch (err) {
        console.log('No files to move');
    }
};
main();