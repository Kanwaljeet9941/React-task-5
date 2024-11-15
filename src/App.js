import { useState } from "react";
import "./App.css";
export default function App() {
  const [login, setLogin] = useState(true);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [inputsli, setInputsli] = useState({ name: "", password: "" });
  const [display, setDisplay] = useState(true);

  const storeData = {};

  function handleSubmitSignup(e) {
    e.preventDefault();
    storeData.name = inputs.name;
    storeData.email = inputs.email;
    storeData.password = inputs.password;

    let dataStr = JSON.stringify(storeData);
    localStorage.setItem("myObj", dataStr);

    setInputs({ name: "", email: "", password: "" });
    setLogin(false);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    let checkData = JSON.parse(localStorage.getItem("myObj"));

    if (
      inputsli.name === checkData?.name &&
      inputsli.password === checkData?.password
    ) {
      console.log("Greate Welcom Back");
      setDisplay((s) => (s = !s));
    } else {
      alert("User Not Found");
    }

    setInputsli({ name: "", password: "" });
  }

  function updateCode(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((s) => {
      return { ...s, [name]: value };
    });
  }
  function updateCodeli(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputsli((s) => {
      return { ...s, [name]: value };
    });
  }

  function handleClearDetails() {
    localStorage.removeItem("myObj");
  }
  return (
    <>
      <div className={display ? "frame" : " frame display"}>
        <div className={login ? "first mover" : "first"}>
          <h1 style={{ margin: "100px auto 40px auto" }}>
            {login ? "Hey, Let's do it" : "Welcome!"}
          </h1>
          <p>
            To keep connected with us please {login ? "sign up" : "log in"} with
            your personal info.
          </p>
          <button className="btn" onClick={() => setLogin((s) => !s)}>
            {login ? "log in" : "sign up"}
          </button>
        </div>
        <form className="second" onSubmit={handleSubmitLogin}>
          <span>Log In</span>
          <input
            type="text"
            placeholder="UserName"
            className="inp"
            name="name"
            value={inputsli.name}
            onChange={updateCodeli}
            required
          />
          <input
            type="password"
            placeholder="PassWord"
            className="inp"
            name="password"
            value={inputsli.password}
            onChange={updateCodeli}
            required
          />
          <button className="btn">Log in</button>
        </form>
        <form className="third" onSubmit={handleSubmitSignup}>
          <span>Sign up</span>
          <input
            type="text"
            placeholder="Enter username"
            className="inp"
            name="name"
            value={inputs.name}
            onChange={updateCode}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="inp"
            name="email"
            value={inputs.email}
            onChange={updateCode}
            required
          />
          <input
            type="password"
            placeholder="Create password"
            className="inp"
            name="password"
            value={inputs.password}
            onChange={updateCode}
            required
          />
          <button className="btn">Sign Up</button>
        </form>
        <button className="btn-details" onClick={handleClearDetails}>
          cleardetails
        </button>
      </div>
      <div className={display ? "overlay blury" : "overlay"}>
        <h1>Welcome To your Dashboard</h1>
        <img src="dashboard.png" className="img" alt="dashboard" />
      </div>
    </>
  );
}
