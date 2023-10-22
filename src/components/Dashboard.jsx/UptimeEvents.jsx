import React,{useState} from 'react';
import moment from 'moment';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

function UptimeEvents({ status, monitor }) {
  console.log(status)
  const createdAt = moment.utc(monitor?.timestamp).format('YYYY-MM-DD HH:mm:ss');

  const currentTime = moment();
  const endTime = monitor?.endTime; // Assuming the endTime is available in the monitor object
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpansion() {
    setIsExpanded(!isExpanded);
  }
  console.log(isExpanded)
  

  //console.log(monitor)

  // Calculate the duration based on endTime, or if endTime is not available, use the current time
  const endMoment = endTime ? moment(endTime) : currentTime;
  const duration = moment.duration(endMoment.diff(moment(monitor?.timestamp)));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  
  return (
    <div>
      <div className="events-table__row">
        {monitor?.isPaused === false ? (
          <>
            {monitor?.status === 'Uptime' && (
              <div className="events-table__col events-table__col--event">
                <div className="events-table__event events-table__event--up">Up</div>
              </div>
            )}
            {monitor?.status === 'Downtime' && (
              <div className="events-table__col events-table__col--event">
                <div className="events-table__event events-table__event--down">Down</div>
              </div>
            )}
          </>
        ) : (
          <>
            
              <div className="events-table__col events-table__col--event">
                <div className="events-table__event events-table__event--paused">Paused</div>
              </div>
            
          </>
        )}

        <div className="events-table__col events-table__col--monitor">{monitor?.name}</div>
        <div className="events-table__col events-table__col--time">{createdAt}</div>
        <div className="events-table__col events-table__col--reason tw-flex">
          {
            monitor?.status === 'Uptime' && (
              <div className="tw-my-auto events-table__reason tw-text-green-500">OK (200)</div>
            )
          }
          {
            monitor?.status === 'Downtime' && (
              <div className="tw-my-auto events-table__reason tw-text-red-500">
                {
                  monitor?.type == "port" ? "Port Closed":"Error (500)"
                }
                </div>
            )
          }
          {
            monitor?.type != "port" && (<>
          <p className='tw-my-auto ml-2' data-tooltip-id="my-tooltip" data-tooltip-content={monitor?.reason}>
          <img className='tw-w-5 tw-h-5 tw-rounded-2xl' src="eye.png" alt="" />
          </p>
          </>) 
          }
          <Tooltip style={{whiteSpace:"pre-wrap"}} className='tw-w-[200px]' id="my-tooltip" />
        </div>

    

        <div className="events-table__col events-table__col--duration">{`${hours} hrs, ${minutes} mins`}</div>
        <button className="events-table__responsive-opener" type="button"></button>
      </div>
      <div className="events-table__row-responsive">
        <dl className="events-table__col-responsive events-table__col-responsive--time">
          <dt>Date-Time:</dt>
          <dd>{createdAt}</dd>
        </dl>
        <dl className="events-table__col-responsive events-table__col-responsive--reason">
          <dt>Reason:</dt>
          <dd>
          {
            monitor?.status === 'Up' && (
              <div className="events-table__reason tw-text-green-500">OK (200)</div>
            )
          }
          {
            monitor?.status === 'Down' && (
              <div className="events-table__reason tw-text-red-500">Error (500)</div>
            )
          }
          </dd>
        </dl>
        <dl className="events-table__col-responsive events-table__col-responsive--duration">
          <dt>Duration:</dt>
          <dd>{`${hours} hrs, ${minutes} mins`}</dd>
        </dl>
      </div>
    </div>
  );
}

export default UptimeEvents;
