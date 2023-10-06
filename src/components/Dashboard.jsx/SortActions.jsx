import React, { useState } from 'react';

function SortActions({sortByName,setSortByName,statusSort, setStatusSort,typeSort,setTypeSort,reload,setReload,close}) {
  

  return (
    <div>
      <div className="" id="sort-monitors">
        <header className="modal__header">
          <h2 className="modal__title">Sort Monitors</h2>
          <button onClick={close} className="modal__close" type="button" >
            X
          </button>
        </header>
        <form action="#">
          <div className="modal__body">
            <div className="bulk-actions">
              <div className="form">
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Sort by Name:</label>
                    <div className="form-group__field">
                      <div className="control-group control-group--horizontal">
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="sort-name"
                            value="asc"
                            checked={sortByName === 'asc'}
                            onChange={() => setSortByName('asc')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">A-Z</span>
                        </label>
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="sort-name"
                            value="desc"
                            checked={sortByName === 'desc'}
                            onChange={() => setSortByName('desc')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">Z-A</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Sort by Status:</label>
                    <div className="form-group__field">
                      <div className="control-group control-group--vertical">
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="status-sort"
                            value="active"
                            checked={statusSort === 'active'}
                            onChange={() => setStatusSort('active')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">active</span>
                        </label>
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="status-sort"
                            value="down-up-paused"
                            checked={statusSort === 'paused'}
                            onChange={() => setStatusSort('paused')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">paused</span>
                        </label>
                        
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="form__section">
                  <div className="form-group">
                    <label className="form-group__label">Sort by Type:</label>
                    <div className="form-group__field">
                      <div className="control-group control-group--vertical">
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="type-sort"
                            value="web"
                            checked={typeSort === 'web'}
                            onChange={() => setTypeSort('web')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">web</span>
                        </label>
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="type-sort"
                            value="ping"
                            checked={typeSort === 'ping'}
                            onChange={() => setTypeSort('ping')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">ping</span>
                        </label>
                        <label className="control control--radio undefined">
                          <input
                            className="control__input"
                            type="radio"
                            name="type-sort"
                            value="port"
                            checked={typeSort === 'port'}
                            onChange={() => setTypeSort('port')}
                          />
                          <span className="control__indicator"></span>
                          <span className="control__label">port</span>
                        </label>
                        
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <footer className="modal__footer">
            <div className="modal__footer-col">
              <button onClick={(e)=>{
                e.preventDefault()
                setSortByName('all')
                setStatusSort('all')
                setTypeSort('all')
                setReload(!reload)
              }} className="button button--type-text">
                <span className="button__inner">Reset</span>
              </button>
            </div>
            <div className="modal__footer-col">
              <button onClick={(e)=>{
                e.preventDefault()
                setReload(!reload)
              }} className="button button--color-green">
                <span className="button__inner">Apply</span>
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default SortActions;
