import React, { useState, Fragment } from "react";
import StepBar from "./components/stepBar";
import "./App.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionGenerator } from "./redux-store";
import { signup as signupAPI } from "./services/api";
import MaterialTost from "materialize-css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { progressBarStep1 } = bindActionCreators(actionGenerator, dispatch);
  const [signUpData, setSignUp] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    picture: "",
  });

  const handleChangeEvent = async () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const { password, confirmPassword, name, email } = signUpData;
    if (name && email && password && confirmPassword) {
      if (!pattern.test(email)) {
        MaterialTost.toast({ html: "Invalid email address" });
        return;
      }
 
      if (password !== confirmPassword) {
        MaterialTost.toast({ html: "Password does not match" });
        return;
      }

      const payload = {
        name,
        email,
        password,
        picture: signUpData.picture,
      };
      const response = await signupAPI(payload);
      if (response) {
        setSignUp({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          picture: "",
        });
        progressBarStep1(response);

        MaterialTost.toast({ html: "signup  successfully" });
      } else {
        MaterialTost.toast({ html: "something not working" });
      }
    } else {
      MaterialTost.toast({ html: "fill all the inputs" });
    }
  };
  return (
    <Fragment>
      <StepBar
        signUp={signUpData}
        setSignUp={setSignUp}
        handleChangeEvent={handleChangeEvent}
      />
    </Fragment>
  );
};
export default App;
