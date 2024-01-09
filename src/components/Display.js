import React from 'react'
import RegularContent from './RegularContent'
import WpContent from './WpContent'
import HorizontalContent from './HorizontalContent'
import OptSlimRegContent from './OptSlimRegContent'

const Display = (props) => {
  return (
    <>
          {props.renderer == 'regular' &&
              <RegularContent
                  displayDimensions={props.displayDimensions}
                  setTotalModuleDimensions={props.setTotalModuleDimensions}
                  innerDimensions={props.innerDimensions}
                  fixedWallDimensions={props.fixedWallDimensions}

                  resolution={props.resolution}
                  setResolution={props.setResolution}

                  displayMargins={props.displayMargins}

                  module={props.module}
                  moduleVariation={props.moduleVariation}
                  moduleFactor={props.moduleFactor}
                  regular_module_area={props.regular_module_area}

                  fixedWallScale={props.fixedWallScale}
                  overallScale={props.overallScale}

                  totalMods={props.totalMods}
                  setInnerDimensions={props.setInnerDimensions}
                  setDisplayMargins={props.setDisplayMargins}
                  setTotalMods={props.setTotalMods}
                  setModuleFactor={props.setModuleFactor}

                  inch={props.inch}
                  foot={props.foot}
              />
          }
          {
              props.renderer == 'wp' &&
              <WpContent
                  setTotalModuleDimensions={props.setTotalModuleDimensions}
                  displayDimensions={props.displayDimensions}
                  innerDimensions={props.innerDimensions}
                  fixedWallDimensions={props.fixedWallDimensions}

                  resolution={props.resolution}
                  setResolution={props.setResolution}

                  displayMargins={props.displayMargins}

                  module={props.module}
                  moduleFactor={props.moduleFactor}
                  wp_area={props.wp_area}

                  fixedWallScale={props.fixedWallScale}
                  overallScale={props.overallScale}

                  totalMods={props.totalMods}
                  setInnerDimensions={props.setInnerDimensions}
                  setDisplayMargins={props.setDisplayMargins}
                  setTotalMods={props.setTotalMods}
                  setModuleFactor={props.setModuleFactor}

                  inch={props.inch}
                  foot={props.foot}
              />
          }
          {
              props.renderer == 'horizontal' &&
              <HorizontalContent
                  setTotalModuleDimensions={props.setTotalModuleDimensions}
                  displayDimensions={props.displayDimensions}
                  innerDimensions={props.innerDimensions}
                  fixedWallDimensions={props.fixedWallDimensions}

                  resolution={props.resolution}
                  setResolution={props.setResolution}

                  displayMargins={props.displayMargins}

                  module={props.module}
                  moduleVariation={props.moduleVariation}
                  moduleFactor={props.moduleFactor}
                  horizontal_area={props.horizontal_area}

                  fixedWallScale={props.fixedWallScale}
                  overallScale={props.overallScale}

                  totalMods={props.totalMods}
                  setInnerDimensions={props.setInnerDimensions}
                  setDisplayMargins={props.setDisplayMargins}
                  setTotalMods={props.setTotalMods}
                  setModuleFactor={props.setModuleFactor}

                  inch={props.inch}
                  foot={props.foot}
              />
          }
          {
                props.renderer == 'opt_slim_reg' &&
                <OptSlimRegContent
                  setTotalModuleDimensions={props.setTotalModuleDimensions}
                  displayDimensions={props.displayDimensions}
                  innerDimensions={props.innerDimensions}
                  fixedWallDimensions={props.fixedWallDimensions}

                  resolution={props.resolution}
                  setResolution={props.setResolution}

                  displayMargins={props.displayMargins}

                  module={props.module}
                  moduleVariation={props.moduleVariation}
                  moduleFactor={props.moduleFactor}
                  opt_slim_reg_area={props.opt_slim_reg_area}

                  fixedWallScale={props.fixedWallScale}
                  overallScale={props.overallScale}

                  totalMods={props.totalMods}
                  setInnerDimensions={props.setInnerDimensions}
                  setDisplayMargins={props.setDisplayMargins}
                  setTotalMods={props.setTotalMods}
                  setModuleFactor={props.setModuleFactor}

                  inch={props.inch}
                  foot={props.foot}
                />    
          }
    </>
  )
}

export default Display;