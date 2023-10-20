import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading'
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_SERVER_URL;

function EditMonitor({monitor,closeModal,toast,reload,setReload,contacts}) {
  
  console.log(monitor?.contacts)
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem('token');
  const [selectedContacts, setSelectedContacts] = useState([]);

    const [formData, setFormData] = useState({
        token: token,
        url:  monitor?.url,
        name: monitor?.name,
        port:  monitor?.port,
        frequency: monitor?.frequency,
        type:  monitor?.type,
        alertFrequency: monitor?.alertFrequency,
        contacts: [] 
      });

      useEffect(() => {
        // Initialize selectedContacts with the contacts initially selected for the monitor
        setSelectedContacts(monitor?.contacts || []);
      }, [monitor]);
    
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Check if the field is frequency or alertFrequency and parse it accordingly
        const parsedValue =
          name === "frequency" || name === "alertFrequency" || name === "port"
            ? parseInt(value, 10)
            : value;
      
        setFormData({ ...formData, [name]: parsedValue });
      };
      

      //console.log(formData)
    
      const create = async (e) => {
        e.preventDefault();
        setLoad(true)
         //add contacts to formData
         formData.contacts = selectedContacts;
         console.log(formData)
         
         try {
          const response = await axios.put(`${apiUrl}/api/monitor/monitors/${monitor?._id}`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            // Monitor created successfully, you can handle the success here
            toast('Monitor updated successfully');
            setReload(!reload)
            closeModal()
            //window.location.reload();
          }
        } catch (error) {
          // Handle errors here
          toast('Error creating monitor');
          console.error('Error creating monitor:', error);
        }
        setLoad(false)
      };

      // Add a function to check if all fields are filled in
  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.url.trim() !== '';
  };

  const handleContactSelection = (contactValue) => {
    // Check if the contact is already selected
    const isSelected = selectedContacts.includes(contactValue);

    if (isSelected) {
      // If selected, remove it from the array
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((contact) => contact !== contactValue)
      );
    } else {
      // If not selected, add it to the array
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contactValue,
      ]);
    }
  };


  console.log(selectedContacts)
    
  return (
    <div>   {/*modal for new monitor*/}
    
    <div className="" id="new-monitor">
      <header className="modal__header">
        <h2 className="modal__title">Edit Monitor</h2>
        <button onClick={closeModal} className="modal__close" type="button" data-close="modal">X</button>
      </header>
      <form className="form new-monitor">
        <div className="modal__body">
          <div className="new-monitor__layout">
            <div className="new-monitor__col new-monitor__col--left">
              <fieldset className="new-monitor__section">
                <div className="new-monitor__section-header">
                  <h3 className="new-monitor__section-title">Monitor Information</h3>
                </div>
                <div className="new-monitor__section-body">
                  <div className="form-group">
                    <label className="form-group__label">Monitor Type</label>
                    <div className="form-group__field">
                              <div className="select">
                                <select
                                 className='tw-text-sm tw-px-3 tw-h-10 tw-rounded-sm tw-border tw-border-gray-300'
                                 placeholder="Please select"
                                 name="type"
                                 value={formData.type}
                                 onChange={handleInputChange}>
                                
                                  <option value="web">Web/Http</option>
                                  <option value="port">Port</option>
                                  <option value="ping">Ping</option>
                          
                                </select>
                              </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-group__label">Friendly Name</label>
                    <div className="form-group__field">
                              <label className="field field--wide">
                                <input 
                                type="text"
                                placeholder=" "
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                />
                              </label>
                    </div>
                  </div>
                  <div className="form-group">
                     {
                       formData.type === 'web' && (
                        <label className="form-group__label">URL - http://www.example.com (or IP) - http://123.456.789</label>
                       )
                     }

                     {
                       formData.type === 'port' && (
                        <label className="form-group__label">URL - www.example.com (or IP) - 123.456.789</label>
                       )
                     }

                     {
                       formData.type === 'ping' && (
                        <label className="form-group__label">URL - www.example.com (or IP) - 123.456.789</label>
                       )
                     }
                    
                    <div className="form-group__field">
                            <label className="field field--wide">
                            <input
                            type="text"
                            placeholder=" "
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                          />
                              </label>
                    </div>
                  </div>

                  {
                       formData.type === 'port' && (
                  <div className="form-group">
                    <label className="form-group__label">Port</label>
                    <div className="form-group__field">
                              <label className="field field--wide">
                                <input 
                                type="number"
                                placeholder=" "
                                name="port"
                                value={formData.port}
                                onChange={handleInputChange}
                                />
                              </label>
                    </div>
                  </div>
                       )}


                  <div className="form-group">
                    <label className="form-group__label">Monitoring Frequency</label>
                    <div className="form-group__field">
                              <div className="select">
                                <select
                                 className='tw-text-sm tw-border tw-border-gray-300 tw-px-3 tw-h-10 tw-rounded-sm'
                                 placeholder="Please select"
                                 name="frequency"
                                 value={formData.frequency}
                                 onChange={handleInputChange}>
                                  <option value="1">Every 1 minute</option>
                                  <option value="5">Every 5 minutes</option>
                                  <option value="10">Every 10 minutes</option>
                                  <option value="20">Every 20 minutes</option>
                                  <option value="30">Every 30 minutes</option>
                                  <option value="60">Every 60 minutes</option>
                          
                                </select>
                              </div>
                    </div>
                  </div>


                  <div className="form-group">
                    <label className="form-group__label">Alert Frequency</label>
                    <div className="form-group__field">
                              <div className="select">
                                <select
                                 className='tw-text-sm tw-border tw-border-gray-300 tw-px-3 tw-h-10 tw-rounded-sm'
                                 placeholder="Please select"
                                 name="alertFrequency"
                                 value={formData.alertFrequency}
                                 onChange={handleInputChange}>
                                  <option value="1">Every 1 minute</option>
                                  <option value="5">Every 5 minutes</option>
                                  <option value="10">Every 10 minutes</option>
                                  <option value="20">Every 20 minutes</option>
                                  <option value="30">Every 30 minutes</option>
                                  <option value="60">Every 60 minutes</option>
                          
                                </select>
                              </div>
                    </div>
                  </div>
                  

                  
                </div>
              </fieldset>
              
            </div>

            <div className="new-monitor__col new-monitor__col--right">
              <fieldset className="new-monitor__section">
                <div className="new-monitor__section-header">
                  <h3 className="new-monitor__section-title">Select Alert Contacts To Notify</h3>
                  <div className="new-monitor__notify">
                    <p className="new-monitor__notify-text">{selectedContacts?.length} of {contacts?.length} alert contacts are selected.</p>
                    <div className="new-monitor__notify-table">
                      <table className="table notify-contacts">
                        <thead>
                          <tr>
                            <td className="notify-contacts__check">
                                                        
                            </td>
                            <td className="notify-contacts__type">Type</td>
                            <td className="notify-contacts__contact">Alert Contact</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            contacts?.map((contact) => (
                              <tr key={contact._id}>
                              <td className="notify-contacts__check">
                                                          <label className="control control--checkbox control--labeless">
                                                            <input className="control__input control--labeless" type="checkbox" name="name12"
                                                            onChange={() => handleContactSelection(contact?.value)}
                                                            checked={selectedContacts.includes(
                                                              contact?.value
                                                            )}
                                                            /><span className="control__indicator"></span><span className="control__label">false</span>
                                                          </label>
                              </td>
                              <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                              <td className="notify-contacts__contact"><span>{contact?.value}</span></td>
                            </tr>
                            ))
                            
                          }
                          
                        </tbody>
                      </table>
                    </div>
                    <p className="new-monitor__notify-text">New alert contacts can be defined from the&nbsp;<Link to="/settings">My Settings</Link>&nbsp;page.</p>
                  </div>
                </div>
              </fieldset>
            </div>

          </div>
        </div>
        <footer className="modal__footer">
          <div className="modal__footer-col"></div>
          <div className="modal__footer-col">
                    <button disabled={isFormValid() ? false : true} 
                     onClick={create}
                    className="button button--color-green"><span className="button__inner">{load? <Loading/> :  "Save Monitor"}</span></button>
          </div>
        </footer>
      </form>
    </div>
    </div>
  )
}

export default EditMonitor