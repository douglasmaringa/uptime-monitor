import React from 'react';
import moment from 'moment';

function UptimeEvents({ status, monitor }) {
  console.log(monitor)
  const createdAt = moment.utc(monitor?.timestamp).format('YYYY-MM-DD HH:mm:ss');

  const currentTime = moment();
  const endTime = monitor?.endTime; // Assuming the endTime is available in the monitor object

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
        <div className="events-table__col events-table__col--reason">
          {
            monitor?.status === 'Uptime' && (
              <div className="events-table__reason tw-text-green-500">OK (200)</div>
            )
          }
          {
            monitor?.status === 'Downtime' && (
              <div className="events-table__reason tw-text-red-500">Error (500)</div>
            )
          }
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
