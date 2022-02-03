import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.text}>
                Loading...
            </div>
        </div>
    )
}

export default Loading;