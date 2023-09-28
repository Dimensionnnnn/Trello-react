import { useState } from "react";
import { WelcomeModal } from "./components/WelcomeModal/welcome-modal";
import "./assets/colors.css";
import { Header } from "components/Header/header";
import { Board } from "components/Board/board";
import styles from "./App.module.scss";

function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  }

  const initialColumns = [
    {
      id: 0,
      title: 'Column1',
    },
    {
      id: 1,
      title: 'Column2',
    },
    {
      id: 2,
      title: 'Column3',
    },
    {
      id: 3,
      title: 'Column4',
    }
  ]

  return (
    <>
      {username ? (
        <>
          <div className={styles.container}>
            <Header username={username} />
            <Board columnsProps={initialColumns} />
          </div>
        </>
      ) :
        <WelcomeModal onSubmit={handleUsernameSubmit}/>
      }
    </>
  );
}

export default App;
