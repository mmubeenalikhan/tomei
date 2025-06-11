import React, { Fragment } from "react";
import Avatar from "../images/Avatar.png";
interface IUploader {
  src: string | null;
  name: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage: React.FC<IUploader> = ({
  src,
  name,
  handleInputChange,
}: IUploader) => {

  return (
    <Fragment>
      <img src={src ? src : Avatar} alt="avatar" className="img" />
      <br />
      <label htmlFor="upload-photo">Upload</label>
      <input
        type="file"
        name={name}
        id="upload-photo"
        onChange={handleInputChange}
      />
    </Fragment>
  );
};
export default UploadImage;
