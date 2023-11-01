import { IManagerPhoto } from '../../types';
import './PhotoPreview.css';

interface IProps {
  photo: IManagerPhoto;
  onClose: (id: number|string) => void;
}

export const PhotoPreview = ({ photo, onClose } : IProps) => {
  function handleCloseButtonClick() {
    onClose(photo.id)
  }
  
  return (
    <div className='photo-preview'>
      <button className='photo-preview-close_button' onClick={handleCloseButtonClick}>✖</button>
      <img className='photo-preview-image' src={photo.source} alt={photo.title} />
    </div>
  )
}
