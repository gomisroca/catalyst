import * as path from "path";
import * as fs from "fs";

interface FormFile {
    filepath: string;
    mimetype: string;
    size: number;
}
export default function uploadImage(type: string, file: FormFile, id: string): string {
    console.log(file)
    const filepath = file.filepath;
    const mimetype = file.mimetype;
    const filesize = file.size;
    const maxSize = 1024 * 1024 * 5;
    if(!mimetype?.startsWith("image")){
        throw new Error(`File is not an image.`); 
    }
    if(filesize > maxSize){
        throw new Error(`File is larger than 5 MB.`)
    }

    let imageName = `${id}.${mimetype.split('/')[1]}`;
    let newPath = path.join("public", type);
    if (!fs.existsSync(newPath)){
        fs.mkdirSync(newPath, { recursive: true });
    }
    newPath = path.join(newPath, imageName)
    fs.copyFileSync(filepath, newPath);
    let relativePath = path.join(type, imageName);
    return relativePath;
}