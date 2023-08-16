import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";


function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  // On Submit the Registration Form
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // On change the Input Value (name, email, password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Show Message on Success or Error
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <div display="flex">
      <div>
        <div>
          <h1>
            Cadastrar Usuário
          </h1>
          <form onSubmit={submitForm} noValidate>
            <div>
              <input
                label="Nome Completo"
                name="name"
                required
                value={state.userInfo.name}
                onChange={onChangeValue}
                placeholder="Digite seu nome completo"
              />
            </div>
            <div>
              <input
                label="Email"
                name="email"
                required
                type="email"
                value={state.userInfo.email}
                onChange={onChangeValue}
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <input
                label="Senha"
                name="password"
                required
                type="password"
                value={state.userInfo.password}
                onChange={onChangeValue}
                placeholder="Digite sua senha"
              />
            </div>
            {errorMsg}
            {successMsg}
            <div>
              <button type="submit">
                Cadastrar
              </button>
            </div>
          </form>
          <div>
            <button onClick={toggleNav}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
