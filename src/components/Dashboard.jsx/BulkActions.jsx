import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Loading from '../Loading';
const apiUrl = import.meta.env.VITE_SERVER_URL;

function BulkActions({ monitors,reload,setReload,toast,close }) {
  const [selectedMonitors, setSelectedMonitors] = useState([]);
  const [actionDetails, setActionDetails] = useState('pause');
  const [actionApproval, setActionApproval] = useState('');
  const [load, setLoad] = useState(false);

  //console.log(selectedMonitors,actionApproval,actionDetails)

  // Create an array of options from the monitors prop
  const options = monitors?.monitors?.map((monitor) => ({
    value: monitor._id,
    label: monitor.name,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedMonitors(selectedOptions);
  };

  const handleBulkAction = async (e) => {
    e.preventDefault();
    setLoad(true);
    const token = localStorage.getItem('token');
    // Prepare an array of selected monitor IDs
    const monitorIds = selectedMonitors.map((option) => option.value);

    // Prepare the request body
    const requestBody = {
      token: token,
      monitorIds,
      pause: actionDetails == "pause" ?  true : false, // Set this based on your action requirement (pause or resume)
    };

    try {
      // Make an Axios call to the bulk-pause route
      const response = await axios.put(`${apiUrl}/api/monitor/monitors/bulk-pause`, requestBody);
      toast('Bulk action completed successfully');
      // Clear the selected monitors and form fields after a successful action
      setSelectedMonitors([]);
      setActionDetails('');
      setActionApproval('');
      setLoad(false);
      close();
      setReload(!reload);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      setLoad(false);
      // Handle error here
    }
  };

  // Add a function to check if all fields are filled in
  const isFormValid = () => {
    return actionDetails.trim() !== '' && actionApproval == 'yes' && selectedMonitors.length > 0;
  };

  console.log(isFormValid());

  return (
    <div>
      <div className="" id="bulk-actions">
        <header className="modal__header">
          <h2 className="modal__title">Bulk Actions</h2>
          <button onClick={close} className="modal__close" type="button" data-close="modal">
            X
          </button>
        </header>
        <form action="#">
          <div className="modal__body">
            <div className="bulk-actions">
              <div className="form">
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Action Type</label>
                    <div className="form-group__field">
                      <div className="select">
                        <select
                          name="action-details"
                          value={actionDetails}
                          onChange={(e) => setActionDetails(e.target.value)}
                          className="tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-px-3 tw-py-2 tw-text-base"
                        >
                          {/* Add options for action details */}
                          <option value=""></option>
                          <option value="pause">Pause Monitors</option>
                          <option value="activate">Activate Monitors</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Select Monitors</label>
                    <div className="form-group__field">
                      {/* Use react-select for multi-select dropdown */}
                      <Select
                        options={options}
                        isMulti
                        onChange={handleSelectChange}
                        value={selectedMonitors}
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Action Approval</label>
                    <div className="alert alert--danger">
                      Please write&nbsp;<b>yes&nbsp;</b> to the field below to approve
                      the action.
                    </div>
                    <div className="form-group__field">
                      <label className="field field--wide">
                        <input
                          type="text"
                          placeholder=" "
                          name="action-approval"
                          value={actionApproval}
                          onChange={(e) => setActionApproval(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <footer className="modal__footer">
            <div className="modal__footer-col"></div>
            <div className="modal__footer-col">
              <button
                className="button button--color-green"
                onClick={handleBulkAction}
                disabled={!isFormValid()}
              >
                <span className="button__inner">
                  {load ? <><Loading/></> : (<>Complete Action</>)}
                  
                  
                  </span>
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default BulkActions;
