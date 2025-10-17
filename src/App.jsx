import PWABadge from './PWABadge.jsx'
import styles from './App.module.css'
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";

function App() {
    return (
        <div className={styles.App}>
            <Header/>
            <Main/>
            <PWABadge/>
        </div>
    )
}

export default App