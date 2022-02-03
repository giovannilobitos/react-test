import styles from './DotPlotLabel.module.css';

const DotPlotLabel = ({ lowest, highest }) => {
    return (
        <div className={styles.mainContainer}>
            <div>
                {lowest}
            </div>
            <div>
                {highest}
            </div>
        </div>
    );
}

export default DotPlotLabel;