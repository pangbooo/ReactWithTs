import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ReactDOM from 'react-dom';

type Props = {
  visible: boolean // 控制抽屉是否可见
  closable?: boolean, // 是否显示右上角的关闭按钮
  destroyOnClose?: () => void,
  getContainer?: HTMLElement | boolean, //指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
  maskClosable?: boolean, // 点击蒙层是否可以关闭抽屉
  mask? :boolean, // 是否展示遮罩
  drawerStyle: object, //  用来设置抽屉弹出层样式
  width?: string | number,
  zIndex?: number,
  placement?: string,
  onClose?: () => void,
  children: React.ReactNode,
};

export default function Drawer(props: Props) {
  const {
    closable = true,
    destroyOnClose,
    getContainer = document.body,
    maskClosable = true,
    mask = true,
    drawerStyle,
    width = '300px',
    zIndex = 10,
    placement = 'right',
    onClose,
    children,
  } = props;

  const [visible, setVisible] = useState(false);
  const [isDestory, setIsDestory] = useState(false);

  const handleClose = () => {
    setVisible((prev) => {
      if (getContainer !== false && prev){
        (getContainer as HTMLElement).style.overflow = 'auto';
      }
      return false;
    });

    if (onClose) {
      onClose();
    }

    if (destroyOnClose) {
      setIsDestory(true);
    }
  };

  useEffect(() => {
    setVisible(() => {
      if (getContainer !== false && props.visible) {
        (getContainer as HTMLElement).style.overflow = 'hidden';
      }
      return props.visible;
    });
    setIsDestory(false);
  }, [props.visible]);

  const childDom = (
        <div className={styles.xDrawerWrap}
            style={{
              position: getContainer === false ? 'absolute' : 'fixed',
              width: visible ? '100%' : 0,
              zIndex,
            }}
        >
            {!!mask && <div className={styles.xDrawerMask}
                            onClick={() => maskClosable ? handleClose() : null}
                            style={{ width: visible ? '100%' : 0 }}
                        ></div>}
            <div className={styles.xDrawerContent}
                style={{
                  width,
                  [placement]: visible ? 0 : '-100%',
                  ...drawerStyle,
                }}>
                {isDestory ? null : children}
                {
                    !!closable && <span className={styles.xCloseButton} onClick={handleClose}>X</span>
                }
            </div>
        </div>
  );


  return getContainer === false
    ? childDom
    : ReactDOM.createPortal(childDom, getContainer as HTMLElement);
}
