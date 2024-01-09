import React from 'react'

const GeneratedModules = (props) => {
    let modules = [];
    //generates the reg and horizontal modules

    console.log("Module: ", props.module)
    props.halves ? console.log("Halves: ", props.halves) : console.log("No halves")

    if (props.moduleVariation && props.module?.name !== "Opt-Slim [2.6-4.8mm]"){
        console.log("rendering reg or horizontal")
        for (let i = 0; i < props.totalMods; i++) {
            modules.push(
                <div
                    key={i}
                    className="module"
                    style={{
                        width: `${props.moduleVariation.physical_dimensions_inches.width * props.inch}px`,
                        height: `${props.moduleVariation.physical_dimensions_inches.height * props.inch}px`,
                        border: 'dotted grey 1px'
                    }}
                >
                    {i + 1}
                </div>
            )
        }
    } else if (props.module?.name === "Opt-Slim [2.6-4.8mm]"){
        console.log("rendering opt slim")
        for (let i = 0; i < props.totalMods; i++) {
            modules.push(
                <div
                    key={i}
                    className="module"
                    style={{
                        width: `${props.moduleVariation.physical_dimensions_inches.width * props.inch}px`,
                        height: `${props.moduleVariation.physical_dimensions_inches.height * props.inch}px`,
                        border: 'dotted grey 1px'
                    }}
                >
                    {i + 1}
                </div>
            )
        }
        console.log("props.halves", props.halves)
        if(props.halves > 0){
            console.log('Generating halves')
            for (let i = props.totalMods; i < props.totalMods + props.halves; i++) {
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${props.moduleVariation.physical_dimensions_inches.width * props.inch}px`,
                            height: `${(props.moduleVariation.physical_dimensions_inches.height * props.inch) / 2}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
        }
    }else{//generates the wp modules
        if(props.fives > 0){
            for (let i = 0; i < props.fives; i++) {
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${props.fivesWidth}px`,
                            height: `${props.wpHeight}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
        }
        if(props.fours > 0){
            for(let i = props.fives; i < props.fives + props.fours; i++){
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${props.foursWidth}px`,
                            height: `${props.wpHeight}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
        }
        if(props.threes > 0){
            for(let i = props.fives + props.fours; i < props.fives + props.fours + props.threes; i++){
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${props.threesWidth}px`,
                            height: `${props.wpHeight}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
        }
        if(props.twos > 0){
            for(let i = props.fives + props.fours + props.threes; i < props.fives + props.fours + props.threes + props.twos; i++){
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${props.twosWidth}px`,
                            height: `${props.wpHeight}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
        }
    }
    return modules;
};

export default GeneratedModules;