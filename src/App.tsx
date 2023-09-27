import { useState } from "react";
import { WelcomeModal } from "./components/WelcomeModal/welcome-modal";
import "./assets/colors.css";

function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  }

  return (
    <>
      {username ? (
        <h1>Hello, {username}</h1>
      ) :
        <WelcomeModal onSubmit={handleUsernameSubmit}/>
      }
    </>
  );
}

export default App;
