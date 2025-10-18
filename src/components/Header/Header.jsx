import styles from './Header.module.css'

function Header() {

    return <div className={styles.container}>
        <div className={styles.caption}>АТМОСФЕРНОЕ ДАВЛЕНИЕ</div>
        <div className={styles.caption}>В Пыть-Яхе</div>
    </div>

}

export default Header
