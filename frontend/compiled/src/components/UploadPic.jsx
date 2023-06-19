"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const UploadPic = () => {
    const [uploadedImages, setUploadedImages] = (0, react_1.useState)([]);
    const onDrop = (acceptedFiles) => __awaiter(void 0, void 0, void 0, function* () {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        try {
            yield APIServices_1.default.postImage(1, formData);
            const imageUrl = URL.createObjectURL(acceptedFiles[0]);
            setUploadedImages([...uploadedImages, imageUrl]);
        }
        catch (error) {
            console.error(error);
        }
    });
    // @ts-ignore
    const { getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({ onDrop });
    // as {
    //   getRootProps: (props?: DropzoneRootProps) => JSX.Element;
    //   getInputProps: (props?: DropzoneInputProps) => JSX.Element;
    // };
    return (<div>
      <div>
        <div {...getRootProps()}>
        <input {...getInputProps()} type="string"/>
          <div className="upload-btn-wrapper">
            <button type="button" className="btn">
              Select Files
            </button>
          </div>
        </div>
        <div className="image">
          {uploadedImages.map((image, index) => (<img key={index} src={image} alt="Uploaded" className="item"/>))}
        </div>
      </div>
    </div>);
};
exports.default = UploadPic;
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
