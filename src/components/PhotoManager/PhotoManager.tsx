import './PhotoManager.css';
import { useState, useRef } from 'react';
import { PhotoPreview } from '../PhotoPreview';
import { IManagerPhoto } from '../../types';

function fileToDataUrl(file: File) : Promise<string>{
  return new Promise((resolve, reject) => {
    const fileReader : FileReader = new FileReader();
  
    fileReader.addEventListener('load', () => {
      if (!fileReader.result) {
        reject(new Error('Failed to load data'));
      }
      resolve(`${fileReader.result}`);
    });
    
    fileReader.addEventListener('error', () => {
      reject(new Error(fileReader.error?.message));
    });
    
    fileReader.readAsDataURL(file);
  });
}

export const PhotoManager = () => {
  const [photoList, setPhotoList] = useState<Array<IManagerPhoto>>([]);
  const lastIndex = useRef<number>(0);

  async function handlePhotoSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const files: Array<File> = [...event.target.files];
    const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
    urls.forEach((source) => {
      const id: number = lastIndex.current;
      lastIndex.current += 1;
      photoList.push({ id, title: 'Image', source});
    });
    setPhotoList([...photoList]);
  }

  function handlePhotoClose(id: number|string) : void {
    setPhotoList(photoList.filter((photo) => photo.id !== id));
  }

  return (
    <div className='photo-manager'>
      <div className='photo-file-selection'>
        <input onChange={handlePhotoSelect} type='file' accept='image/*' multiple  />
      </div>
      <div className='photo-manager-preview'>
        {photoList.map((photo) => (
          <PhotoPreview key={photo.id} photo={photo} onClose={handlePhotoClose} />
        ))}         
      </div>
    </div>
  )
}
