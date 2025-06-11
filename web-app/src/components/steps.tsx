import React, { useState, Fragment } from "react";
import Logo from "../images/Logo.png";
import Step1 from "../images/Wizard-Step1.png";
import Step2 from "../images/Wizard-Step2.png";
import Step3 from "../images/Wizard-Step3.png";
import Step4 from "../images/Wizard-Step4.png";
import Step5 from "../images/Wizard-Step5.png";
import StraightLine from "../images/Wizard-HorizontalBar.png";
import Title from "./title";
import StepNumber from "./stepNumber";

interface IStep {}

const Steps: React.FC<IStep> = ({}: IStep) => {
  return (
    <Fragment>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="step-bar">
        <img className="step-img" src={Step1} alt="step1" />
        <img className="stright-line" src={StraightLine} alt="strightline" />
        <img className="step-img" src={Step2} alt="step2" />
        <img className="stright-line" src={StraightLine} alt="strightline" />
        <img className="step-img" src={Step3} alt="step3" />
        <img className="stright-line" src={StraightLine} alt="strightline" />
        <img className="step-img" src={Step4} alt="step4" />
        <img className="stright-line" src={StraightLine} alt="strightline" />
        <img className="step-img" src={Step5} alt="step5" />
      </div>
      <div className="step-number">
        <StepNumber
          customId=""
          customClass="costomise-color"
          stepNumberValue="Step 1"
        />
        <StepNumber
          customId=""
          customClass="step-numbers"
          stepNumberValue="Step 2"
        />
        <StepNumber
          customId=""
          customClass="step-numbers"
          stepNumberValue="Step 3"
        />
        <StepNumber
          customId=""
          customClass="step-numbers"
          stepNumberValue="Step 4"
        />
        <StepNumber
          customId=""
          customClass="step-numbers"
          stepNumberValue="Step 5"
        />
      </div>
      <div className="step-title">
        <Title
          custum=""
          title=" CREATE YOUR 
          ACCOUNT PASSWORD"
          costomisecolor="costomise-color"
        />

        <Title
          custum=""
          title=" PERSONAL 
          INFORMATION"
          costomisecolor=""
        />
        <Title
          custum=""
          title=" EMPLOYEMENT 
          DETAILS"
          costomisecolor=""
        />
        <Title
          custum=""
          title="  UPLOAD
          DOCUMENTS"
          costomisecolor=""
        />
        <Title custum="" title="COMPLETE" costomisecolor="" />
      </div>
    </Fragment>
  );
};

export default Steps;
