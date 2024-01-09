import React from 'react';
//outdoor modules
import IM2 from '../../data/outdoor/intelligent_m2.json'
import ISMD from '../../data/outdoor/infinity_smd.json'
import IRGB from '../../data/outdoor/infinity_rgb.json'
import IGS from '../../data/outdoor/infinity_gs.json'
import ESMD from '../../data/outdoor/envision_smd.json'
import IOSMD from '../../data/outdoor/infinity_one_smd.json'
//indoor modules
import OP1 from '../../data/indoor/opt_panel_1.json'
import OP2 from '../../data/indoor/opt_panel_2.json'
import OS from '../../data/indoor/opt_slim.json'
import OSWP19 from '../../data/indoor/opt_slim_wp_1_9.json'
import OSWP25 from '../../data/indoor/opt_slim_wp_2_5.json'
import OSWP26 from '../../data/indoor/opt_slim_wp_2_6.json'
import OSWP39 from '../../data/indoor/opt_slim_wp_3_9.json'
import OSWP48 from '../../data/indoor/opt_slim_wp_4_8.json'
import OP from '../../data/indoor/opt_poster.json'
import OTV from '../../data/indoor/opt_tv.json'
import OWIN from '../../data/indoor/opt_win.json'
import OCOOL from '../../data/indoor/opt_cool.json'
import OSCORE from '../../data/indoor/opt_score.json'

const ModuleSelector = (props) => {

    //these first two are just for rendering the options as a whole
    const indoorModules = [
        { name: OP2.name, data: OP2 },
        { name: OS.name, data: OS },
        { name: OSWP19.name, data: OSWP19 },
        { name: OSWP25.name, data: OSWP25 },
        { name: OSWP26.name, data: OSWP26 },
        { name: OSWP39.name, data: OSWP39 },
        { name: OSWP48.name, data: OSWP48 },
        { name: OP1.name,    data: OP1 },
        { name: OP.name,     data: OP },
        { name: OTV.name,    data: OTV },
        { name: OWIN.name,   data: OWIN },
        { name: OCOOL.name,  data: OCOOL },
        { name: OSCORE.name, data: OSCORE }

    ]
    const outdoorModules = [
        { name: IM2.name, data: IM2 },
        { name: ISMD.name, data: ISMD },
        { name: IRGB.name, data: IRGB },
        { name: IGS.name, data: IGS },
        { name: ESMD.name, data: ESMD },
        { name: IOSMD.name, data: IOSMD }
    ]

    const optSlimReg = { name: OS.name, data: OS };

    //these are classifying arrays, used to determine which renderer to use
    const regularModules = {
        indoor: [
            { name: OP1.name, data: OP1 },
            { name: OP2.name, data: OP2 },
            { name: IOSMD.name, data: IOSMD },
            { name: OP.name, data: OP },
            { name: OWIN.name, data: OWIN }
        ],
        //outdoor regulars have the appendage logic
        outdoor: [
            { name: IM2.name, data: IM2 },
            { name: ISMD.name, data: ISMD },
            { name: IRGB.name, data: IRGB },
            { name: IGS.name, data: IGS },
            { name: ESMD.name, data: ESMD }
        ]
    }
    const wpModules = [
        { name: 'Opt-Slim WP 1.9mm', data: OSWP19 },
        { name: 'Opt-Slim WP 2.5mm', data: OSWP25 },
        { name: 'Opt-Slim WP 2.6mm', data: OSWP26 },
        { name: 'Opt-Slim WP 3.9mm', data: OSWP39 },
        { name: 'Opt-Slim WP 4.8mm', data: OSWP48 }
    ]
    const horizontalModules = [
        //all these happen to be indoor modules
        { name: OTV.name, data: OTV },
        { name: OCOOL.name, data: OCOOL },
        { name: OSCORE.name, data: OSCORE }
    ];

    //assigns the data for all the associated modules to the module variable
    function handleSetModule(event) {
        switch (event.target.value) {
            case 'infinityOneSMD':
                props.setModule(IOSMD);
                break;
            case 'intelligentM2':
                props.setModule(IM2);
                break;
            case 'infinitySMD':
                props.setModule(ISMD);
                break;
            case 'infinityRGB':
                props.setModule(IRGB);
                break;
            case 'infinityGS':
                props.setModule(IGS);
                break;
            case 'envisionSMD':
                props.setModule(ESMD);
                break;
            case 'optPanel1':
                props.setModule(OP1);
                break;
            case 'optPanel2':
                props.setModule(OP2);
                break;
            case 'optSlim':
                props.setModule(OS);
                break;
            case 'optPoster':
                props.setModule(OP);
                break;
            case 'optTV':
                props.setModule(OTV);
                break;
            case 'optWin':
                props.setModule(OWIN);
                break;
            case 'optCool':
                props.setModule(OCOOL);
                break;
            case 'optScore':
                props.setModule(OSCORE);
                break;
            case 'opt_slim_wp_1_9':
                props.setModule(OSWP19);
                break;
            case 'opt_slim_wp_2_5':
                props.setModule(OSWP25);
                break;
            case 'opt_slim_wp_2_6':
                props.setModule(OSWP26);
                break;
            case 'opt_slim_wp_3_9':
                props.setModule(OSWP39);
                break;
            case 'opt_slim_wp_4_8':
                props.setModule(OSWP48);
                break;
            default:
                return;
        }
        props.setModuleVariation('');
        props.setPreset('');
    }

    //assigns the data for the module variation to the moduleVariation variable
    function handleSetModuleVariation(event) {
        props.setModuleVariation(props.module?.variations?.find(variation => variation.id === parseInt(event.target.value)));
        props.setPreset('');
    }

    React.useEffect(() => {
        console.log("The module was switched to: ", props.module.name)
        props.setModuleVariation('');
        //put all the names of the regular modules into an array
        let regular_modules = regularModules.indoor.map((mod) => mod.name);
        regularModules.outdoor.map((mod) => regular_modules.push(mod.name));
        let wp_modules = wpModules.map((mod) => mod.name);
        let horizontal_modules = horizontalModules.map((mod) => mod.name);

        let a_regular_module = regular_modules.includes(props.module.name);
        let a_wp_module = wp_modules.includes(props.module.name);
        let a_horizontal_module = horizontal_modules.includes(props.module.name);

        let an_opt_slim_reg = props.module.name === optSlimReg.name;

        if (a_regular_module) {
            console.log(`${props.module.name} is a regular module`)
            props.setRenderer('regular');
        } else if (a_wp_module) {
            console.log(`${props.module.name} is a wp module`)
            props.setRenderer('wp');
        } else if (a_horizontal_module) {
            console.log(`${props.module.name} is a horizontal module`)
            props.setRenderer('horizontal');
        } else if (an_opt_slim_reg) {
            console.log(`${props.module.name} is an opt slim reg`)
            props.setRenderer('opt_slim_reg');
        }

        props.setModuleVariation('');
        props.setPreset('');

    }, [props.module]);

    React.useEffect(() => {
        props.setModule('');
        props.setModuleVariation('');
        props.setPreset('');
        //set the first option of select elements to be selected
        let select_elements = document.getElementsByTagName('select');
        if(!select_elements) return;    
        for (let i = 0; i < select_elements.length; i++) {
            select_elements[i].selectedIndex = 0;
        }
    }, [props.indoorOutdoor]);

   React.useEffect(() => {
       props.setModuleVariation('');
       props.setPreset('');
       //set the first option of select elements to be selected
       let select_element = document.getElementById('var-select');
       if (!select_element) return;    
       select_element.selectedIndex = 0;
   }, [props.module])
    
    let variation_and_not_slim = props.module && !props.module.name?.includes('Opt-Slim') && !props.module.name?.includes('Opt-Slim WP');

    let regular_slim_and_not_wp = props.module && props.module.name?.includes('Opt-Slim') && !props.module.name?.includes('Opt-Slim WP');;

    return (
        <>

            {/*if indoorOutdoor is indoor, render indoor modules, otherwise render outdoor modules*/}
            {props.indoorOutdoor === 'indoor' ? (
                <select onChange={(event) => handleSetModule(event)}>
                    <option value="" disabled selected>Choose a module</option>
                    {indoorModules.map((module, index) => {
                        return (
                            <option key={index} value={module.data.value}>{module.name}</option>
                        )
                    })}
                </select>
            ) : (
                <select onChange={(event) => handleSetModule(event)}>
                    <option value="" disabled selected>Choose a module</option>
                    {outdoorModules.map((module, index) => {
                        return (
                            <option key={index} value={module.data.value}>{module.name} </option>
                        )
                    })}
                </select>
            )}
            {/*only render the module variation selector if the module is not empty*/}
            {
                variation_and_not_slim && (
                    <select
                        onChange={(event) => handleSetModuleVariation(event)}
                        id="var-select"
                    >
                        <option value='' selected disabled>Choose a variation</option>
                        {/*map through the variations of the module and render them as options in the select element*/}
                        {props.module?.variations?.map((variation, index) => {
                            return (
                                <option 
                                    key={index} 
                                    value={variation.id}>{variation.name} - {(variation.physical_dimensions_inches.height).toFixed(2)}" x {(variation.physical_dimensions_inches.width).toFixed(2)}" </option>
                            )
                        })}
                    </select>
                )
            }
            {
                regular_slim_and_not_wp && (
                        <select
                            onChange={(event) => handleSetModuleVariation(event)}
                            id="var-select"
                        >
                            <option value='' selected disabled>Choose a variation</option>
                            {/*map through the variations of the module and render them as options in the select element*/}
                            {props.module?.variations?.map((variation, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={variation.id}>{variation.name} </option>
                                )
                            })}
                        </select>
                )
            }
            {/*only render the module variation selector if the module is not empty*/}
        </>
    )
}

export default ModuleSelector;