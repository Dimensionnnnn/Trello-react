import { WelcomeModal } from "components/welcome-modal/welcome-modal";
import { Header } from "components/header/header";
import { Board } from "components/board/board";
import styles from "assets/global.module.scss";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateUsername } from "redux/ducks/username/username-slice";

function App() {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state: RootState) => state.username);

  const handleUsernameSubmit = (newUsername: string) => {
    dispatch(updateUsername(newUsername));
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
