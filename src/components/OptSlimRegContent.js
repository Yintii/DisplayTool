import React from 'react'
import OptSlimRegRenderingArea from './OptSlimRegRenderingArea'

const OptSlimRegContent = (props) => {
    //useEffect hook to calculate the number of modules that can fit in the display area
    //this needs to be moved to the specific rendering path and used only there
    //2 others like this will need to be created for the other renderers per their needs
    const [halves, setHalves] = React.useState(0);

    React.useEffect(() => {
        //this doesn't work unless there's a selected module variation
        if (!props.moduleVariation) return

        //using the dimensions of the module variation, (or simply the module if the variations only different in resolution) calculate the number of modules that can tile the display area
        //and the remaining space that is left over is just margin, if any
        let single_mod_width = props.moduleVariation.physical_dimensions_inches.width * props.inch;
        let single_mod_height = props.moduleVariation.physical_dimensions_inches.height * props.inch;

        let half_height = single_mod_height / 2;

        console.log("Half the height: ", half_height)

        let mod_width_resolution = props.moduleVariation.resolution.width;
        let mod_height_resolution = props.moduleVariation.resolution.height;

        let half_res = mod_height_resolution / 2;

        console.log("Half the resolution: ", half_res);

        //we use math.floor for this because it doesn't matter if there's remaining space, we only want to know how many times a whole module can fit in the space, this remaining space will be margin
        let mods_needed_for_width = Math.floor(props.displayDimensions.width * props.foot / single_mod_width)
        let mods_needed_for_height = Math.floor(props.displayDimensions.height * props.foot / single_mod_height)

        let available_area = props.displayDimensions.height * props.foot - mods_needed_for_height * single_mod_height;
        console.log("Available area: ", available_area);


        let halves_needed = Math.floor(available_area / half_height);

        console.log("Halves needed: ", + halves_needed * mods_needed_for_width)

        setHalves(halves_needed * mods_needed_for_width);

        let innerDims = {
            width: mods_needed_for_width * (props.moduleVariation.physical_dimensions_inches.width * props.inch),
            height: mods_needed_for_height * (props.moduleVariation.physical_dimensions_inches.height * props.inch) + half_height * halves_needed
        }

        props.setInnerDimensions({
            width: innerDims.width / props.foot,
            height: innerDims.height / props.foot
        });

        let displayMargins = {
            width: props.displayDimensions.width * props.foot - innerDims.width,
            height: props.displayDimensions.height * props.foot - innerDims.height
        }

        props.setDisplayMargins({
            width: displayMargins.width,
            height: displayMargins.height
        });

        if (mods_needed_for_height > 0 && mods_needed_for_width > 0 && props.moduleVariation) {
            props.setResolution({
                width: mod_width_resolution * mods_needed_for_width,
                height: mod_height_resolution * mods_needed_for_height + half_res * halves_needed
            })
        } else {
            props.setResolution({
                width: 0,
                height: 0
            })
        }

        //I don't think we need to save the information related to the number needed for height and width, just use it to calculate the space the modules take up then use that to calculate the margin, then use it to calculate the total modules needed to make the rendered display
        let total = mods_needed_for_width * mods_needed_for_height;
        props.setTotalMods(total);

        //we use the module factor to determine if the module is wider than it is tall or vice versa, and then help us determine how to set the flex direction of the module area
        props.setModuleFactor(props.moduleVariation.physical_dimensions_inches.width / props.moduleVariation.physical_dimensions_inches.height);


    }, [props.moduleVariation, props.displayDimensions]);

    return (

        <OptSlimRegRenderingArea
            opt_slim_reg_area={props.opt_slim_reg_area}
            displayDimensions={props.displayDimensions}
            moduleVariation={props.moduleVariation}
            module={props.module}
            inch={props.inch}
            foot={props.foot}
            overallScale={props.overallScale}
            fixedWallScale={props.fixedWallScale}
            totalMods={props.totalMods}
            innerDimensions={props.innerDimensions}
            displayMargins={props.displayMargins}
            halves={halves}
        />

    );
}

export default OptSlimRegContent;