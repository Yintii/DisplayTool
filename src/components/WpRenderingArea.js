import React from 'react'
import GeneratedModules from './partials/GeneratedModules';

const WpRenderingArea = (props) => {
    return (
        <div
            className="rendering-area"
            ref={props.wp_area}
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
                    flexFlow: 'column wrap',
                    top: '35%',
                    height: `${props.wpHeight * props.heightMods}px`,
                    margin: `${props.displayMargins.height / 2}px ${props.displayMargins.width / 2}px`,
                }}
            >
            <GeneratedModules
                totalMods={props.totalMods}
                inch={props.inch}
                fives={props.fives}
                fours={props.fours}
                threes={props.threes}
                twos={props.twos}
                fivesWidth={props.fivesWidth}
                foursWidth={props.foursWidth}
                threesWidth={props.threesWidth}
                twosWidth={props.twosWidth}
                rowTotal={props.rowTotal}
                heightMods={props.heightMods}
                wpHeight={props.wpHeight}
            />
            </div>
        </div>
    )
}

export default WpRenderingArea;