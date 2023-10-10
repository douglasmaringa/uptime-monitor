import Header from "../components/Header"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Dialog, Transition,Switch } from '@headlessui/react'
import { Fragment, useState,useEffect } from 'react'
import CreateContacts from "../components/Settings/CreateContacts";
import Loading2 from "../components/Loading2";
import ChangePassword from "../components/Settings/ChangePassword";
import DeleteAccount from "../components/Settings/DeleteAccount";
import EditContacts from "../components/Settings/EditContacts";
const apiUrl = import.meta.env.VITE_SERVER_URL;

function Settings() {
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {setIsOpen(false)}
  function openModal() {setIsOpen(true)}

  let [isOpen2, setIsOpen2] = useState(false)
  function closeModal2() {setIsOpen2(false)}
  function openModal2() {setIsOpen2(true)}


  let [reload, setReload] = useState(false)
  let [load, setLoad] = useState(false)
  let [contacts, setContacts] = useState([])

  let [selectedContacts, setSelectedContacts] = useState({})

  //fetch monitor data
  useEffect(() => {
    setLoad(true)
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
          setLoad(false)
        } else {
          console.error('Failed to fetch contacts');
          setLoad(false)
        }
      })
      .catch((error) => {
        console.error('Error fetching contact:', error);
        setLoad(false)
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

  // Function to handle delete button click
  const handleDeleteClick = (contactId) => {
    // Send a DELETE request to delete the contact
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    axios
      .delete(`${apiUrl}/api/user/delete-contact`, {
        data: {
          token: token,
          userId: userId,
          contactId: contactId,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Contact deleted successfully');
          setReload(!reload); // Trigger a reload of contacts
        } else {
          toast.error('Failed to delete contact');
        }
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
        toast.error('An error occurred while deleting contact');
      });
  };

  // Function to handle delete button click
  const handleEditClick = (contact) => {
    setSelectedContacts(contact)
    openModal2()
  }

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(userProfile?.isTwoFactorEnabled);

  const handleToggle = async (value) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/toggle`,
        {
          userId: userId,
          isTwoFactorEnabled: value == "true"? true : false, // Toggle the value
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Toggle successful
        setIsTwoFactorEnabled(!isTwoFactorEnabled); // Update the state
        toast('two-factor authentication toggled successfully');
      }
    } catch (error) {
      // Handle errors here
      console.error('Error toggling two-factor authentication:', error);
      toast('Error toggling two-factor authentication');
    }
  };


  return (
    <div>
    <div className="layout layout--dashboard">
      <Header/>
      <ToastContainer autoClose={2000} />
      
      <div className="layout__body">
        <div className="dashboard-topbar">
          <div className="wrapper wrapper--narrow">
            <div className="dashboard-topbar__headline">
              <h1 className="dashboard-topbar__title">My Settings</h1>
            </div>
          </div>
        </div>
        <div className="settings">
          <div className="settings__layout wrapper wrapper--narrow">
            <div className="settings__col">
              <div className="settings__section settings__section--account panel">
                <header className="settings__section-header">
                  <h2 className="settings__section-title">Account Profile</h2>
                </header>
                <div className="form">
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Personal</h3>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Email</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name" value={userProfile?.email} readOnly/>
                                </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">Total Allowed Monitors</label>
                      <div className="form-group__field">
                      <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name" value={userProfile?.maxMonitors} readOnly/>
                                </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">Total Allowed Contacts</label>
                      <div className="form-group__field">
                      <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name" value={userProfile?.maxContacts} readOnly/>
                                </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group__label">Two Factor Authentication</label>
                      <div className="form-group__field">
                      <label className="field field--wide">
                      <div className="form-group__field">
                      <select
                      className="dropdown tw-text-sm tw-px-3 tw-w-full tw-h-10 tw-rounded-sm tw-border tw-border-gray-300"
                        value={isTwoFactorEnabled}
                        onChange={(e) => handleToggle(e.target.value)}
                          >
                           <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                            </select>
                            </div>
                                </label>
                      </div>
                    </div>
                    
                    <br/>
                    <br/>
                    <br/>
                  </div>
                </div>
              </div>

              <div className="settings__section panel">
              <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Update Password</h3>
                    </div>
                    <br/>
                     <ChangePassword/>
                  </div>
                  </div>


            </div>


            


            <div className="settings__col">
              <div className="settings__section panel">
                <header className="settings__section-header">
                  <h2 className="settings__section-title">Alert Contacts</h2>
                          <button onClick={openModal} className="button button--type-text button--type-text-small button--text-color-green"><span className="button__inner">ADD ALERTS CONTACTS</span></button>
                </header>
                <div className="form">
                  <div className="form__section">
                    <table className="table alert-contacts">
                      <thead>
                        <tr>
                          <td className="alert-contacts__type">Type</td>
                          <td className="alert-contacts__contact">Alert Contact</td>
                          <td className="alert-contacts__action">Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          load ? (<><Loading2/></>):(<>
                          
                         
                        {
                          contacts.map((contact, index) => (
                            <tr key={index}>
                              <td className="alert-contacts__type"><span className="alert-contacts__mail"></span></td>
                              <td className="alert-contacts__contact">{contact.value}</td>
                              <td className="alert-contacts__action">
                              <div className=" tw-mt-2 -mr-2 tw-flex tw-space-x-2">
                             <button
                               className="tw-text-gray-500 hover:tw-text-gray-700 focus:tw-outline-none"
                               onClick={() => handleEditClick(contact)}
                              >
                               Edit
                            </button>
                            <button
                              className="tw-text-red-500 hover:tw-text-red-700 focus:tw-outline-none"
                              onClick={() => handleDeleteClick(contact._id)}
                             >
                             Delete
                            </button>
                           </div>
                              </td>
                            </tr>
                          ))
                        }
                         </>)
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
           

              <div className="settings__section panel">
              <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Delete Account</h3>
                    </div>
                    <br/>
                    <div className="form__text">Uptime Engineer sends an account deletion verification email to the account e-mail. Once the verification link inside the e-mail is clicked, all account information at Uptime Engineer (including the account, monitors, logs and settings will be lost and can not be recovered).&nbsp;<span className="red">I still want to delete the account.</span></div>
                    <br/>
                    <DeleteAccount/>
                    
                  </div>
                  </div>

 
            </div>
          </div>
        </div>
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
                <Dialog.Panel className="tw-w-full tw-max-w-xl tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  
                  <div className="tw-mt-2">
                   <CreateContacts close={closeModal} toast={toast} reload={reload} setReload={setReload}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      {/*edit contacts modal*/}
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
                <Dialog.Panel className="tw-w-full tw-max-w-xl tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                  
                  <div className="tw-mt-2">
                   <EditContacts selectedContact={selectedContacts} close={closeModal2} toast={toast} reload={reload} setReload={setReload}/>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>



    <div className="mobile-menu">
      <nav className="mobile-menu__list"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-dashboard" href="#">dashboard</a><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-settings" href="#">my settings</a></nav>
      <nav className="mobile-menu__list mobile-menu__list--bottom"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-logout" href="#">logout</a></nav>
    </div>
   
  </div>
  )
}

export default Settings