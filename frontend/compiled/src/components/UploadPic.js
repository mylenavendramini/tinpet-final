"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
//TODO:
const UploadPic = () => {
    const [files, setFiles] = (0, react_1.useState)([]);
    const { getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
        },
    });
    const thumbs = files.map((file) => (<div key={file.name}>
      <img src={file.preview} alt={file.name} style={{ width: '100px', height: '100px' }}/>
    </div>));
    return (<section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()}/>
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <aside>{thumbs}</aside>
    </section>);
};
exports.default = UploadPic;
