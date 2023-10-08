import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import Loading3 from '../Loading3'
const apiUrl = import.meta.env.VITE_SERVER_URL;
import axios from 'axios';

function Monitors({monitor,reload,setReload,toast,pickedMonitor, setPickedMonitors,openModal4}) {
const [isDropdownOpen, setDropdownOpen] = useState(false);
const [load, setLoad] = useState(false);
const [load2, setLoad2] = useState(false);
 

const toggleDropdown = () => {
  setDropdownOpen(!isDropdownOpen);
};

// Calculate duration based on createdAt and updatedAt
const createdAt = moment(monitor?.createdAt);
const updatedAt = moment(monitor?.updatedAt);

const duration = moment.duration(updatedAt.diff(createdAt));

const { hours, minutes } = getTimeDifference(monitor?.createdAt, monitor?.updatedAt);

function getTimeDifference(createdAt, updatedAt) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  const timeDifference = updatedAtDate - createdAtDate;

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}




const pause = async (id) => {
    const token = localStorage.getItem('token');
    setLoad(true);
    try {
        const res = await axios.put(`${apiUrl}/api/monitor/monitors/${id}/pause`,{
            token
        });
        //console.log(res);
        if(monitor?.isPaused == false){
        toast("monitor paused")
        }else{
        toast("monitor activated")
        }
        setLoad(false);
        setReload(!reload);
    } catch (error) {
        console.log(error);
        setLoad(false);
    }
}

const remove = async (id) => {
    const token = localStorage.getItem('token');
    
    
    if (confirm('Are you sure you want to delete monitor')) {
        try {
            setLoad2(true);
            const response = await axios.delete(`${apiUrl}/api/monitor/monitors/remove`, {
                data: {
                  monitorId: id,
                  token: token,
                },
              });

            if (response.status === 200) {
              toast("Monitor deleted successfully");
              setLoad2(false);
              setReload(!reload);
            } else if (response.status === 404) {
              toast("Monitor not found");
              setLoad2(false);
            } else {
              toast("An error occurred");
              setLoad2(false);
            }
        } catch (error) {
            console.log(error);
            setLoad2(false);
        }
      } else {
        // Do nothing!
        console.log('Thing was not deleted');
      }
}

const edit = async () => {
    setPickedMonitors(monitor);
    openModal4();
}

   
  return (
    
    <div className="all-monitors__item">
                            <div className="monitor">
                              <div className="monitor__data"><span className="monitor__protocol">https</span><Link className="monitor__title" to="/monitor">{monitor?.name}</Link></div>
                              <div className="monitor__additional">
                                <div className="status-summary">
                                  <div className="status-summary__label">{monitor?.stats}%</div>
                                  <div className="status-summary__bar">
                                    <div className="status-bar">
                                        {monitor?.stats == "0" ? (<>
                                            <span className="status-bar__item status-bar__item--success tw-bg-red-600" style={{width:'100%'}}>
                                        </span>
                                        </>):(<>
                                            <span className="status-bar__item status-bar__item--success tw-bg-green-500" style={{width: `100%`}}>
                                        </span>
                                        </>)}
                                        
                                    <span className="status-bar__tooltip">
                                    Start Time: {createdAt.format('YYYY-MM-DD HH:mm:ss')}<br />
                                    End Time: {updatedAt.format('YYYY-MM-DD HH:mm:ss')}<br />
                                    Duration: {hours} hrs, {minutes} mins<br />
                                    Status: {monitor?.isPaused ? 'Paused' : 'Active'}
                                    </span>
                                    </div>
                                  </div>
                                </div>
                                <button onClick={toggleDropdown} className="monitor__settings" type="button"></button>
                                {isDropdownOpen && (
                                <div  className="dropdown-modal dropdown">
                                  <ul className="dropdown__list">
                                    <li className="dropdown__item">
                                    <button onClick={()=>{pause(monitor?._id)}} className="dropdown__link tw-w-full tw-text-left" >{load ? <><Loading3/></> :(<>
                                      
                                        {monitor?.isPaused ? 'Activate' : 'Pause'}
                                    
                                    </>)}</button>
                                    </li>
                                    <li className="dropdown__item">
                                    <button onClick={edit} className="dropdown__link tw-w-full tw-text-left" >Edit</button>
                                    </li>
                                    <li className="dropdown__item">
                                    <button onClick={()=>{remove(monitor?._id)}} className="dropdown__link tw-w-full tw-text-left" >
                                    {load2 ? <><Loading3/></>: (<>Delete</>)}
                                      
                                    </button>
                                    </li>
                                    
                                  </ul>
                                </div>
                                )}
                              </div>
                            </div>
                          </div>
  )
}

export default Monitors