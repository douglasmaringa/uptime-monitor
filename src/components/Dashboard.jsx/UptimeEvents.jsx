import React from 'react';
import moment from 'moment';

function UptimeEvents({ status, monitor }) {
  // Calculate the createdAt and duration based on monitor.timestamp
  const createdAt = moment(monitor.timestamp).format('YYYY-MM-DD HH:mm:ss');
  const currentTime = moment();
  const duration = moment.duration(currentTime.diff(moment(monitor.timestamp)));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  
  return (
    <div>
      <div className="events-table__row">
        {monitor?.isPaused === false ? (
          <>
            {monitor?.status === 'Up' && (
              <div className="events-table__col events-table__col--event">
                <div className="events-table__event events-table__event--up">Up</div>
              </div>
            )}
            {monitor?.status === 'Down' && (
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
            monitor?.status === 'Up' && (
              <div className="events-table__reason tw-text-green-500">OK (200)</div>
            )
          }
          {
            monitor?.status === 'Down' && (
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