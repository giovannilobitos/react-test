import { Widget, Loading, Error } from '../components';
import { useDataQuery } from '../hooks';
import styles from './App.module.css';

const App = () => {
  const queryInfo = useDataQuery();

  if (queryInfo.error) {
    return (
      <Error error={queryInfo.error} />
    )
  }

  return (
    <>
      {
        queryInfo.isLoading && <Loading />
      }
      <div className={styles.mainContainer}>
        <div className={styles.pageTitle}>
          React Test
        </div>
        {
          queryInfo.data && (
            <div className={styles.widgetContainer}>
                <Widget colConfig={queryInfo.data.config1} data={queryInfo.data.data} />
                <Widget colConfig={queryInfo.data.config2} data={queryInfo.data.data} />
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
