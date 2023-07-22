
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.scss'

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the users..
  useEffect(() => {
    fetch('https://panorbit.in/api/users.json')
      .then(response => response.json())
      .then(data => {
        setUsersData(data.users);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setIsLoading(false);
      });
  }, []);

  // Set the ID to the browser API, in session
  const setId = (id) => {
    sessionStorage.setItem('ID', JSON.stringify({
      ID: true,
      userID: id - 1
    }))
  }



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.users}>
          <div className={styles.title}>Select an account</div>
          <div className={styles.listedUsers}>
              {
                usersData.map(el => (
                  <>
                    <div className={styles.allUsers} key={el.id}>
                      <Link to={`/dashboard`} onClick={() => setId(el.id)} className={styles.userlink}>
                        <div div className={styles.profileImg}>
                          <img src={el.profilepicture} alt="user" />
                        </div>
                        <div className={styles.userName}>{el.name}</div>
                      </Link>
                  </div>
                  </>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home