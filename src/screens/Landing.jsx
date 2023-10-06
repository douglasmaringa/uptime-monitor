import { Link } from "react-router-dom"


function Landing() {
  return (
    <div>
    <div className="layout layout--white">
      <div className="layout__header">
        <header className="header">
          <div className="header__wrapper container">
            <div className="header__logo">
              <div className="logo" title="UptimeEngineer"></div>
            </div>
            <div className="header__navigation">
              <ul className="site-nav">
                <li className="site-nav__item site-nav__item--active"><a href="#">Product</a></li>
                <li className="site-nav__item"><a href="#">features</a></li>
                <li className="site-nav__item"><a href="#">About</a></li>
                <li className="site-nav__item"><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="header__user-panel">
              <nav className="login-nav"><Link className="login-nav__item" to="/login">Sign In</Link><Link className="login-nav__item login-nav__item--create" to="/register">Create Account</Link></nav>
            </div>
            <div className="header__mobile-menu-opener">
              <div className="mobile-menu-opener">
                <button className="hamburger hamburger--3dxy"><span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="layout__body">
        <div className="promo-monitoring promo-section">
          <div className="promo-section__header container">
            <h2 className="promo-section__title">Website Performance Monitoring</h2>
            <div className="promo-section__description">
              <p>With Uptime Engineer site monitoring you gain invaluable, and instant, insights to your customers’ experience<br/>and find out how your business can outsmart competition with an amazing end-user experience.</p>
            </div>
          </div>
          <div className="promo-section__container">
            <div className="container">
              <div className="row justify-content-center">
                <form className="promo-monitoring__form col-12 col-md-12 col-lg-9 col-xl-8">
                  <div className="promo-monitoring__form-query">
                            <label className="field field--wide field--size-lg">
                              <input type="text" placeholder="http://" name="input-name"/>
                            </label>
                  </div>
                          <button className="button promo-monitoring__form-button button--cta-orange button--size-lg"><span className="button__inner">Start Monitoring</span></button>
                </form>
              </div>
              <figure className="promo-monitoring__figure">
                <figure className="promo-monitoring__figure-img"></figure>
              </figure>
              <div className="promo-monitoring__statistics">
                <div className="promo-statistics">
                  <div className="row">
                    <div className="col-md-4 col-sm-12 col-12">
                      <div className="promo-statistics__item"><strong className="promo-statistics__item-value">150K+</strong><span className="promo-statistics__item-key">total Users</span></div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-12">
                      <div className="promo-statistics__item"><strong className="promo-statistics__item-value">225K+</strong><span className="promo-statistics__item-key">site monitoring</span></div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-12">
                      <div className="promo-statistics__item"><strong className="promo-statistics__item-value">2,5M+</strong><span className="promo-statistics__item-key">notifications sent</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="promo-why promo-section">
          <div className="promo-section__header container">
            <h2 className="promo-section__title">Why should I choose Uptime Engineer?</h2>
            <div className="promo-section__description">
              <p>Uptime Engineer is a global performance monitoring solution for your websites and web<br/>applications. We help you give your customers the best possible web experience<br/>by offering a Powerful Web Performance Monitoring Solution.</p>
            </div>
          </div>
          <div className="promo-section__container">
            <div className="container">
              <div className="promo-why__articles-list">
                <div className="row">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="promo-why__article">
                              <article className="promo-why-article"><span className="promo-why-article__icon promo-why-article__icon--time"></span>
                                <h2 className="promo-why-article__title">Uptime Monitoring</h2>
                                <div className="promo-why-article__text">
                                  <p>Phasellus tempus quam ut quam tempor pretium. Praesent non massa sit amet purus vulputate volutpat et eleifend est. Cras porta felis quis nunc sagittis a luctus nisi euismod. Ut erat risus, volutpat ac molestie non, auctor eudui semper arcu liquam erat volutpat.</p>
                                </div>
                                <footer className="promo-why-article__footer"><a className="read-more" href="#">Learn more</a></footer>
                              </article>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="promo-why__article">
                              <article className="promo-why-article"><span className="promo-why-article__icon promo-why-article__icon--reports"></span>
                                <h2 className="promo-why-article__title">Detailed Reports</h2>
                                <div className="promo-why-article__text">
                                  <p>Phasellus tempus quam ut quam tempor pretium. Praesent non massa sit amet purus vulputate volutpat et eleifend est. Cras porta felis quis nunc sagittis a luctus nisi euismod. Ut erat risus, volutpat ac molestie non, auctor eudui semper arcu liquam erat volutpat.</p>
                                </div>
                                <footer className="promo-why-article__footer"><a className="read-more" href="#">Learn more</a></footer>
                              </article>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="promo-why__article">
                              <article className="promo-why-article"><span className="promo-why-article__icon promo-why-article__icon--transaction"></span>
                                <h2 className="promo-why-article__title">Transaction Monitoring</h2>
                                <div className="promo-why-article__text">
                                  <p>Phasellus tempus quam ut quam tempor pretium. Praesent non massa sit amet purus vulputate volutpat et eleifend est. Cras porta felis quis nunc sagittis a luctus nisi euismod. Ut erat risus, volutpat ac molestie non, auctor eudui semper arcu liquam erat volutpat.</p>
                                </div>
                                <footer className="promo-why-article__footer"><a className="read-more" href="#">Learn more</a></footer>
                              </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="promo-features promo-section">
          <div className="promo-section__header">
            <h2 className="promo-section__title">Simple. Powerful. Reliable.</h2>
          </div>
          <div className="promo-section__container container">
            <div className="promo-features__list row">
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--real-user"></span>
                  <h3 className="promo-features-item__title">Real User Monitoring</h3>
                  <p className="promo-features-item__text">Gain valuable insight into the performance of your website from actual visitors to deliver a better experience.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--uptime"></span>
                  <h3 className="promo-features-item__title">Uptime Monitoring</h3>
                  <p className="promo-features-item__text">Test and verify your websites availability every minute automatically – over 60 global polling locations.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--transaction"></span>
                  <h3 className="promo-features-item__title">Transaction Monitoring</h3>
                  <p className="promo-features-item__text">Ensure important interactions like signup, search, or downloadable files on your website aren’t slow or broken.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--devops"></span>
                  <h3 className="promo-features-item__title">Devops</h3>
                  <p className="promo-features-item__text">Integrate with Librato to correlate your data with cloud metrics in real time to help you improve performance.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--reliable"></span>
                  <h3 className="promo-features-item__title">Reliable</h3>
                  <p className="promo-features-item__text">All issues are verified by a second opinion to filter out false alerts by double-checking downtime.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--root-analysis"></span>
                  <h3 className="promo-features-item__title">Root Cause Analysis</h3>
                  <p className="promo-features-item__text">Determine the reason behind a website or server outage to resolve the issue and prevent any recurrence.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--management"></span>
                  <h3 className="promo-features-item__title">Incident Management</h3>
                  <p className="promo-features-item__text">Improve your team’s incident workflow with the right alerts to the right person at the right time.</p>
                </div>
              </div>
              <div className="promo-features__item col-md-6 col-lg-3">
                <div className="promo-features-item"><span className="promo-features-item__icon promo-features-item__icon--api"></span>
                  <h3 className="promo-features-item__title">API</h3>
                  <p className="promo-features-item__text">Automate your interactions to create your own applications with the functionality you find in the interface.</p>
                </div>
              </div>
            </div>
            <div className="promo-features__list-navigation">
              <div className="promo-features__list-navigation-inner"></div>
            </div>
          </div>
        </div>
        <div className="promo-tour promo-section">
          <div className="promo-section__header container">
            <h2 className="promo-section__title">Be the first to know of&nbsp;<br/>any issues of your website</h2>
            <div className="promo-section__description">
              <p>With Uptime Engineer website monitoring, you’ll be the first to know when your website is&nbsp;<br/>down or if a transaction is slow or broken. We can also help you deliver a higher quality&nbsp;<br/>web experience using data from our real user monitoring service.</p>
            </div>
          </div>
          <div className="promo-section__container container">
            <div className="promo-tour__steps">
              <div className="promo-tour__line row align-items-center justify-content-between">
                <div className="col-lg-6 order-lg-12">
                  <figure className="promo-tour__step-image"><img src="./assets/images/components/promo-tour/step-1.jpg"/></figure>
                </div>
                <div className="col-lg-5 order-1">
                  <div className="promo-tour__step promo-tour__step--uptime">
                    <h3 className="promo-tour__step-title">Uptime Monitoring</h3>
                    <p className="promo-tour__step-text">Phasellus tempus quam ut quam tempor pretium. Praesent non massa sit amet purus vulputate volutpat et eleifend est Cras porta felis quis.</p><a className="read-more" href="#">Learn more</a>
                  </div>
                </div>
              </div>
              <div className="promo-tour__line row align-items-center justify-content-between">
                <div className="col-lg-7">
                  <figure className="promo-tour__step-image"><img src="./assets/images/components/promo-tour/step-2.jpg"/></figure>
                </div>
                <div className="col-lg-5">
                  <div className="promo-tour__step promo-tour__step--ux">
                    <h3 className="promo-tour__step-title">Real user experience monitoring</h3>
                    <p className="promo-tour__step-text">Phasellus tempus quam ut quam tempor pretium. Praesent non massa sit amet purus vulputate volutpat et eleifend est Cras porta felis quis.</p><a className="read-more" href="#">Learn more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="promo-map promo-section">
          <div className="promo-section__header container">
            <h2 className="promo-section__title">Over 167 global website monitoring&nbsp;<br/>checkpoints... and counting.</h2>
            <div className="promo-section__description">
              <p>When it comes to monitoring your websites, servers, and web applications, location is everything. With Uptrends<br/>network of dedicated global monitoring checkpoints, you can pinpoint where in the world your downtime, errors,<br/>or performance bottlenecks originate, and work quickly to rectify the problem.</p>
            </div>
          </div>
          <div className="promo-map__map-wrap">
            <div className="promo-map__map">
              <div className="promo-map__pin promo-map__pin--1">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--2">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--3">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--4">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--5">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--6">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--7">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--8">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
              <div className="promo-map__pin promo-map__pin--9">
                <div className="promo-map__pin-tooltip"><strong>Montreal</strong><br/><span>9,8935 Sites</span></div>
              </div>
            </div>
          </div>
          <div className="promo-map__cta">
                    <button className="button promo-map__cta-button button--cta-orange button--size-lg"><span className="button__inner">Start Monitoring</span></button>
          </div>
        </div>
      </div>
      <div className="layout__footer">
        <div className="footer">
          <div className="footer__wrapper container">
            <div className="row justify-content-between">
              <div className="col-12 col-md-6 footer__col">
                <div className="footer__logo">
                  <div className="logo" title="UptimeEngineer"></div>
                </div>
                <p className="footer__copy footer__copy--wide-screen">2017 © Uptime Engineer. All Rights Reserved.</p>
              </div>
              <div className="col-12 col-md-6 footer__col footer__col--right">
                <div className="footer__social">
                  <ul className="footer-social">
                    <li className="footer-social__item"><a className="footer-social__link footer-social__link--facebook" href="#" title="facebook"></a></li>
                    <li className="footer-social__item"><a className="footer-social__link footer-social__link--twitter" href="#" title="twitter"></a></li>
                    <li className="footer-social__item"><a className="footer-social__link footer-social__link--instagram" href="#" title="instagram"></a></li>
                    <li className="footer-social__item"><a className="footer-social__link footer-social__link--youtube" href="#" title="YouTube"></a></li>
                  </ul>
                </div>
                <div className="footer__nav">
                  <nav className="footer-nav"><a className="footer-nav__item" href="#">FAQ</a><a className="footer-nav__item" href="#">Privacy</a><a className="footer-nav__item" href="#">Policy</a><a className="footer-nav__item" href="#">Terms & Condition</a></nav>
                </div>
              </div>
              <div className="col-12">
                <p className="footer__copy footer__copy--mobile">2017 © Uptime Engineer. All Rights Reserved.</p>
              </div>
            </div>
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

export default Landing