import React from 'react'
import HorizontalRenderingArea from './HorizontalRenderingArea'

const HorizontalContent = (props) => {

  //useEffect hook to calculate the number of modules that can fit in the display area
  //this needs to be moved to the specific rendering path and used only there
  //2 others like this will need to be created for the other renderers per their needs
  React.useEffect(() => {
    //this doesn't work unless there's a selected module variation
    if (!props.moduleVariation) return

    //using the dimensions of the module variation, (or simply the module if the variations only different in resolution) calculate the number of modules that can tile the display area
    //and the remaining space that is left over is just margin, if any
    let single_mod_width = props.moduleVariation.physical_dimensions_inches.width * props.inch;
    let single_mod_height = props.moduleVariation.physical_dimensions_inches.height * props.inch;

    let mod_width_resolution = props.moduleVariation.resolution.width;
    let mod_height_resolution = props.moduleVariation.resolution.height;

    //we use math.floor for this because it doesn't matter if there's remaining space, we only want to know how many times a whole module can fit in the space, this remaining space will be margin
    let mods_needed_for_width = Math.floor(props.displayDimensions.width * props.foot / single_mod_width)
    //if gt 1, then just set to 1, otherwise set to 0
    let mods_needed_for_height = (props.displayDimensions.height * props.foot / single_mod_height) > 1 ? 1 : 0;

    let innerDims = {
      width: mods_needed_for_width * (props.moduleVariation.physical_dimensions_inches.width * props.inch),
      height: mods_needed_for_height * (props.moduleVariation.physical_dimensions_inches.height * props.inch)
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

    if(mods_needed_for_height > 0 && mods_needed_for_width > 0){
      props.setResolution({
        width: mod_width_resolution * mods_needed_for_width,
        height: mod_height_resolution * mods_needed_for_height
      })
    }else{
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

    <HorizontalRenderingArea
      horizontal_area={props.horizontal_area}
      displayDimensions={props.displayDimensions}
      moduleVariation={props.moduleVariation}
      inch={props.inch}
      foot={props.foot}
      overallScale={props.overallScale}
      fixedWallScale={props.fixedWallScale}
      totalMods={props.totalMods}
      innerDimensions={props.innerDimensions}
      displayMargins={props.displayMargins}
    />

  );
}

export default HorizontalContent;