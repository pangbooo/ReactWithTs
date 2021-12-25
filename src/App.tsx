import styles from './App.module.scss';
import Button from './Components/Button';
import ProgressBar from './Components/ProgressBar';

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

      <div className={styles.container}>
        <h2>ProgressBar</h2>
        <ProgressBar
          percent={20} 
          themeColor={'red'}
        />

       <ProgressBar
        percent={30}
        themeColor="#6699FF"
        statusScope={[[18, 'red'], [40, 'orange']]}
      />
      </div>
      
    </div>
  );
}

export default App;
