import React from 'react';
import ModuleMenu from './partials/ModuleMenu';
import optlogo from '../assets/optec_logo.png'
import optCircle from '../assets/optCircle.svg'
import info from '../assets/info.svg'
import greyInfo from '../assets/info-grey.svg'
import { createPopper } from '@popperjs/core';


const Menu = (props) => {

  function showContactModal() {
    document.querySelector('#contact-modal').style.display = 'flex';
  }

  React.useEffect(() => {

    const man = document.querySelector('#rendering img');
    
    const fixedInfo = document.querySelector('#fixed-info');
    const fixedInfoPopper = document.querySelector('#fixed-info-popper');

    createPopper(fixedInfo, fixedInfoPopper, {
      placement: 'right',
    });

    fixedInfo.addEventListener('mouseenter', () => {
      fixedInfoPopper.style.display = 'block';
      man.style.display = 'none';
    });

    fixedInfo.addEventListener('mouseleave', () => {
      fixedInfoPopper.style.display = 'none';
      man.style.display = 'block';
    });

    const displayInfo = document.querySelector('#display-info');
    const displayInfoPopper = document.querySelector('#display-info-popper');

    createPopper(displayInfo, displayInfoPopper, {
      placement: 'right-start',
    });

    displayInfo.addEventListener('mouseenter', () => {
      displayInfoPopper.style.display = 'block';
      man.style.display = 'none';
    });

    displayInfo.addEventListener('mouseleave', () => {
      displayInfoPopper.style.display = 'none';
      man.style.display = 'block';
    });
  }, [])

  return (
    <div id='menu'>
      <img src={optCircle} id="menu-bg-circle" />
      <div id="menu-header">
        <img src={optlogo} alt="Optec Logo" width={200} />
        <img onClick={()=>showContactModal()} src={info} id="info-btn"/>
      </div>
      <form>
        <h2>Wall Dimensions</h2>
        <div className="input-area">
          <div className="input-item">
            <label>Height</label>
            <input
              type='number'
              placeholder='feet'
              onChange={(event) => props.handleSetFixedWallDimensions("height", event)}
              value={props.fixedWallDimensions.height}
            />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
            onChange={(event) => props.handleSetFixedWallDimensions("width", event)}
            value={props.fixedWallDimensions.width}
          />
          </div>
          <img src={greyInfo} id='fixed-info' className='hoverInfo' />
        </div>
        <div id="fixed-info-popper" className="disclaimer">
          <p>Here you can input dimensions for a 'fixed wall', this is to represent the area that you'd like to fit your Optec display onto.</p>
          <p>Values here are represented in <strong>feet.</strong> Inches can be represented by ~0.083</p>
          <table>
            <tbody>
              <tr><td>1"</td><td>0.08</td><td>5"</td><td>0.41</td><td>9"</td><td>0.75</td></tr>
              <tr><td>2"</td><td>0.16</td><td>6"</td><td>0.50</td><td>10"</td><td>0.83</td></tr>
              <tr><td>3"</td><td>0.25</td><td>7"</td><td>0.58</td><td>11"</td><td>0.91</td></tr>
              <tr><td>4"</td><td>0.33</td><td>8"</td><td>0.66</td><td>12"</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
     
        <h2>Display Dimensions</h2>
        <div className="input-area">
          <div className="input-item">
          <label>Height</label>
          <input
            type='number'
            placeholder='feet'
            onChange={(event) => props.handleSetDisplayDimensions("height", event)}
            value={props.displayDimensions.height}
          />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
            onChange={(event) => props.handleSetDisplayDimensions("width", event)}
            value={props.displayDimensions.width}
          />
          </div>
          <img src={greyInfo} id="display-info" className="hoverInfo"/>
        </div>
        <div id="display-info-popper" className="disclaimer">
          <p>Here you input dimensions for <strong>your desired display size.</strong>The display itself will vary in size depending on the module and variation of said module.</p>
          <p>Values here are represented in <strong>feet.</strong> Inches can be represented by ~0.083</p>
          <table>
            <tbody>
              <tr><td>1"</td><td>0.08</td><td>5"</td><td>0.41</td><td>9"</td><td>0.75</td></tr>
              <tr><td>2"</td><td>0.16</td><td>6"</td><td>0.50</td><td>10"</td><td>0.83</td></tr>
              <tr><td>3"</td><td>0.25</td><td>7"</td><td>0.58</td><td>11"</td><td>0.91</td></tr>
              <tr><td>4"</td><td>0.33</td><td>8"</td><td>0.66</td><td>12"</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
        <ModuleMenu
          setResolution={props.setResolution}
          displayDimensions={props.displayDimensions}
          preset={props.preset}
          setPreset={props.setPreset}
          indoorOutdoor={props.indoorOutdoor}
          module={props.module}
          moduleVariation={props.moduleVariation}
          outdoorModules={props.outdoorModules}
          indoorModules={props.indoorModules}
          setIndoorOutdoor={props.setIndoorOutdoor}
          setModule={props.setModule}
          setRenderer={props.setRenderer}
          setDisplayDimensions={props.setDisplayDimensions}
          setModuleVariation={props.setModuleVariation}
          setInnerDimensions={props.setInnerDimensions}
          setDisplayMargins={props.setDisplayMargins}
          setTotalMods={props.setTotalMods}
          setModuleFactor={props.setModuleFactor}
          setOverallScale={props.setOverallScale}
          foot={props.foot}
          inch={props.inch}
          setFives={props.setFives}
          setFours={props.setFours}
          setThrees={props.setThrees}
          setTwos={props.setTwos}
          setRowTotal={props.setRowTotal}
          setHeightMods={props.setHeightMods}
          setWpHeight={props.setWpHeight}
        />
      </form>
      <div id="main-disclaimer" class="disclaimer">
        ©Optec Displays, Inc. All rights reserved. Not to scale. The images shown are for illustration purposes only. Subject to change without notice.
      </div>
    </div>
  );
}


export default Menu;
