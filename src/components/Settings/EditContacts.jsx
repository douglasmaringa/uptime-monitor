import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const apiUrl = import.meta.env.VITE_SERVER_URL;

function EditContacts({ close, toast, reload, setReload, selectedContact }) {
  const [load, setLoad] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    token: token,
    userId: userId,
    contactId: selectedContact._id, // Contact ID to be updated
    medium: selectedContact.medium,
    value: selectedContact.value,
    status: selectedContact.status, // You can change this as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateContact = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const response = await axios.put(
        `${apiUrl}/api/user/update-contact`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Contact updated successfully, you can handle the success here
        toast('Contact updated successfully');
        setReload(!reload);
        close();
      }
    } catch (error) {
      // Handle errors here
      toast('Error updating contact');
      console.error('Error updating contact:', error);
    }
    setLoad(false);
  };

  return (
    <div>
      {/* Modal for updating contact */}
      <div className="" id="update-contact">
        <header className="modal__header">
          <h2 className="modal__title">Edit Alert Contact</h2>
          <button onClick={close} className="modal__close" type="button" data-close="modal">
            X
          </button>
        </header>
        <form className="form update-contact">
          <div className="modal__body">
            <div className="update-contact__layout">
              <div className="update-contact__col update-contact__col--left">
                <fieldset className="update-contact__section">
                  <div className="update-contact__section-header">
                    <h3 className="update-contact__section-title">Contact Information</h3>
                  </div>
                  <div className="update-contact__section-body">
                    <div className="form-group">
                      <label className="form-group__label">Medium</label>
                      <div className="form-group__field">
                        <div className="select">
                          <select
                            className="tw-text-sm tw-px-3 tw-h-10 tw-rounded-sm tw-border tw-border-gray-300"
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
                      <div className="form-group__field ">
                        <input
                          type="text"
                          className="tw-text-sm tw-px-3 tw-w-full tw-bg-slate-50 tw-h-10 tw-rounded-sm tw-border tw-border-gray-300"
                          name="value"
                          value={formData.value}
                          onChange={handleInputChange}
                          placeholder="Enter email address or phone number"
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
                onClick={updateContact}
                className="button button--color-green"
              >
                <span className="button__inner">{load ? <Loading /> : 'Update Contact'}</span>
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default EditContacts;
