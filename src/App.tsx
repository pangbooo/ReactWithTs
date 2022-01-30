import styles from './App.module.scss';
import Button from './Components/Button';
import ProgressBar from './Components/ProgressBar';
import Drawer from './Components/Drawer';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { increment } from './store/reducers';
import { fetchValue, fetchValueAsyncByHandle } from './store/dataFetcher';


function App() {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const state = useAppSelector((state) => state);
  function handleSyncClick() {
    // sync function
    dispatch(increment());
  }

  function handleAsyncClick() {
    // async function
    dispatch(fetchValue(1));
  }

  function handleAsyncClick2() {
    // async function by handle
    dispatch(fetchValueAsyncByHandle(1));
  }

  function handleToggleDrawer() {
    setIsVisible(!isVisible);
  }

  return (
    <div className="App">
      State: {JSON.stringify(state, null, 2)}
      <div className={styles.container}>
        <h2>Button</h2>
        <Button className={styles.mr10} onClick={handleSyncClick}>default</Button>
        <Button className={styles.mr10} type='primary' onClick={handleAsyncClick}>primary</Button>
        <Button className={styles.mr10} type='warning' onClick={handleAsyncClick2}>warning</Button>
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
          visible = {isVisible}
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
