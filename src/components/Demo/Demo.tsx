import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export const Demo: React.FC = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(typeof cropper.getCroppedCanvas().toDataURL(type));
    console.log(cropper.getCroppedCanvas().toDataURL('image/jpeg'));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        setType(file.type);
        console.log(file.type);
        setImage(file);
      } else {
        setImage(undefined);
      }
    }
  };

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      {image && (
        <Cropper
          src={preview}
          // style={{ height: 400, width: '100%' }}
          // Cropper.js options
          initialAspectRatio={16 / 9}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
          background={false}
          viewMode={1}
        />
      )}
    </div>
  );
};

export default Demo;
