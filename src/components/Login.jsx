import { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import { Input, Card, CardBody, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

import Logo from '../assets/logotipo_alugafacil.png'


function Login() {
  const { loginUser, isLoggedIn } = useContext(MyContext);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <Card style={{ maxWidth: 450, margin: '10vh auto' }}>
      <CardBody>
        <img src={Logo} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="" />
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={submitForm} noValidate>
          <Input
            label="E-mail"
            name="email"
            type="email"
            isRequired
            value={state.userInfo.email}
            onChange={onChangeValue}
          />

          <Input
            label="Senha"
            name="password"
            value={state.userInfo.password}
            onChange={onChangeValue}
            isRequired
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          {errorMsg}
          {successMsg}
          <Button
           color='primary' type="submit">
            Entrar
          </Button>         
        </form>
      </CardBody>
    </Card>


  );
}

export default Login;
