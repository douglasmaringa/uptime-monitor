import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; 
import Header from "../components/Header";
import CreateMonitor from "../components/Dashboard.jsx/CreateMonitor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BulkActions from '../components/Dashboard.jsx/BulkActions';
import SortActions from '../components/Dashboard.jsx/SortActions';
import Monitors from '../components/Dashboard.jsx/Monitors';
import Loading2 from '../components/Loading2';
import EditMonitor from '../components/Dashboard.jsx/EditMonitor';
import UptimeEvents from '../components/Dashboard.jsx/UptimeEvents';
const apiUrl = import.meta.env.VITE_SERVER_URL;
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';

function Dashboard() {
  const navigate = useNavigate()
  let [monitors, setMonitors] = useState([])
  let [stats, setStats] = useState([])
  let [load3, setLoad3] = useState(false)
  let [percent, setPercent] = useState([])
  let [load4, setLoad4] = useState(false)
  let [down, setDown] = useState([])
  let [load5, setLoad5] = useState(false)
  let [pickedMonitor, setPickedMonitors] = useState({})
  let [page, setPage] = useState(1)
  let [pages, setPages] = useState(1)
  let [updown, setUpdown] = useState([])
  let [page2, setPage2] = useState(1)
  let [pages2, setPages2] = useState(1)
  let [load2, setLoad2] = useState(false)
  const [sortByName,setSortByName] = useState('all'); 
  const [statusSort,setStatusSort] = useState('all');
  const [typeSort, setTypeSort] = useState('all');
  const [searchText,setSearchText] = useState(''); 
  let [load, setLoad] = useState(false)
  let [reload, setReload] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {setIsOpen(false)}
  function openModal() {setIsOpen(true)}
  let [isOpen2, setIsOpen2] = useState(false)
  function closeModal2() {setIsOpen2(false)}
  function openModal2() {setIsOpen2(true)}
  let [isOpen3, setIsOpen3] = useState(false)
  function closeModal3() {setIsOpen3(false)}
  function openModal3() {setIsOpen3(true)}
  let [isOpen4, setIsOpen4] = useState(false)
  function closeModal4() {setIsOpen4(false)}
  function openModal4() {setIsOpen4(true)}

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {console.log(token)} else {navigate('/login');}
  }, [navigate]);

  useEffect(() => {
    document.title = 'Dashboard – Alerts.net';
  }, [])
  

  //fetch monitor data
  useEffect(() => {
    setLoad(true)
    const token = localStorage.getItem('token');
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/monitor/monitors/all`, {
      token: token,
      page: page,
      sortByName, 
      typeFilter: typeSort, 
      statusFilter: statusSort,
      searchText: searchText
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Data fetched successfully
          //console.log(response)
          setMonitors(response.data); // Assuming the response data contains the list of monitors
          //console.log(response.data)
          
          if(response?.data?.monitors?.length > 0){
           
          setPages(response?.data?.totalPages)
          }
          setLoad(false)
        } else {
          console.error('Failed to fetch monitors');
          setLoad(false)
        }
      })
      .catch((error) => {
        console.error('Error fetching monitors:', error);
        setLoad(false)
      });
      
  }, [page,reload]);

  //fetch monitor uptime and downtime events
  useEffect(() => {
    setLoad2(true)
    const token = localStorage.getItem('token');
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/monitor/monitoring/updown`, {
      token: token,
      page: page2,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        
        if (response.status === 200) {
          // Data fetched successfully
          //console.log(response)
          setUpdown(response?.data?.events); // Assuming the response data contains the list of monitors
          //console.log(response.data.events)
          if(response?.data?.monitors?.length > 0){
          setPages2(response?.data?.totalPages)
          }
          setLoad2(false)
        } else {
          console.error('Failed to fetch monitors');
          setLoad2(false)
        }
      })
      .catch((error) => {
        console.error('Error fetching monitors:', error);
        setLoad2(false)
      });
      
  }, [page2]);

  //get stats data 
  useEffect(() => {
    setLoad3(true)
    const token = localStorage.getItem('token');
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/monitor/monitoring/stats`, {
      token: token,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
          setStats(response.data); 
          setLoad3(false)
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoad3(false)
      });
      
  }, [reload]);

  //get % data 
  useEffect(() => {
    setLoad4(true)
    const token = localStorage.getItem('token');
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/monitor/monitoring/alluptimestats`, {
      token: token,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setPercent(response.data); 
        
          setLoad4(false)
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoad4(false)
      });
      
  }, [reload]);

  //get latest downtime data 
  useEffect(() => {
    setLoad5(true)
    const token = localStorage.getItem('token');
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/monitor/monitoring/latest-downtime`, {
      token: token,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setDown(response.data); 
           //console.log(response.data)
          setLoad5(false)
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoad5(false)
      });
      
  }, [reload]);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // Fetch user profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/user/profile`,
          { token: token, userId: userId },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setUserProfile(response?.data?.user);
          //console.log(response)
        } else {
          toast('User profile not found');
        }
      } catch (error) {
        // Handle errors here
        toast('Error fetching user profile');
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);






  // Calculate the duration in hours and minutes
  const duration = moment.duration(down?.duration);
  const durationInHours = duration.hours();
  const durationInMinutes = duration.minutes();


  // Create data for the pie chart
  const pieChartData = {
    labels: ['Up', 'Down', 'Paused'],
    datasets: [
      {
        data: [stats?.upMonitors, stats?.downMonitors, stats?.pausedMonitors],
        backgroundColor: ['#388E3C', '#D32F2F', '#FFA001'], // Colors for each segment
      },
    ],
  };

  // Create data for the pie chart
  const pieChartData2 = {
    labels: [''],
    datasets: [
      {
        data: ["100"],
        backgroundColor: ['#388E3C'], // Colors for each segment
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
    cutout: '80%', 
  };

const[contacts,setContacts] = useState([])
const[load6,setLoad6] = useState(false)

  //fetch monitor data
  useEffect(() => {
    setLoad6(true)
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log(token)
    // Make a POST request to the API
    axios.post(`${apiUrl}/api/user/list-contacts`, {
      token: token,
      userId: userId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        //console.log(response)
        if (response.status === 200) {
          // Data fetched successfully
          setContacts(response?.data?.contacts); 
          setLoad6(false)
        } else {
          console.error('Failed to fetch contacts');
          setLoad6(false)
        }
      })
      .catch((error) => {
        console.error('Error fetching contact:', error);
        setLoad6(false)
      });
      
  }, []);

  function hasValues(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== 0 && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
          return true;
        }
      }
    }
    return false;
  }

  

  return (
    <div>
    <div className="layout layout--dashboard">
      
        <Header/>
        <ToastContainer autoClose={2000} />
      
      <div className="layout__body">
        <div className="dashboard-topbar">
          <div className="wrapper">
            <div className="dashboard-topbar__headline">
              <h1 className="dashboard-topbar__title">Quick Stats</h1>
              <p className="dashboard-topbar__description">You are currently using {parseInt(stats?.upMonitors) + parseInt(stats?.downMonitors)} of your {userProfile?.maxMonitors} monitors.</p>
            </div>
            <div className="dashboard-topbar__actions">
                      <button onClick={openModal} className="button button--color-green button--size-md button--icon-plus"><span className="button__inner">add new monitor</span></button>
            </div>
          </div>
        </div>


        <div className="wrapper">
          <div className="widgets">


            <div className="widgets__item">
              <div className="widget-monitoring widget">
                <header className="widget__header">
                  <h2 className="widget__title">Monitoring Stats</h2><span className="widget__description">Stats of your {parseInt(stats?.upMonitors) + parseInt(stats?.downMonitors) + parseInt(stats?.pausedMonitors)} monitors</span>
                </header>
                <div className="widget-monitoring__body widget__body">
                  <div className="tw-m-auto">
                    {
                      hasValues(stats) ? (<>
                      <Doughnut data={pieChartData} options={chartOptions} width={82} height={82} />
                      </>):(<>
                        <Doughnut data={pieChartData2} options={chartOptions} width={82} height={82} />
                      </>)
                    }
                  
                  </div>
                  <ul className="widget-monitoring__stats">
                    <li className="widget-monitoring__stats-item widget-monitoring__stats-item--up"><strong className="widget-monitoring__stats-item-title">
                      
                      {
                        load3 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {stats?.upMonitors}
                        </>)
                      }
                      </strong><span className="widget-monitoring__stats-item-text"><span className="legend-pin legend-pin--green"></span>Up</span></li>
                    <li className="widget-monitoring__stats-item widget-monitoring__stats-item--down"><strong className="widget-monitoring__stats-item-title">
                      
                      {
                        load3 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {stats?.downMonitors}
                        </>)
                      }
                      </strong><span className="widget-monitoring__stats-item-text"><span className="legend-pin legend-pin--red"></span>Down</span></li>
                    <li className="widget-monitoring__stats-item widget-monitoring__stats-item--paused"><strong className="widget-monitoring__stats-item-title">
                      
                      {
                        load3 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {stats?.pausedMonitors}
                        </>)
                      }
                      </strong><span className="widget-monitoring__stats-item-text"><span className="legend-pin legend-pin--yellow"></span>Paused</span></li>
                  </ul>
                </div>
              </div>
            </div>



            <div className="widgets__item">
              <div className="widget-uptime widget">
                <header className="widget__header">
                  <h2 className="widget__title">Overall Uptime</h2>
                </header>
                <div className="widget__body tw-mt-4">
                  <ul className="widget-uptime__stats">
                    <li className="widget-uptime__stats-item"><strong className="tw-text-4xl widget-uptime__stats-item-title">
                    {
                        load4 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {percent?.uptimePercentage24h}%
                        </>)
                      }
                    </strong><span className="widget-uptime__stats-item-text">last 24 hours</span></li>
                    <li className="widget-uptime__stats-item"><strong className="tw-text-4xl widget-uptime__stats-item-title">
                    {
                        load4 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {percent?.uptimePercentage7d}%
                        </>)
                      }
                    </strong><span className="widget-uptime__stats-item-text">last 7 days</span></li>
                    <li className="widget-uptime__stats-item"><strong className="tw-text-4xl widget-uptime__stats-item-title">
                      {
                        load4 ? (<div className="tw-ml-2"><Loading2/></div>):(<>
                           {percent?.uptimePercentage30d}%
                        </>)
                      }
                    </strong><span className="widget-uptime__stats-item-text">last 30 days</span></li>
                  </ul>
                </div>
              </div>
            </div>



            <div className="widgets__item">
              <div className="widget-downtime widget">
                <header className="widget__header">
                  <h2 className="widget__title">Latest Downtime</h2>
                </header>
                <div className="widget__body">
                {
                  down?.obj?.monitor?.type === 'web' && down?.obj?.availability == "Down"  && (
                  <div className="widget-downtime__text">
                    <p>The last downtime recorded was on {moment(down?.timestamp).format('YYYY-MM-DD HH:mm:ss')} UTC (for the monitor&nbsp;{down?.name}) and lasted {durationInHours} hrs, {durationInMinutes} mins </p>
                  </div>
                  )
                }

                {
                  down?.obj?.monitor?.type === 'ping' && down?.obj?.ping == "Unreachable"  && (
                  <div className="widget-downtime__text">
                    <p>The last downtime recorded was on {moment(down?.timestamp).format('YYYY-MM-DD HH:mm:ss')} UTC (for the monitor&nbsp;{down?.name}) and lasted {durationInHours} hrs, {durationInMinutes} mins </p>
                  </div>
                  )
                }


                {
                  down?.obj?.monitor?.type === 'port' && down?.obj?.port == "Closed"  && (
                  <div className="widget-downtime__text">
                    <p>The last downtime recorded was on {moment(down?.timestamp).format('YYYY-MM-DD HH:mm:ss')} UTC (for the monitor&nbsp;{down?.name}) and lasted {durationInHours} hrs, {durationInMinutes} mins </p>
                  </div>
                  )
                }


                 {
                  down?.obj?.monitor?.type === 'web' && down?.obj?.availability == "Up"  && (
                  <div className="widget-downtime__text">
                    <p>No downtime Found </p>
                  </div>
                  )
                }

                {
                  down?.obj?.monitor?.type === 'ping' && down?.obj?.ping == "Reachable"  && (
                  <div className="widget-downtime__text">
                    <p>No downtime Found </p>
                  </div>
                  )
                }


                {
                  down?.obj?.monitor?.type === 'port' && down?.obj?.port == "Open"  && (
                  <div className="widget-downtime__text">
                    <p>No downtime Found </p>
                  </div>
                  )
                }
    
                </div>
              </div>
            </div>


           
            {/*<div className="widgets__item">
              <div className="widget-storage widget">
                <header className="widget__header">
                  <h2 className="widget__title">Storage</h2>
                </header>
                <div className="widget__body">
                  <div className="loading-bar">
                    <div className="loading-bar__status" style={{"width": "75%"}}></div>
                  </div>
                  <ul className="widget-storage__stats">
                    <li className="widget-storage__stats-item"><span className="widget-storage__stats-item-inner"><span className="legend-pin legend-pin--violet"></span><strong className="widget-storage__stats-item-title">875 MB</strong><span className="widget-storage__stats-item-text">31% Used space</span></span></li>
                    <li className="widget-storage__stats-item"><span className="widget-storage__stats-item-inner"><span className="legend-pin legend-pin--violet-pale"></span><strong className="widget-storage__stats-item-title">1.47 TB</strong><span className="widget-storage__stats-item-text">69% Available</span></span></li>
                  </ul>
                </div>
              </div>
            </div>*/}



            {/*<div className="widgets__item">
              <div className="widget-processor widget">
                <header className="widget__header">
                  <h2 className="widget__title">Processor</h2>
                </header>
                <div className="widget__body">
                  <div className="widget-processor__info"><strong>85%</strong><span>CPU Usage</span></div>
                  <div className="widget-processor__chart-wrapper">
                    <canvas className="widget-processor__chart" height="94"></canvas>
                  </div>
                </div>
              </div>
                    </div>*/}


            {/*
            <div className="widgets__item">
              <div className="widget-ram widget">
                <header className="widget__header">
                  <h2 className="widget__title">RAM</h2>
                </header>
                <div className="widget__body">
                  <div className="widget-ram__info"><strong>85%</strong><span>CPU Usage</span></div>
                  <div className="widget-ram__chart-wrapper">
                    <canvas className="widget-ram__chart" height="94"></canvas>
                  </div>
                </div>
              </div>
            </div>*/}
                  </div>


        
          <div className="monitors-area">
            <div className="row">

              <div className="monitors-area__all-monitors col">
                <div className="all-monitors ">
                  <header className="all-monitors__header ">
                    <h2 className="all-monitors__title">All Your Monitors</h2>
                    <div className="all-monitors__actions">
                      <div className="all-monitors__actions-item">
                        <button onClick={openModal2} className="dropdown-opener" >Bulk Actions</button>
                      </div>
                      <div className="all-monitors__actions-item">
                        <button className="dropdown-opener" type="button" onClick={openModal3}>Sort Monitors</button>
                      </div>
                    </div>
                  </header>

                  <div  className="all-monitors__body  tw-h-full">
                    <div className="all-monitors__search">
                      <form className="search">
                                        <label className="field search__query field--wide field--size-md">
                                          <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} type="text" placeholder="Name" name="input-name"/>
                                        </label>
                        <button onClick={(e)=>{
                          e.preventDefault()
                          setReload(!reload)
                        }} className="search__submit" type="button"></button>
                      </form>
                    </div>

                    <div style={{height:'80%',display:'flex',flexDirection:'column'}}  className=" tw-bg-white">

                      <div  className=" ">

                        <div className="tw-flex  tw-flex-col tw-justify-between ">
                          {
                            load ? 
                            (<div>
                                <Loading2/>
                            </div>):(<>
                                {
                                 monitors?.monitors?.map((monitor, index) => (
                                  <Monitors key={index} monitor={monitor} toast={toast} reload={reload} setReload={setReload}
                                  pickedMonitor={pickedMonitor} setPickedMonitors={setPickedMonitors} openModal4={openModal4}
                                  />
                                 ))
                                }
                                 </>)
                          }
                           
                        </div>

                      </div>
                    </div>
                  </div>


                  <div className="tw-mt-auto monitors-events__footer">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="monitors-events__pages-count">Page {page} of {pages === 0 ? "1": pages}</div>
                        </div>
                        <div className="col-auto">
                          <nav className="arrow-nav">
                            <button onClick={()=>{
                              if(page>1){
                                setPage(page-1)
                              }
                            }} className="arrow-nav__item arrow-nav__item--prev" href="#">Prev</button>
                            <button onClick={()=>{
                              if(page<pages){
                                setPage(page+1)
                              }
                            }} className="arrow-nav__item arrow-nav__item--next" href="#">Next</button>
                          </nav>
                        </div>  
                    </div>
                    </div>
                </div>
              </div>



              <div  className="monitors-area__events col">
                <div className="monitors-events">
                  <header className="monitors-events__header">
                    <h2 className="monitors-events__title">Latest Events For All Monitors</h2>
                    <div className="monitors-events__actions">
                      <div className="monitors-events__actions-item"><a className="export-button" href="#">Export Logs</a></div>
                    </div>
                  </header>

                  <div  className="monitors-events__body">
                    <div className="events-table">
                      <header className="events-table__header">
                        <div className="events-table__row">
                          <div className="events-table__col events-table__col--event">Event</div>
                          <div className="events-table__col events-table__col--monitor">Monitor</div>
                          <div className="events-table__col events-table__col--time">Date-Time</div>
                          <div className="events-table__col events-table__col--reason">Reason</div>
                          <div className="events-table__col events-table__col--duration">Duration</div>
                        </div>
                      </header>


                      <div className="events-table__body">
                        {/*Table data*/}
                        
                        {
                            load2 ? 
                            (<div>
                                <Loading2/>
                            </div>):(<>
                                {
                                 updown?.map((monitor, index) => (
                                  <UptimeEvents status={"Up"} key={index} monitor={monitor} 
                                  />
                                 ))
                                }
                                </>)
                          }
                           
                        
                        </div>
                        </div>
                        

                    <div className="monitors-events__footer">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="monitors-events__pages-count">Page {page2} of {pages2 === 0 ? "1": pages2 }</div>
                        </div>
                        <div className="col-auto">
                          <nav className="arrow-nav">
                            <button onClick={()=>{
                              if(page2 > 1){
                                setPage2(page2 - 1)
                              }
                            }} className="arrow-nav__item arrow-nav__item--prev" >Prev</button>
                            <button onClick={()=>{
                              if(page2 < pages2){
                                setPage2(page2 + 1)
                              }
                            }} className="arrow-nav__item arrow-nav__item--next" >Next</button>
                          </nav>
                        </div>  
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/*edit monitor modal*/}
       <Transition className="" appear show={isOpen4} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-[1400] " onClose={closeModal4}>
          <Transition.Child
            as={Fragment}
            enter="tw-ease-out tw-duration-300"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-ease-in tw-duration-200"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="tw-ease-out tw-duration-300"
                enterFrom="tw-opacity-0 tw-scale-95"
                enterTo="tw-opacity-100 tw-scale-100"
                leave="tw-ease-in tw-duration-200"
                leaveFrom="tw-opacity-100 tw-scale-100"
                leaveTo="tw-opacity-0 tw-scale-95"
              >
                <Dialog.Panel className="tw-w-full tw-max-w-4xl tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  
                  <div className="tw-mt-2">
                   <EditMonitor monitor={pickedMonitor} closeModal={closeModal4} toast={toast} reload={reload} setReload={setReload} contacts={contacts}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


         {/*Bulk actions modal*/}
       <Transition className="" appear show={isOpen2} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-10 " onClose={closeModal2}>
          <Transition.Child
            as={Fragment}
            enter="tw-ease-out tw-duration-300"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-ease-in tw-duration-200"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="tw-ease-out tw-duration-300"
                enterFrom="tw-opacity-0 tw-scale-95"
                enterTo="tw-opacity-100 tw-scale-100"
                leave="tw-ease-in tw-duration-200"
                leaveFrom="tw-opacity-100 tw-scale-100"
                leaveTo="tw-opacity-0 tw-scale-95"
              >
                <Dialog.Panel className="tw-w-full tw-max-w-lg tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  
                  <div className="tw-mt-2">
                    <BulkActions monitors={monitors} reload={reload} setReload={setReload} toast={toast} close={closeModal2}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>



      {/*sort monitor modal*/}
      <Transition className="" appear show={isOpen3} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-10 " onClose={closeModal3}>
          <Transition.Child
            as={Fragment}
            enter="tw-ease-out tw-duration-300"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-ease-in tw-duration-200"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
          >
          <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="tw-ease-out tw-duration-300"
                enterFrom="tw-opacity-0 tw-scale-95"
                enterTo="tw-opacity-100 tw-scale-100"
                leave="tw-ease-in tw-duration-200"
                leaveFrom="tw-opacity-100 tw-scale-100"
                leaveTo="tw-opacity-0 tw-scale-95"
              >
                <Dialog.Panel className="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
  

                  <div className="tw-mt-2">
                   <SortActions sortByName={sortByName} setSortByName={setSortByName} statusSort={statusSort} setStatusSort={setStatusSort} typeSort={typeSort} setTypeSort={setTypeSort} reload={reload} setReload={setReload} close={closeModal3}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

        
        {/*create monitor modal*/}
       <Transition className="" appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="tw-relative tw-z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="tw-ease-out tw-duration-300"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-ease-in tw-duration-200"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
              <Transition.Child
                as={Fragment}
                enter="tw-ease-out tw-duration-300"
                enterFrom="tw-opacity-0 tw-scale-95"
                enterTo="tw-opacity-100 tw-scale-100"
                leave="tw-ease-in tw-duration-200"
                leaveFrom="tw-opacity-100 tw-scale-100"
                leaveTo="tw-opacity-0 tw-scale-95"
              >
                <Dialog.Panel className="tw-w-full tw-max-w-4xl tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  
                  <div className="tw-mt-2">
                   <CreateMonitor closeModal={closeModal} toast={toast} reload={reload} setReload={setReload} contacts={contacts}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>

      <div className="layout__footer">
        <div className="dashboard-footer">
          <div className="wrapper">
            <div className="dashboard-footer__copy">2017 © Uptime Engineer. All Rights Reserved.</div>
            <nav className="footer-nav"><a className="footer-nav__item" href="#">FAQ</a><a className="footer-nav__item" href="#">Privacy</a><a className="footer-nav__item" href="#">Policy</a><a className="footer-nav__item" href="#">Terms & Condition</a></nav>
          </div>
        </div>
      </div>
    </div>
    <div className="mobile-menu">
      <nav className="mobile-menu__list"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-dashboard" href="#">dashboard</a><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-settings" href="#">my settings</a></nav>
      <nav className="mobile-menu__list mobile-menu__list--bottom"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-logout" href="#">logout</a></nav>
    </div>
    
  </div>
  
 
  )
}

export default Dashboard