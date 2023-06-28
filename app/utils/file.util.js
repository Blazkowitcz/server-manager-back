const doc = ['.docx', '.doc'];
const pdf = ['.pdf'];
const video = ['.mkv', '.avi', '.mp4'];
const archive = ['.zip', '.rar', '.7zip', '.tar', '.tar.gz'];
const image = ['.jpg', '.png', '.jpeg'];
const extensions = require('../../config.json').extensions;
/**
 * Check File type
 * @param {String} filename 
 */
async function checkFileExtension(filename){
    for(const extension of extensions){
        if(await containsAny(filename, extension.extension)){
            return extension.name;
        }
    }
    // if(await containsAny(filename, doc)){ return 'document';}
    // if(await containsAny(filename, pdf)){ return 'pdf';}
    // if(await containsAny(filename, video)){ return 'video';}
    // if(await containsAny(filename, archive)){ return 'archive';}
    // if(await containsAny(filename, image)){ return 'image';}
    return 'unknow';
}

/**
 * Check if file extension exist in array
 * @param {String} str 
 * @param {Array} substrings 
 * @returns 
 */
async function containsAny(str, substrings) {
    for (var i = 0; i !== substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) !== - 1) {
         return true;
       }
    }
    return false; 
}

module.exports = {checkFileExtension};