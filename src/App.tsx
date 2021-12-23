import styles from './App.module.scss';
import Button from './Components/Button';

function App() {
  function handleClick() {
    console.log('click event')
  }
  
  return (
    <div className="App">
      <div className={styles.container}>
        <h2>Button</h2>
        <Button className={styles.mr10} onClick={handleClick}>default</Button>
        <Button className={styles.mr10} type='primary'>primary</Button>
        <Button className={styles.mr10} type='warning'>warning</Button>
        <Button className={styles.mr10} type='info'>info</Button>
        <Button className={styles.mr10} type='pure'>pure</Button>
        <Button className={styles.mr10} type='primary' shape='circle'>circle</Button>
        <hr />
      </div>
      
    </div>
  );
}

export default App;
