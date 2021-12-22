import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

type Props = {
    children: React.ReactNode,
    onClick?: Function,
    className?: string,
    type?: string,
    shape?: string,
    block?: boolean,
}

export default function Button(props: Props) {
    const { children, onClick, className, type = '', shape = '', block } = props;
    return (
        <div className={classnames(styles.xButton, styles.ripple, styles[type], styles[shape])}>
            {children}
        </div>
    )
}