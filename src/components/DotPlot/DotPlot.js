import React from 'react';
import styles from './DotPlot.module.css';

const DotPlot = ({ percentage }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.subContainer}>
                <div 
                    className={styles.circle} 
                    style={{ marginLeft: `${percentage}%` 
                }}></div>
            </div>
        </div>
    );
}

export default DotPlot;
