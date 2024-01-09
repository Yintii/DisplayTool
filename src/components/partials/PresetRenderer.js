import React from 'react'
import { roundToFixedUp } from '../../lib/helpers'

const PresetRenderer = (props) => {
    let noPreset = props.module.ruleset.preset_1 === false && props.module.ruleset.preset_2 === false && props.module.ruleset.preset_3 === false && props.module.ruleset.preset_4 === false;

    let outdoorPreset = (props) => {
        return (
            <div className='preset-buttons'>
                {props.module.ruleset.preset_1 &&
                    <div className='preset-btn' onClick={() => props.setPreset('standard')}>1080x1920</div>
                }
                {props.module.ruleset.preset_2 &&
                    <div className='preset-btn'  onClick={() => props.setPreset('bb1')}>10'H x 40'W</div>
                }
                {props.module.ruleset.preset_3 &&
                    <div className='preset-btn' onClick={() => props.setPreset('bb2')}>10.5'H x 40'W</div>
                }
                {props.module.ruleset.preset_4 &&
                    <div className='preset-btn' onClick={() => props.setPreset('bb3')}>14'H x 48'W</div>
                }
                {noPreset &&
                    <p>no preset</p>
                }
            </div>
        )
    }

    let indoorPreset = (props) => {
        return (
            <div className='preset-buttons'>
                {props.module.ruleset.preset_1 &&
                    <div className='preset-btn' onClick={() => props.setPreset('standard')}>1080x1920</div>
                }
                {props.module.ruleset.preset_2 &&
                    <div className='preset-btn' onClick={() => props.setPreset('2k')}>2k</div>
                }
                {props.module.ruleset.preset_3 &&
                    <div className='preset-btn' onClick={() => props.setPreset('4k')}>4k</div>
                }
                {props.module.ruleset.preset_4 &&
                    <div className='preset-btn' onClick={() => props.setPreset('8k')}>8k</div>
                }
                {noPreset &&
                    <p>no preset</p>
                }
            </div>
        )
    }
    
    //presets that are not opt-slim wp modules
    React.useEffect(() => {
        if (!props.module || !props.moduleVariation) return;
        let width_mods = 0;
        let height_mods = 0;
        switch (props.preset) {
            //set the display dimensions in here based on how many 
            //modules of a specific type are needed to fill the preset area	
            case ('standard'):
                console.log('Mod variation: ', props.moduleVariation);
                for (let i = 0; i < 1920; i += props.moduleVariation.resolution.width) {
                    width_mods++;
                }
                for (let i = 0; i < 1080; i += props.moduleVariation.resolution.height) {
                    height_mods++;
                }

                console.log('width mod count: ', width_mods);
                console.log('height mod count: ', height_mods);

                let width = width_mods * (props.moduleVariation.physical_dimensions_inches.width * props.inch);
                let height = height_mods * (props.moduleVariation.physical_dimensions_inches.height * props.inch);
                console.log('width: ', width);
                console.log('height: ', height);

                let finalWidth = roundToFixedUp(width / props.foot, 2);
                let finalHeight = roundToFixedUp(height / props.foot, 2);
                console.log('final width: ', finalWidth);
                console.log('final height: ', finalHeight);

                props.setDisplayDimensions({ width: finalWidth + 1, height: finalHeight + 1});
                break;
            case ('2k'):
                width_mods = Math.ceil(2148 / props.moduleVariation.resolution.width);
                height_mods = Math.ceil(1080 / props.moduleVariation.resolution.height);

                let width_2k = width_mods * (props.moduleVariation.physical_dimensions_inches.width * props.inch);
                let height_2k = height_mods * (props.moduleVariation.physical_dimensions_inches.height * props.inch);

                let finalWidth_2k = roundToFixedUp(width_2k / props.foot, 2);
                let finalHeight_2k = roundToFixedUp(height_2k / props.foot, 2);

                props.setDisplayDimensions({ width: finalWidth_2k, height: finalHeight_2k});
                break;
            case ('4k'):
                for (let i = 0; i < 4096; i += props.moduleVariation.resolution.width) {
                    width_mods++;
                }
                for (let i = 0; i < 2160; i += props.moduleVariation.resolution.height) {
                    height_mods++;
                }
                let width_4k = width_mods * (props.moduleVariation.physical_dimensions_inches.width * props.inch);
                let height_4k = height_mods * (props.moduleVariation.physical_dimensions_inches.height * props.inch);

                let finalWidth_4k = roundToFixedUp(width_4k / props.foot, 2);
                let finalHeight_4k = roundToFixedUp(height_4k / props.foot, 2);


                props.setDisplayDimensions({ width: finalWidth_4k, height: finalHeight_4k});
                break;
            case ('8k'):
                for (let i = 0; i < 7680; i += props.moduleVariation.resolution.width) {
                    width_mods++;
                }
                for (let i = 0; i < 4320; i += props.moduleVariation.resolution.height) {
                    height_mods++;
                }
                let width_8k = width_mods * (props.moduleVariation.physical_dimensions_inches.width * props.inch);
                let height_8k = height_mods * (props.moduleVariation.physical_dimensions_inches.height * props.inch);

                let finalWidth_8k = roundToFixedUp(width_8k / props.foot, 2);
                let finalHeight_8k = roundToFixedUp(height_8k / props.foot, 2);
                
                props.setDisplayDimensions({ width: finalWidth_8k, height: finalHeight_8k});
                break;
            case ('bb1'):
                props.setDisplayDimensions({ height: 10, width: 40 });
                break;
            case ('bb2'):
                props.setDisplayDimensions({ height: 10.5, width: 40 });
                break;
            case ('bb3'):
                props.setDisplayDimensions({ height: 14, width: 48 });
                break;

        }
    }, [props.preset])

    React.useEffect(() => {
        if(!props.module?.name.includes("Opt-Slim WP")) return;

        let _fives;
        let _fours;
        let _threes;
        let _twos;
        let _rows;

        let _width;
        let _height;

        let fivesWidth  = props.module.variations[3].physical_dimensions_inches.width * props.inch;
        let foursWidth  = props.module.variations[2].physical_dimensions_inches.width * props.inch;
        let threesWidth = props.module.variations[1].physical_dimensions_inches.width * props.inch;
        let twosWidth   = props.module.variations[0].physical_dimensions_inches.width * props.inch;
        let modHeight   = props.module.variations[0].physical_dimensions_inches.height * props.inch;

        let fivesResolution  = props.module.variations[3].resolution.width;
        let foursResolution  = props.module.variations[2].resolution.width;
        let threesResolution = props.module.variations[1].resolution.width;
        let twosResolution   = props.module.variations[0].resolution.width;
        let heightResolution = props.module.variations[0].resolution.height;

        switch(props.preset){
            case('standard'):
                _fives  = Math.ceil(1920 / fivesResolution);
                _fours  = Math.ceil((1920 - (_fives * fivesResolution)) / foursResolution);
                _threes = Math.ceil((1920 - (_fives * fivesResolution) - (_fours * foursResolution)) / threesResolution);
                _twos   = Math.ceil((1920 - (_fives * fivesResolution) - (_fours * foursResolution) - (_threes * threesResolution)) / twosResolution);
                _rows   = Math.ceil(1080 / heightResolution);

                _width  = (_fives * fivesWidth) + (_fours * foursWidth) + (_threes * threesWidth) + (_twos * twosWidth);
                _height = _rows * modHeight;

                props.setDisplayDimensions({width: (_width / props.foot).toFixed(2) + 1, height: (_height / props.foot).toFixed(2) + 1});
                break;
            case('2k'):
                _fives  = Math.ceil(2148 / fivesResolution);
                _fours  = Math.ceil((2148 - (_fives * fivesResolution)) / foursResolution);
                _threes = Math.ceil((2148 - (_fives * fivesResolution) - (_fours * foursResolution)) / threesResolution);
                _twos   = Math.ceil((2148 - (_fives * fivesResolution) - (_fours * foursResolution) - (_threes * threesResolution)) / twosResolution);
                _rows   = Math.ceil(1080 / heightResolution);

                _width  = (_fives * fivesWidth) + (_fours * foursWidth) + (_threes * threesWidth) + (_twos * twosWidth);
                _height = _rows * modHeight;

                props.setDisplayDimensions({width: (_width / props.foot).toFixed(2) + 1, height: (_height / props.foot).toFixed(2) + 1});
                break;
            case('4k'):
                _fives  = Math.ceil(4096 / fivesResolution);
                _fours  = Math.ceil((4096 - (_fives * fivesResolution)) / foursResolution);
                _threes = Math.ceil((4096 - (_fives * fivesResolution) - (_fours * foursResolution)) / threesResolution);
                _twos   = Math.ceil((4096 - (_fives * fivesResolution) - (_fours * foursResolution) - (_threes * threesResolution)) / twosResolution);
                _rows   = Math.ceil(2160 / heightResolution);

                _width  = (_fives * fivesWidth) + (_fours * foursWidth) + (_threes * threesWidth) + (_twos * twosWidth);
                _height = _rows * modHeight;

                props.setDisplayDimensions({width: (_width / props.foot).toFixed(2) + 1, height: (_height / props.foot).toFixed(2) + 1});
                break;
            case('8k'):
                _fives  = Math.ceil(7680 / fivesResolution);
                _fours  = Math.ceil((7680 - (_fives * fivesResolution)) / foursResolution);
                _threes = Math.ceil((7680 - (_fives * fivesResolution) - (_fours * foursResolution)) / threesResolution);
                _twos   = Math.ceil((7680 - (_fives * fivesResolution) - (_fours * foursResolution) - (_threes * threesResolution)) / twosResolution);
                _rows   = Math.ceil(4320 / heightResolution);

                _width  = (_fives * fivesWidth) + (_fours * foursWidth) + (_threes * threesWidth) + (_twos * twosWidth);
                _height = _rows * modHeight;

                props.setDisplayDimensions({width: (_width / props.foot).toFixed(2) + 1, height: (_height / props.foot).toFixed(2) + 1});
                break;
        }
        

    }, [props.preset])

      return (
        <div>
            {props.indoorOutdoor == 'indoor' 
                ? indoorPreset(props)
                : outdoorPreset(props)
            }
        </div>
  )
}

export default PresetRenderer;