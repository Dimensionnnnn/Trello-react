import { useState} from "react";
import { WelcomeModal } from "components/welcome-modal/welcome-modal";
import { Header } from "components/header/header";
import { Board } from "components/board/board";
import styles from "assets/App.module.scss";
import { StorageService } from "services/storage-service";

function App() {
  const initialUsername = StorageService.getItem('username');
  const [username, setUsername] = useState(initialUsername);

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
    StorageService.setItem('username', newUsername);
  }

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
