import Header from "../components/Header"


function Settings() {
  return (
    <div>
    <div className="layout layout--dashboard">
      <Header/>
     
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
                      <label className="form-group__label">First-Last Name</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Timezone</label>
                      <div className="form-group__field">
                                <div className="select">
                                  <select name="select" placeholder="Please select">
                                    <option value="-1"></option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                    <option value="4">option 4</option>
                                    <option value="5">option 5</option>
                                  </select>
                                </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="control-group control-group--vertical">
                                <label className="control control--checkbox undefined">
                                  <input className="control__input" type="checkbox" name="name14"/><span className="control__indicator"></span><span className="control__label">Inform me about new features and updates (no more than twice a month). </span>
                                </label>
                                <label className="control control--checkbox undefined">
                                  <input className="control__input" type="checkbox" name="name15"/><span className="control__indicator"></span><span className="control__label">Inform me about development/technical updates (API, IPs used..).</span>
                                </label>
                      </div>
                    </div>
                    <div className="form__text">Note: important updates that can effect your usage of the service will still be delivered.</div>
                  </div>
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Password</h3>
                      <p className="form__section-description">Not required if you wont be updating the password</p>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Current Password</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">New Password</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">Repeat New Password</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                  </div>
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Email</h3>
                      <p className="form__section-description">Your e-mail at now is 99designs@gmail.com</p>
                    </div>
                    <div className="form-group">
                      <label className="form-group__label">New Email</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                  </div>
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Delete Account</h3>
                    </div>
                    <div className="form__text">Uptime Engineer sends an account deletion verification email to the account e-mail. Once the verification link inside the e-mail is clicked, all account information at Uptime Engineer (including the account, monitors, logs and settings will be lost and can not be recovered).&nbsp;<span className="red">I still want to delete the account.</span></div>
                    <div className="form__section-footer">
                              <button className="button button--color-red"><span className="button__inner">Send account deletion e-mail</span></button>
                    </div>
                  </div>
                  <div className="form__footer">
                            <button className="button button--color-green"><span className="button__inner">Update</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings__col">
              <div className="settings__section panel">
                <header className="settings__section-header">
                  <h2 className="settings__section-title">Alert Contacts</h2>
                          <button className="button button--type-text button--type-text-small button--text-color-green"><span className="button__inner">ADD ALERTS CONTACTS</span></button>
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
                        <tr>
                          <td className="alert-contacts__type"><span className="alert-contacts__mail"></span></td>
                          <td className="alert-contacts__contact">info@pixelframe.com</td>
                          <td className="alert-contacts__action">
                            <button className="alert-contacts__action-button alert-contacts__action-button--play" type="button" data-tooltip="Enable Alert Contact"></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="alert-contacts__type"><span className="alert-contacts__mail"></span></td>
                          <td className="alert-contacts__contact">pixelframe@gmail.com</td>
                          <td className="alert-contacts__action">
                            <button className="alert-contacts__action-button alert-contacts__action-button--pause" type="button" data-tooltip="Enable Alert Contact"></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="alert-contacts__type"><span className="alert-contacts__mail"></span></td>
                          <td className="alert-contacts__contact">admin@youtube.com</td>
                          <td className="alert-contacts__action">
                            <button className="alert-contacts__action-button alert-contacts__action-button--pause" type="button" data-tooltip="Enable Alert Contact"></button>
                          </td>
                        </tr>
                        <tr>
                          <td className="alert-contacts__type"><span className="alert-contacts__mail"></span></td>
                          <td className="alert-contacts__contact">user@facebook.com</td>
                          <td className="alert-contacts__action">
                            <button className="alert-contacts__action-button alert-contacts__action-button--delete" type="button" data-tooltip="Enable Alert Contact"></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="settings__section panel">
                <header className="settings__section-header">
                  <h2 className="settings__section-title">API Settings</h2>
                </header>
                <div className="form">
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Main API Key</h3>
                    </div>
                    <div className="form__text">This is the API key that can control almost everything for your account (adding/editing/deleting monitors, alert contacts..).&nbsp;<span className="green">Create the main API key.</span></div>
                    <div className="form__section-footer">
                              <button className="button button--color-green"><span className="button__inner">Create the main API key</span></button>
                    </div>
                  </div>
                  <div className="form__section">
                    <div className="form__section-header">
                      <h3 className="form__section-title">Monitor-Specific API Keys</h3>
                    </div>
                    <div className="form__text">These are the API keys that can only use the read-only GetMonitors API method for a given monitor. They can be safely given to a customer and/or used in client-side code as the main API key wont be revealed.</div>
                    <div className="form-group">
                      <label className="form-group__label">Monitor</label>
                      <div className="form-group__field">
                                <label className="field field--wide">
                                  <input type="text" placeholder=" " name="input-name"/>
                                </label>
                      </div>
                    </div>
                  </div>
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
    <div className="mobile-menu">
      <nav className="mobile-menu__list"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-dashboard" href="#">dashboard</a><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-settings" href="#">my settings</a></nav>
      <nav className="mobile-menu__list mobile-menu__list--bottom"><a className="mobile-menu__item mobile-menu__item--icon mobile-menu__item--icon-logout" href="#">logout</a></nav>
    </div>
   
  </div>
  )
}

export default Settings