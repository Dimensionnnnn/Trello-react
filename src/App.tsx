import { useState } from "react";
import WelcomeModal from "./components/WelcomeModal/welcome-modal";

function App() {
  const [username, setUsername] = useState('');

  const handleChangeUsername = (name: string) => {
    setUsername(name);
  }

  const handleUsernameSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username);
  }

  return (
    <>
      <WelcomeModal
        inputProps={{
          value: username,
          onChange: handleChangeUsername,
        }}
        buttonProps={{
          onClick: handleUsernameSubmit,
        }}
      />
    </>
  );
}

export default App;
