import React from 'react'
import GeneratedModules from './partials/GeneratedModules';

const OptSlimRegRenderingArea = (props) => {
    return (
        <div
            className="rendering-area"
            ref={props.opt_slim_reg_area}
            style={{
                width: `${props.displayDimensions.width * props.foot + 2}px`,
                height: `${props.displayDimensions.height * props.foot + 2}px`,
                border: 'dashed black 1px',
                scale: `${props.fixedWallScale ? 100 : props.overallScale}%`,
                top: `${props.fixedWallScale ? '' : '45%'}`
            }}
        >
            <div
                className="mod-wrapper"
                style={{
                    flexFlow: 'row wrap',
                    top: '35%',
                    margin: `${props.displayMargins.height / 2}px ${props.displayMargins.width / 2}px`,
                }}
            >
                {props.moduleVariation && (
                    <GeneratedModules
                        totalMods={props.totalMods}
                        moduleVariation={props.moduleVariation}
                        inch={props.inch}
                        halves={props.halves}
                        module={props.module}
                    />
                )}
            </div>
        </div>
    )
}
export default OptSlimRegRenderingArea;