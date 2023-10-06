import  { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading'
const apiUrl = import.meta.env.VITE_SERVER_URL;

function EditMonitor({monitor,closeModal,toast,reload,setReload}) {
  console.log(monitor)
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        token: token,
        url: '' || monitor?.url,
        name:'' || monitor?.name,
        port: 0 || monitor?.port,
        frequency: 1 || monitor?.frequency,
        type: 'web' || monitor?.type,
        alertFrequency: 1 || monitor?.alertFrequency,
        contacts: [] 
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Check if the field is frequency or alertFrequency and parse it accordingly
        const parsedValue =
          name === "frequency" || name === "alertFrequency"
            ? parseInt(value, 10)
            : value;
      
        setFormData({ ...formData, [name]: parsedValue });
      };
      

      //console.log(formData)
    
      const create = async (e) => {
        e.preventDefault();
        setLoad(true)
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
                                
                                  <option value="web">Web Based</option>
                                  <option value="port">Port Based</option>
                                  <option value="ping">Ping Based</option>
                          
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

                  <div className="form-group">
                    <label className="form-group__label">Monitoring Frequecy</label>
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
                    <label className="form-group__label">Alert Frequecy</label>
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
                    <p className="new-monitor__notify-text">2 of 7 alert contacts are selected.</p>
                    <div className="new-monitor__notify-table">
                      <table className="table notify-contacts">
                        <thead>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type">Type</td>
                            <td className="notify-contacts__contact">Alert Contact</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>info@pixelframe.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>pixelframe@gmail.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>admin@youtube.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>user@facebook.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>info@smashingemagazine.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>staff@99designs.com</span></td>
                          </tr>
                          <tr>
                            <td className="notify-contacts__check">
                                                        <label className="control control--checkbox control--labeless">
                                                          <input className="control__input control--labeless" type="checkbox" name="name12"/><span className="control__indicator"></span><span className="control__label">false</span>
                                                        </label>
                            </td>
                            <td className="notify-contacts__type"><span className="notify-contacts__mail"></span></td>
                            <td className="notify-contacts__contact"><span>staff@twitter.com</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="new-monitor__notify-text">New alert contacts can be defined from the&nbsp;<a href="#">My Settings</a>&nbsp;page.</p>
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