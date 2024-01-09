import React from 'react'
import GeneratedModules from './partials/GeneratedModules';

const RegularRenderingArea = (props) => {

  return (
    <div 
        className="rendering-area"
        ref={props.regular_module_area}
        style={{
            width:  `${props.displayDimensions.width * props.foot + 2}px`,
            height: `${props.displayDimensions.height * props.foot + 2}px`,
            border: 'dashed black 1px',
            scale: `${props.fixedWallScale ? 100 : props.overallScale}%`,
            top: `${props.fixedWallScale ? '' : '45%'}`
        }}
    >
        <div 
            className="mod-wrapper"
            style={{                
                flexFlow: props.moduleFactor > 1 ? 'column wrap' : 'row wrap',
                top: '35%',
                margin: `${props.displayMargins.height / 2}px ${props.displayMargins.width / 2}px`,
            }}
        >
            {props.moduleVariation && (
                <GeneratedModules 
                    totalMods={props.totalMods} 
                    moduleVariation={props.moduleVariation} 
                    inch={props.inch} 
                /> 
            )}
        </div>       
    </div>
  )
}

export default RegularRenderingArea;