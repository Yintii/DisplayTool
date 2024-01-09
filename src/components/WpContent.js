import React from 'react'
import WpRenderingArea from './WpRenderingArea'
 
const WpContent = (props) => {

  const [fives, setFives]   = React.useState(0);
  const [fours, setFours]   = React.useState(0);
  const [threes, setThrees] = React.useState(0);
  const [twos, setTwos]     = React.useState(0);

  const [fivesWidth, setFivesWidth]   = React.useState(0);
  const [foursWidth, setFoursWidth]   = React.useState(0);
  const [threesWidth, setThreesWidth] = React.useState(0);
  const [twosWidth, setTwosWidth]     = React.useState(0);

  const [rowTotal, setRowTotal]     = React.useState(0);
  const [heightMods, setHeightMods] = React.useState(0);
  const [wpHeight, setWpHeight]     = React.useState(0);
  

  React.useEffect(() => {
    if(!props.module.name?.includes('Opt-Slim WP')) return;
    let twosWidth        = props.module.variations[0].physical_dimensions_inches.width * props.inch;
    let threesWidth      = props.module.variations[1].physical_dimensions_inches.width * props.inch;
    let foursWidth       = props.module.variations[2].physical_dimensions_inches.width * props.inch;
    let fivesWidth       = props.module.variations[3].physical_dimensions_inches.width * props.inch;
    let wpHeightPhysical = props.module.variations[0].physical_dimensions_inches.height * props.inch;

    setFivesWidth(fivesWidth);
    setFoursWidth(foursWidth);
    setThreesWidth(threesWidth);
    setTwosWidth(twosWidth);
    
    let twosResolution     = props.module.variations[0].resolution.width;
    let threesResolution   = props.module.variations[1].resolution.width;
    let foursResolution    = props.module.variations[2].resolution.width;
    let fivesResolution    = props.module.variations[3].resolution.width;
    let wpHeightResolution = props.module.variations[0].resolution.height;

    let remaining = 0;
    
    let _fives  = 0;
    let _fours  = 0;
    let _threes = 0;
    let _twos   = 0;

    _fives = Math.floor(props.displayDimensions.width * props.foot / fivesWidth);
    remaining = props.displayDimensions.width * props.foot - _fives * fivesWidth;

    if(remaining >= foursWidth){
      _fours = Math.floor(remaining / foursWidth);
      remaining = remaining - _fours * foursWidth;
    }else{
      _fours = 0;
    }

    if(remaining >= threesWidth){
      _threes = Math.floor(remaining / threesWidth);
      remaining = remaining - _threes * threesWidth;
    }else{
      _threes = 0;
    }

    if(remaining >= twosWidth){
      _twos = Math.floor(remaining / twosWidth);
      remaining = remaining - _twos * twosWidth;
    }else{
      _twos = 0;
    }

    let _rowTotal = _fives + _fours + _threes + _twos;
    let _heightMods = Math.floor(props.displayDimensions.height * props.foot / wpHeightPhysical);
    let total = _rowTotal * _heightMods;

    let totalWidth = _fives * fivesWidth + _fours * foursWidth + _threes * threesWidth + _twos * twosWidth;

    props.setTotalMods(total);

    console.log(_fives, _fours, _threes, _twos, _rowTotal, _heightMods, total);
    setFives(_fives * heightMods);
    setFours(_fours * heightMods);
    setThrees(_threes * heightMods);
    setTwos(_twos * heightMods);
    setRowTotal(_rowTotal);
    setHeightMods(_heightMods);
    setWpHeight(wpHeightPhysical);

    props.setInnerDimensions({
      width: totalWidth / 30,
      height: _heightMods * wpHeightPhysical / 30
    });

    let displayMargins = {
      width: props.displayDimensions.width * props.foot - totalWidth,
      height: props.displayDimensions.height * props.foot - _heightMods * wpHeightPhysical
    }

    props.setDisplayMargins({
      width: displayMargins.width,
      height: displayMargins.height
    });

    if(_rowTotal > 0 && _heightMods > 0 && props.module) {
      props.setResolution({
        width: _fives * fivesResolution + _fours * foursResolution + _threes * threesResolution + _twos * twosResolution,
        height: _heightMods * wpHeightResolution
      })
    }else{
      props.setResolution({
        width: 0,
        height: 0
      })
    }

    props.setModuleFactor(1.5);

  }, [props.module, props.displayDimensions, fives, fours, threes, twos, fivesWidth, foursWidth, threesWidth, twosWidth, rowTotal, heightMods, wpHeight])

  return (
    <WpRenderingArea 
      wp_area={props.wp_area}
      displayDimensions={props.displayDimensions}
      inch={props.inch}
      foot={props.foot}
      overallScale={props.overallScale}
      fixedWallScale={props.fixedWallScale}
      totalMods={props.totalMods}
      innerDimensions={props.innerDimensions}
      displayMargins={props.displayMargins}
      fives={fives}
      fours={fours}
      threes={threes}
      twos={twos}
      fivesWidth={fivesWidth}
      foursWidth={foursWidth}
      threesWidth={threesWidth}
      twosWidth={twosWidth}
      rowTotal={rowTotal}
      heightMods={heightMods}
      wpHeight={wpHeight}
    />
  )
}

export default WpContent;