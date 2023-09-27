import { useState } from "react";
import Modal from "./components/Modal/modal";
import Button from "./components/UI/Button/button";
import Input from "./components/UI/Input/input";

function App() {
  const [username, setUsername] = useState('');

  const handleChangeUsername = (name: string) => {
    setUsername(name);
  }

  const handleUsernameSubmit = () => {
    console.log(username);
  }

  return (
    <>
      <Modal
        inputProps={{
          label: "Input your name",
          value: username,
          onChange: handleChangeUsername,
        }}
        buttonProps={{
          children: "Submit",
          onClick: handleUsernameSubmit,
        }}
      />
    </>
  );
}

export default App;
