import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.scss'
import { AiFillWechat } from 'react-icons/ai'
import { PiControlBold } from 'react-icons/pi'
// This is for tabs links
const tabs = [
  { id: 1, title: 'profile' },
  { id: 2, title: 'post' },
  { id: 3, title: 'gallery' },
  { id: 4, title: 'todo' },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [openChat, setOpenChat] = useState(false)
  const [activeContent, setActiveContent] = useState(1)
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [popup, setPopup] = useState(false)


  // to change the tab and content
  const handleItemClick = (itemTitle, id) => {
    setSelectedTab(itemTitle);
    setActiveContent(id)
  };
  
  // Fetching the users data
 useEffect(() => {
   fetch('https://panorbit.in/api/users.json')
     .then((response) => response.json())
     .then((data) => {
       setUsersData(data.users);
       setIsLoading(false);
     })
     .catch((error) => {
       setIsLoading(false);
     });
 }, []);

  useEffect(() => {
    let storedID = sessionStorage.getItem('ID');
    if (storedID) {
      const parsedID = JSON.parse(storedID);
      setUserID(parsedID.userID);
    }
  }, []);


  // some random users
  const shuffledUsersData = usersData.slice().sort(() => Math.random() - 0.5);
  const user1 = shuffledUsersData[0];
  const user2 = shuffledUsersData[1];


  // until you get all your data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lng = usersData[userID].address?.geo.lng; 
  const lat = usersData[userID].address?.geo.lat; 

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`${styles.items} ${activeContent === tab.id ? styles.active : ''}`}
                onClick={() => handleItemClick(tab.title, tab.id)}
              >
                <div className={`${styles.link} ${activeContent === tab.id ? styles.active : ''}`}>
                  {tab.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.title}>{selectedTab}</div>
              <div className={styles.signout}>
                <div className={styles.userIcon} onClick={() => setPopup(!popup)}>
                  <img src={usersData[userID].profilepicture} alt="" />
                  <div className={styles.username}><span>{usersData[userID].name}</span></div>
                </div>
                {popup && (
                  <>
                    <div className={styles.popupcontent}>
                      <img src={usersData[userID].profilepicture} alt="" />
                      <div className={styles.name}> <span>{usersData[userID].name}</span></div>
                      <div className={styles.email}> <span>{usersData[userID].email}</span></div>

                      <div className={styles.user}>
                        <img src={user1.profilepicture} alt="" />
                        <div className={styles.username}><span>{user1.name}</span></div>
                      </div>
                      <div className={styles.user}>
                        <img src={user2.profilepicture} alt="" />
                        <div className={styles.username}><span>{user2.name}</span></div>
                      </div>

                      <Link to='/' className={styles.sout}>
                        <div className={styles.link}> Sign out</div>
                      </Link>
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.mainContent} hidden={activeContent !== 1}>
            <div className={styles.details}>
              <div className={styles.ctLeft}>
                <img src={usersData[userID].profilepicture} alt="user-pic" />
                <div className={styles.personName}>{usersData[userID].name}</div>
                <div className={styles.userInfo}>username: <span>{usersData[userID].name}</span></div>
                <div className={styles.userInfo}>email: <span>{usersData[userID].email}</span></div>
                <div className={styles.userInfo}>phone: <span>{usersData[userID].phone}</span></div>
                <div className={styles.userInfo}>website: <span>{usersData[userID].website}</span></div>

                <div className={styles.cmpName}>Company</div>
                <div className={styles.userInfo}>name: <span>{usersData[userID].company.name}</span></div>
                <div className={styles.userInfo}>catchPhrase: <span>{usersData[userID].company.catchPhrase}</span></div>
                <div className={styles.userInfo}>bs: <span>{usersData[userID].company.bs}</span></div>
              </div>
              <div className={styles.ctRight}>
                <dl> Address :
                  <li>Street: <span>{usersData[userID].address?.street}</span></li>
                  <li>Suite: <span>{usersData[userID].address?.suite}</span></li>
                  <li>City: <span>{usersData[userID].address?.city}</span></li>
                  <li>zip-code: <span>{usersData[userID].address?.zipcode}</span></li>
                </dl>

                <div className={styles.map}>
                  <iframe
                    title="Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0120%2C40.7063%2C-73.9975%2C40.7131&amp;layer=mapnik"
                  ></iframe>
                </div>
                <div className={styles.ltng}>Lat: {lat} Lng: { lng}</div>
              </div>
            </div>
          </div>
          <div className={styles.commingsoon} hidden={activeContent !== 2}>
            <div className={styles.cm}>
              <span>comming soon</span>
           </div>
          </div>
          <div className={styles.commingsoon} hidden={activeContent !== 3}>
           <div className={styles.cm}>
              <span>comming soon</span>
           </div>
          </div>
          <div className={styles.commingsoon} hidden={activeContent !== 4}>
           <div className={styles.cm}>
              <span>comming soon</span>
           </div>
          </div>
        </div>
        <div className={`${styles.chatbox} ${openChat ? styles.active : ''}`} onClick={() => setOpenChat(!openChat)}>
          <div className={`${styles.chatContainer}`}>
            <div className={styles.head}>
              <div className={styles.lf}>
                <span><AiFillWechat fontSize={25} /></span>
                <span>Chats</span>
              </div>
              <div className={styles.rf}>
                <PiControlBold />
              </div>
              
            </div>
            <div className={styles.userlist}>

            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard