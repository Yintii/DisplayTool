import React from 'react'
import ModuleSelector from './ModuleSelector'
import PresetRenderer from './PresetRenderer'

const ModuleMenu = (props) => {
  //changes from indoor to outdoor and vice versa and makes sure the 
  //values are reset and the appropriate tab is active
  function handleToggleIndoorOutdoor(location) {
    //remove all the modules in the rendering area when switching out from a wp,
    //for some reason the modules don't immediately disappear like the others
    
    props.setIndoorOutdoor(location)
    props.setModule('')
    props.setPreset('')
    props.setDisplayDimensions({ width: '', height: '' })
    props.setModuleVariation('')
    props.setInnerDimensions({ width: '', height: '' })
    props.setDisplayMargins({ width: '', height: '' })
    props.setTotalMods(0)
    props.setModuleFactor(0)
    props.setOverallScale(100)
    props.setModuleVariation('')
    props.setResolution({ width: '', height: '' });    
    props.setRenderer('regular')
    


    if (location === 'indoor') {
      document.getElementById('indoor-tab').classList.add('active')
      document.getElementById('outdoor-tab').classList.remove('active')
    } else {
      document.getElementById('outdoor-tab').classList.add('active')
      document.getElementById('indoor-tab').classList.remove('active')
    }
  }

  return (
    <div id="module-selector">
        <div id="toggle-tabs">
            <div 
              id="outdoor-tab" 
              onClick={() => handleToggleIndoorOutdoor('outdoor')} 
              className="tab">
                Outdoor
            </div>
            <div 
              id="indoor-tab" 
              onClick={() => handleToggleIndoorOutdoor('indoor')} 
              className="active tab">
                Indoor
              </div>
        </div>
        <div id="module-selector-content">
            <ModuleSelector
              preset={props.preset}
              indoorOutdoor={props.indoorOutdoor}
              handleSetModule={props.handleSetModule}
              setPreset={props.setPreset}
              module={props.module}
              setRenderer={props.setRenderer}
              outdoorModules={props.outdoorModules}
              indoorModules={props.indoorModules}
              setModuleVariation={props.setModuleVariation}
              setModule={props.setModule}
            />
        </div>
        {/*Here we need to add the logic for the presets, and they should only show once the variation of the module has been selected, or if it's a wp module, then we should the presets available */}
        {props.moduleVariation && 
          <>
            <h3>Presets</h3>
            <PresetRenderer 
              displayDimensions={props.displayDimensions}
              module={props.module}
              setPreset={props.setPreset}
              indoorOutdoor={props.indoorOutdoor}
              moduleVariation={props.moduleVariation}
              setDisplayDimensions={props.setDisplayDimensions}
              preset={props.preset}
              inch={props.inch}
              foot={props.foot}
            />
          </>
        }
      {props.module?.name?.includes('Opt-Slim WP') &&
        <>
          <h3>Presets</h3>
          <PresetRenderer
            displayDimensions={props.displayDimensions}
            module={props.module}
            setPreset={props.setPreset}
            indoorOutdoor={props.indoorOutdoor}
            moduleVariation={props.moduleVariation}
            setDisplayDimensions={props.setDisplayDimensions}
            preset={props.preset}
            inch={props.inch}
            foot={props.foot}
          />
        </>
      }
    </div>
  )
}

export default ModuleMenu;