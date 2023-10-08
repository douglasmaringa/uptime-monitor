import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const apiUrl = import.meta.env.VITE_SERVER_URL;

function CreateContacts({ close, toast, reload, setReload }) {
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    token: token,
    userId: userId, // You need to set this to the user's ID
    medium: 'email', // Default to 'email', you can change this as needed
    value: '', // This will store the email address or phone number
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const create = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await axios.post(`${apiUrl}/api/user/add-contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Contact added successfully, you can handle the success here
        toast('Contact added successfully');
        setReload(!reload);
        close();
      }
    } catch (error) {
      // Handle errors here
      toast('Error adding contact');
      toast(error?.response?.data?.error);
      console.error('Error adding contact:', error);
    }
    setLoad(false);
  };

  return (
    <div>
      {/* modal for new monitor */}
      <div className="" id="new-monitor">
        <header className="modal__header">
          <h2 className="modal__title">Add Alert Contacts</h2>
          <button onClick={close} className="modal__close" type="button" data-close="modal">
            X
          </button>
        </header>
        <form className="form update-contact">
          <div className="modal__body">
            <div className="update-contact__layout">
              <div className="new-monitor__col new-monitor__col--left">
                <fieldset className="new-monitor__section">
                  <div className="new-monitor__section-header">
                    <h3 className="new-monitor__section-title">Contact Information</h3>
                  </div>
                  <div className="update-contact__section-body">
                    <div className="form-group">
                      <label className="form-group__label">Medium</label>
                      <div className="form-group__field">
                        <div className="select">
                          <select
                            className="tw-text-sm tw-px-3 tw-w-full tw-h-10 tw-rounded-sm tw-border tw-border-gray-300"
                            placeholder="Please select"
                            name="medium"
                            value={formData.medium}
                            onChange={handleInputChange}
                          >
                            <option value="email">Email</option>
                            <option value="sms" disabled>
                              SMS (Not Available)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group tw-mb-6">
                      <label className="form-group__label">Value</label>
                      <div className="form-group__field">
                        <input
                          type="text"
                          className="tw-text-sm tw-w-full tw-px-3 tw-h-10 tw-rounded-sm tw-border tw-border-gray-300"
                          name="value"
                          value={formData.value}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                        />
                      </div>
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
                disabled={formData.medium === 'sms' || formData.value.trim() === ''}
                onClick={create}
                className="button button--color-green"
              >
                <span className="button__inner">{load ? <Loading /> : 'Add Contact'}</span>
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default CreateContacts;
