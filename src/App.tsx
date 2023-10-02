import { useEffect, useState} from "react";
import { WelcomeModal } from "components/welcome-modal/welcome-modal";
import { Header } from "components/header/header";
import { Board } from "components/board/board";
import styles from "./App.module.scss";

function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
    localStorage.setItem('username', username);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername && !username) {
      setUsername(storedUsername);
    }
  }, [username]);

  return (
    <>
      {username ? (
        <>
          <div className={styles.container}>
            <Header username={username} />
            <Board username={username} />
          </div>
        </>
      ) :
        <WelcomeModal onSubmit={handleUsernameSubmit}/>
      }
    </>
  );
}

export default App;
