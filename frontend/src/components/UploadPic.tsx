import { useState } from 'react';
import { useDropzone, FileWithPath , DropzoneRootProps, DropzoneInputProps, DropzoneOptions } from 'react-dropzone';
import apiService from '../services/APIServices';

const UploadPic = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);


 


  const onDrop = async (acceptedFiles: FileWithPath[]) =>{
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      await apiService.postImage(1, formData);
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedImages([...uploadedImages, imageUrl]);
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
  const { getRootProps, getInputProps } = useDropzone({ onDrop })  
  
  // as {
  //   getRootProps: (props?: DropzoneRootProps) => JSX.Element;
  //   getInputProps: (props?: DropzoneInputProps) => JSX.Element;
  // };

  
  return (
    <div>
      <div>
        <div {...getRootProps()}>
        <input {...getInputProps()} type="string" />
          <div className="upload-btn-wrapper">
            <button type="button" className="btn">
              Select Files
            </button>
          </div>
        </div>
        <div className="image">
          {uploadedImages.map((image, index) => (
            <img key={index} src={image} alt="Uploaded" className="item" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPic;


/*
import { useCallback, useState } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps, FileWithPath } from 'react-dropzone';
import { postImage } from '../services/apiService';

const UploadPic = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);

      try {
        await postImage(1, formData);
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setUploadedImages((prevImages) => [...prevImages, imageUrl]);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const { getRootProps, getInputProps }: {
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="upload-btn-wrapper">
            <button type="button" className="btn">
              Select Files
            </button>
          </div>
        </div>
        <div className="image">
          {uploadedImages.map((image, index) => (
            <img key={index} src={image} alt="Uploaded" className="item" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPic;

*/