import React from 'react';
//components
import Menu from './components/Menu';
import Display from './components/Display';
import FixedWall from './components/FixedWall';
import ContactModal from './components/ContactModal';
//css
import './App.css';
//images
import man from './assets/man.svg'
//helper functions
import { 
	scaleArea, roundToFixedUp
} from './lib/helpers';


function App() {
  
  const foot = 30;//px
  const inch = 2.5;//px

  //ref to the reg mod area so we can monitor the edges of the div and choose when to scale the display
  const regular_module_area   = React.useRef(null);
  //ref to the horizontalarea
  const horizontal_area       = React.useRef(null);
  //ref too the wp area
  const wp_area               = React.useRef(null);
  //ref to opt slim regs
  const opt_slim_reg_area     = React.useRef(null);

  //ref of optional fixed wall to monitor the edges of that div and choose when to scale the display,
  //this scaling is intended to happen instead of the display
  const fixed_wall            = React.useRef(null);

  //this will be used to determine switch the renderer in use
  const [renderer, 
         setRenderer]        = React.useState('regular');
  const [preset,
		 setPreset]          = React.useState('');
  //this will be used to determine if the user is building an indoor or outdoor display
  const [indoorOutdoor, 
         setIndoorOutdoor]   = React.useState('indoor');
  //scale shared by the display and the man
  const [overallScale, 
         setOverallScale]    = React.useState(100);

  const [fixedWallScale, 
		 setFixedWallScale] = React.useState(100);
  //the module that will be chosen by the user to build the display
  const [module, 
         setModule]          = React.useState('');
  //will be used to determine if the module is wider than it is tall or vice versa, and then help us determine how to set the flex direction of the module area
  const [moduleFactor, 
         setModuleFactor]    = React.useState(0);
  //total mod count
  const [totalMods, 
         setTotalMods]       = React.useState(0);
  //the variation of the module that will be chosen by the user to build the display
  const [moduleVariation, 
         setModuleVariation] = React.useState('');


  //the dimensions that represent the display built by the modules - pixels representing each dimension in decimal feet
  //we will be able to take the remainder of the decimal feet and convert it to inches by multiplying it by the inch variable(2.5)
  const [displayDimensions, 
         setDisplayDimensions]      = React.useState({width: '', height: ''})

  const [renderedDisplayFeetWidth, 
		 setRenderedDisplayFeetWidth]    = React.useState(0);

  const [renderedDisplayFeetHeight,
		 setRenderedDisplayFeetHeight]   = React.useState(0);

  const [renderedDisplayInchesWidth,
		 setRenderedDisplayInchesWidth]  = React.useState(0);

  const [renderedDisplayInchesHeight,
		 setRenderedDisplayInchesHeight] = React.useState(0);

  const [resolution,
		setResolution]              = React.useState({width: '', height: ''});
  //this will be used to calculate the dimensions of the fixed wall, an optional wall that can be added to the display to gauge how the display will look on a fixed wall of a particular size
  const [fixedWallDimensions, 
         setFixedWallDimensions]    = React.useState({width: '', height: ''})
  const [oldFixedWallDimensions, 
         setOldFixedWallDimensions] = React.useState({width: '', height: ''})
  const [innerDimensions, 
		 setInnerDimensions]        = React.useState({width: '', height: ''})
  const [displayMargins,
         setDisplayMargins]         = React.useState({width: '', height: ''})
  
  //function to handle the change of the display dimensions depending 
  //on the dimension that is being changed
  function handleSetDisplayDimensions(dimension = null, event){
      //save the old dimensions so we can compare them to the new dimensions later for scaling purposes
      if (dimension == 'width'){
        setDisplayDimensions({...displayDimensions, width: event.target.value > 0 ? event.target.value : ''});
      }else if(dimension == 'height'){
        setDisplayDimensions({...displayDimensions, height: event.target.value > 0 ? event.target.value : ''});
      }else{
        return;
      }
  }

  function handleSetFixedWallDimensions(dimension = null, event){
	  //save the old dimensions so we can compare them to the new dimensions later for scaling purposes
	  setOldFixedWallDimensions({...fixedWallDimensions});
	  if (dimension == 'width'){
		setFixedWallDimensions({...fixedWallDimensions, width:  event.target.value > 0 ? event.target.value : ''});
	  }else if(dimension == 'height'){
		setFixedWallDimensions({...fixedWallDimensions, height: event.target.value > 0 ? event.target.value : ''});
	  }else{
		return;
	  }
  }

  //The scaling logic for the display and the fixed wall will need to have variations for each as well so that 
  //the logic for the margins is appropriately handled for each case
  React.useEffect(() => {
	if(fixedWallDimensions.width > 0 && fixedWallDimensions.height > 0) return;
	if(renderer == 'regular'){
    scaleArea('display', overallScale, regular_module_area, fixed_wall, displayDimensions, setOverallScale);
	}else if(renderer == 'horizontal'){
	scaleArea('display', overallScale, horizontal_area, fixed_wall, displayDimensions, setOverallScale);
	} else if(renderer == 'wp'){
	scaleArea('display', overallScale, wp_area, fixed_wall, displayDimensions, setOverallScale);
	} else if(renderer == 'opt_slim_reg'){
	scaleArea('display', overallScale, opt_slim_reg_area, fixed_wall, displayDimensions, setOverallScale);
	}
  }, [displayDimensions, overallScale, fixedWallDimensions]);

  React.useEffect(() => {
	if(renderer == 'regular'){
	scaleArea('fixed_wall', fixedWallScale, regular_module_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
	}else if(renderer == 'horizontal'){
	scaleArea('fixed_wall', fixedWallScale, horizontal_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
	}else if(renderer == 'wp'){
	scaleArea('fixed_wall', fixedWallScale, wp_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
	}else if(renderer == 'opt_slim_reg'){
	scaleArea('fixed_wall', fixedWallScale, opt_slim_reg_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
	}
  }, [fixedWallDimensions, fixedWallScale]);


  React.useEffect(() => {
	  if (!document.querySelector('.rendering-area'))return;
	// if the display dimensions are larger than non zero fixed wall dimensions, we want to change the background color of the modules to be a transparent red color
	if(Number(innerDimensions.width) > Number(fixedWallDimensions.width) && Number(fixedWallDimensions.width) > 0 && Number(fixedWallDimensions.height > 0)
		|| Number(innerDimensions.height) > Number(fixedWallDimensions.height) && Number(fixedWallDimensions.width) > 0 && Number(fixedWallDimensions.height > 0)){
		document.querySelector('.rendering-area').style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
	}else{
		document.querySelector('.rendering-area').style.backgroundColor = 'rgba(255, 255, 255, 1)';
	}
  }, [displayDimensions, fixedWallDimensions,innerDimensions])

React.useEffect(() => {
	let feetWidth = Number(innerDimensions.width);

	feetWidth = Number(feetWidth.toString().split('.')[0]);

	let inchesWidth = Number(roundToFixedUp(Number(innerDimensions.width), 3).slice(-3));	

	inchesWidth = Number((inchesWidth / 83).toString().split('.')[0]);

	let feetHeight = Number(innerDimensions.height);

	feetHeight = Number(feetHeight.toString().split('.')[0]);

	let inchesHeight = Number(roundToFixedUp(Number(innerDimensions.height), 3).slice(-3));

	inchesHeight = Number((inchesHeight / 83).toString().split('.')[0]);
	

	setRenderedDisplayFeetHeight(feetHeight);
	setRenderedDisplayFeetWidth(feetWidth);
	setRenderedDisplayInchesHeight(inchesHeight);
	setRenderedDisplayInchesWidth(inchesWidth);

}, [moduleVariation, innerDimensions]);


  return (
    <div className="App">
	  <ContactModal 
	  	displayDimensions={displayDimensions}
		innerDimensions={innerDimensions}
		fixedWallDimensions={fixedWallDimensions}
		resolution={resolution}
		module={module}
		moduleVariation={moduleVariation}
		preset={preset}
		totalMods={totalMods}
		foot={foot}
		inch={inch}
	  />
      <Menu
        handleSetDisplayDimensions={handleSetDisplayDimensions}
		handleSetFixedWallDimensions={handleSetFixedWallDimensions}
        displayDimensions={displayDimensions}
		fixedWallDimensions={fixedWallDimensions}
        module={module}
        indoorOutdoor={indoorOutdoor}
        moduleVariation={moduleVariation}
		setPreset={setPreset}
		setResolution={setResolution}
		preset={preset} 
        setIndoorOutdoor={setIndoorOutdoor}
        setModule={setModule}
        setDisplayDimensions={setDisplayDimensions}
        setModuleVariation={setModuleVariation}
        setInnerDimensions={setInnerDimensions}
        setDisplayMargins={setDisplayMargins}
        setTotalMods={setTotalMods}
        setModuleFactor={setModuleFactor}
        setOverallScale={setOverallScale}
        setRenderer={setRenderer}
		foot={foot}
		inch={inch}
      />
		<main>
			<div id="info">
				<p>Module: {module.name}</p>
				{moduleVariation &&
					<p>Variation: {moduleVariation.name}</p>
				}
				<p>Display Height: ~{renderedDisplayFeetHeight}' {renderedDisplayInchesHeight}"</p>
				<p>Display Width: ~{renderedDisplayFeetWidth}' {renderedDisplayInchesWidth}"</p>
				<p>Resolution: {resolution.height} x {resolution.width}</p>
				<p>Module Count: {totalMods}</p>
			</div>

			<div id="rendering">
				<img src={man} height={175} width={122} style={{ scale: `${(fixedWallDimensions.width == 0 || fixedWallDimensions.height == 0) ? overallScale : fixedWallScale}%`, zIndex: 5}} />
				
				  {(fixedWallDimensions.width > 0 && fixedWallDimensions.height > 0)
					  ? <FixedWall 
					  	  displayDimensions={displayDimensions}
						  fixedWallDimensions={fixedWallDimensions}
						  innerDimensions={innerDimensions}
						  displayMargins={displayMargins}
						  resolution={resolution}
						  setResolution={setResolution}
						  module={module}
						  moduleVariation={moduleVariation}
						  moduleFactor={moduleFactor}
						  regular_module_area={regular_module_area}
						  horizontal_area={horizontal_area}
						  wp_area={wp_area}
						  opt_slim_reg_area={opt_slim_reg_area}
						  fixed_wall={fixed_wall}
						  overallScale={overallScale}
						  fixedWallScale={fixedWallScale}
						  totalMods={totalMods}
						  setInnerDimensions={setInnerDimensions}
						  setDisplayMargins={setDisplayMargins}
						  setTotalMods={setTotalMods}
						  setModuleFactor={setModuleFactor}
						  foot={foot}
						  inch={inch}
						  renderer={renderer} 
						/>
					  : <Display
						  displayDimensions={displayDimensions}
						  innerDimensions={innerDimensions}
						  displayMargins={displayMargins}
						  resolution={resolution}
						  setResolution={setResolution}
						  module={module}
						  moduleVariation={moduleVariation}
						  moduleFactor={moduleFactor}
						  regular_module_area={regular_module_area}
						  horizontal_area={horizontal_area}
						  wp_area={wp_area}
						  opt_slim_reg_area={opt_slim_reg_area}
						  overallScale={overallScale}
						  totalMods={totalMods}
						  setInnerDimensions={setInnerDimensions}
						  setDisplayMargins={setDisplayMargins}
						  setTotalMods={setTotalMods}
						  setModuleFactor={setModuleFactor}
						  foot={foot}
						  inch={inch}
						  renderer={renderer}
						  fixedWallDimensions={fixedWallDimensions}
					  />
				  }
			  </div>
		  </main>
    </div>
  );
}

export default App;
