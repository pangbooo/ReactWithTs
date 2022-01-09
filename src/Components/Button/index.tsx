import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

type Props = {
  children: React.ReactNode,
  onClick?: ()  => void; // 对外暴露的点击事件
  className?: string, // 自定义类名
  type?: 'primary' | 'warning' | 'info' | 'default' | 'pure', // 按钮类型
  shape?: 'circle' | 'radius', // 按钮形状 radius(默认)
  block?: boolean, // 按钮展示 true | false(默认)
};

export default function Button(props: Props) {
  const { children, onClick, className, type = '', shape = 'radius', block } = props;
  return (
        <div className={classnames(styles.xButton, styles.ripple, styles[type], styles[shape], block ?  styles.block : '', className)}
             onClick={onClick}
        >
            {children}
        </div>
  );
}
