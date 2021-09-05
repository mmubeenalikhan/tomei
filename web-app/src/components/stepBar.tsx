import React, { Fragment, useState } from "react";
import Arrow from "../imeages/arrow-right.png";
import Button from "./button";
import Input from "./input";
import UploadImage from "./uploadImage";
import Steps from "./steps";
import Paragraph from "./paragraph";

interface ISignUp {
  signUp: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    picture: string;
  };
  setSignUp: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      picture: string;
    }>
  >;
  handleChangeEvent: () => void;
}

const StepBar: React.FC<ISignUp> = ({
  signUp,
  setSignUp,
  handleChangeEvent,
}: ISignUp) => {
  
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "picture") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignUp((prev) => ({ ...prev, [name]: reader.result }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      return;
    }
    setSignUp((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <div className="section-top">
        <Steps />
        <div className="accout-title">
          <span>CREATE YOUR ACCOUNT</span>
        </div>
        <div className="paragraph-title">
          <Paragraph
            value=" Because there will be documents that you need to prepare for apply
            for the loan,let's start off by creating a password so that you can
            login to your account once you have these documents ready."
          />
        </div>
      </div>
      <div className="section-bottom" >
        <div className="avatar">
          <UploadImage
            src={signUp.picture}
            name="picture"
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <div className="inputsection-top">
            <div>
              <Input
                label="NAME"
                value={signUp.name}
                type="text"
                handleInputChange={handleInputChange}
                name="name"
              />
            </div>
            <div>
              <Input
                label="EMAIL"
                value={signUp.email}
                type="email"
                handleInputChange={handleInputChange}
                name="email"
              />
            </div>
          </div>
          <div className="inputsection-bottom">
            <div>
              <Input
                label="PASSWORD"
                value={signUp.password}
                type="password"
                handleInputChange={handleInputChange}
                name="password"
              />
            </div>
            <div>
              <Input
                label="CONFIRM PASSWORD"
                value={signUp.confirmPassword}
                type="password"
                name="confirmPassword"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <Button
            btnvalue="SAVE & NEXT"
            imgsrc={Arrow}
            changeEvent={handleChangeEvent}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default StepBar;
