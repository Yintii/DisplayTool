import React from 'react'
import Display from './Display';

const FixedWall = (props) => {
  return (
    <div 
        id="fixed-wall"
          ref={props.fixed_wall}
          style={{
              width: `${props.fixedWallDimensions.width * props.foot + 2}px`,
              height: `${props.fixedWallDimensions.height * props.foot + 2}px`,
              border: 'solid black 1px',
              scale: `${props.fixedWallScale}%`,
              top: '45%'
          }}
    >
        <Display
            displayDimensions={props.displayDimensions}
            fixedWallDimensions={props.fixedWallDimensions}
            innerDimensions={props.innerDimensions}
            displayMargins={props.displayMargins}
            resolution={props.resolution}
            setResolution={props.setResolution}
            module={props.module}
            moduleVariation={props.moduleVariation}
            moduleFactor={props.moduleFactor}
            regular_module_area={props.regular_module_area}
            horizontal_area={props.horizontal_area}
            wp_area={props.wp_area}
            opt_slim_reg_area={props.opt_slim_reg_area}
            overallScale={props.overallScale}
            fixedWallScale={props.fixedWallScale}
            totalMods={props.totalMods}
            setInnerDimensions={props.setInnerDimensions}
            setDisplayMargins={props.setDisplayMargins}
            setTotalMods={props.setTotalMods}
            setModuleFactor={props.setModuleFactor}
            foot={props.foot}
            inch={props.inch}
            renderer={props.renderer}
        />
    </div>
  )
}

export default FixedWall;