import styles from './App.module.scss';
import Button from './Components/Button';
import ProgressBar from './Components/ProgressBar';
import Drawer from './Components/Drawer';
import { useState } from 'react';

function App() {
  const [isVisiable, setIsVisiable] = useState(false);
  function handleClick() {
    console.log('click event');
  }

  function handleToggleDrawer() {
    setIsVisiable(!isVisiable);
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

      <div className={styles.container}>
        <h2>Drawer</h2>
        <Button onClick={handleToggleDrawer}>Click to toggle Drawer</Button>
        <Drawer
          visible = {isVisiable}
          maskClosable
          drawerStyle = {{
            hight: '100%',
            background: 'white',
            height: '100%',
            position: 'absolute',
          }}
        >
          <h3> Text </h3>
        </Drawer>
      </div>

    </div>
  );
}

export default App;
