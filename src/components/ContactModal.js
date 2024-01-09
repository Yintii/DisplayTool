import React from 'react'
import optlogo from '../assets/optec_logo.png'

const ContactModal = (props) => {

  function closeContactModal(){
    document.getElementById('contact-modal').style.display = 'none'
  }

    let maxCapable = {width:0, height: 0}

    if(props.moduleVariation){
        let single_mod_width = props.moduleVariation.physical_dimensions_inches.width * props.inch;
        let single_mod_height = props.moduleVariation.physical_dimensions_inches.height * props.inch;

        let mods_needed_for_width = Math.floor(props.fixedWallDimensions.width * props.foot / single_mod_width)
        let mods_needed_for_height = Math.floor(props.fixedWallDimensions.height * props.foot / single_mod_height)

        maxCapable.width = mods_needed_for_width * single_mod_width;
        maxCapable.height = mods_needed_for_height * single_mod_height;
    }else if(props.module.name?.includes('Opt-Slim WP')){
        //handle wp modules
        let fivesWidth = props.module.variations[3].physical_dimensions_inches.width * props.inch;
        let foursWidth = props.module.variations[2].physical_dimensions_inches.width * props.inch;
        let threesWidth = props.module.variations[1].physical_dimensions_inches.width * props.inch;
        let twosWidth = props.module.variations[0].physical_dimensions_inches.width * props.inch;
        let modHeight = props.module.variations[0].physical_dimensions_inches.height * props.inch;

        let _fives = 0;
        let _fours = 0;
        let _threes = 0;
        let _twos = 0;
        let _rows = 0;

        _fives = Math.floor(props.fixedWallDimensions.width * props.foot / fivesWidth);
        let remaining = props.fixedWallDimensions.width * props.foot - _fives * fivesWidth;

        if(remaining >= foursWidth){
            _fours = Math.floor(remaining / foursWidth);
            remaining = remaining - _fours * foursWidth;
        }

        if(remaining >= threesWidth){
            _threes = Math.floor(remaining / threesWidth);
            remaining = remaining - _threes * threesWidth;
        }

        if(remaining >= twosWidth){
            _twos = Math.floor(remaining / twosWidth);
            remaining = remaining - _twos * twosWidth;
        }

        _rows = Math.floor(props.fixedWallDimensions.height * props.foot / modHeight);

        maxCapable.width = (_fives * fivesWidth + _fours * foursWidth + _threes * threesWidth + _twos * twosWidth).toFixed(3);
        maxCapable.height = (_rows * modHeight).toFixed(3);

    }
  return (
    <div id="contact-modal">
        <button id="close-contact-modal" onClick={()=>closeContactModal()}>X</button>
        <div id="modal-content">
            <img src={optlogo} />
              <table>
                  <tbody>
                     <tr>
                          <td>Module Type</td>
                          <td>{props.module.name ? props.module.name : 'No module chosen'}</td>
                      </tr>
                      {props.moduleVariation !== '' &&
                          <tr>
                              <td>Module Variation</td>
                              <td>{props.moduleVariation.name}</td>
                          </tr>
                       } 
                      <tr>
                          <td>Total Modules</td>
                          <td>{props.totalMods}</td>
                      </tr>
                      
                      
                      <tr>
                          <td>Display Resolution:</td>
                          <td>{props.resolution.height ? props.resolution.height : 0} x {props.resolution.width ? props.resolution.width : 0}</td>
                      </tr>
                      <tr>
                          <td>Requested Display Size</td>
                          <td>{props.displayDimensions.height ? props.displayDimensions.height : 0}'H x {props.displayDimensions.width ? props.displayDimensions.width : 0}' W</td>
                      </tr>
                      {props.fixedWallDimensions.width > 0 && props.fixedWallDimensions.height > 0 &&
                          <tr>
                              <td>Display Size capable:</td>
                             <td>{(maxCapable.height / 30).toFixed(3)}'H x {(maxCapable.width / 30).toFixed(3)}'W</td>
                          </tr>
                      }
                  </tbody>
              </table>

                <div id="contact-form">
                  <p>Contact us to build your custom display!</p>
                  <a href="mailto:dpratt@optec.com" target='_blank'>Email</a>
                </div>
        </div>
    </div>
  )
}

export default ContactModal;
