import { useState} from "react";
import { WelcomeModal } from "components/welcome-modal/welcome-modal";
import { Header } from "components/header/header";
import { Board } from "components/board/board";
import styles from "./App.module.scss";

function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  }

  return (
    <>
      {username ? (
        <>
          <div className={styles.container}>
            <Header username={username} />
            <Board />
          </div>
        </>
      ) :
        <WelcomeModal onSubmit={handleUsernameSubmit}/>
      }
    </>
  );
}

export default App;
