import React from 'react';
import { ButtonProps, getColour, getSubName } from '../../../Logic/SlidesHelper';
import SubScreenButton from './SubScreenButton';
import { TouchableOpacity, View } from 'react-native';

/**
 * Second screen buttons of life counter
 * @param props - player, rotation and division values
 */
const SecondScreenButton= (props : ButtonProps) => {
  return (
    (props.rotation === 0 || props.rotation === 180) 
    ? 
      <SecondScreenButtonHorizontal rotation={props.rotation} player={props.player} width={props.width} height={props.height}/>
    : 
      <SecondScreenButtonVertical   rotation={props.rotation} player={props.player} width={props.width} height={props.height}/>
  )
}

/**
 * Second screen buttons of life counter (for horizontal rotations)
 * @param props - player, rotation and division values
 */
const SecondScreenButtonHorizontal = (props : ButtonProps) => {
  /*Constant Initialisation*/
  const player = props.player;
  const rotation = props.rotation;
  const reverseOrder = (rotation === 180);
  const w = props.width;
  const h = props.height;
  const wSub = w/6.5;
  const hSub = h*0.75;

  return (
    
    <TouchableOpacity
    style={{width: w, height: h, backgroundColor: getColour(player) }}
    >
        {/* <View style={{ alignItems: 'centre'}}> */}
        <View style={{width: w, height: h, flexDirection:'row', justifyContent:'space-around', alignItems: 'center'}}>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(0,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(1,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(2,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(3,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(4,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(5,reverseOrder)} width={wSub} height={hSub}/>
        </View>
    </TouchableOpacity>

  )
}

/**
 * Second screen buttons of life counter (for vertical rotations)
 * @param props - player, rotation and division values
 */
const SecondScreenButtonVertical = (props : ButtonProps) => {
  /*Constant Initialisation*/
  const player = props.player;
  const rotation = props.rotation;
  const reverseOrder = (rotation === 270);
  const w = props.width;
  const h = props.height;
  const wSub = w*0.75;
  const hSub = h/6.5;  

  return (
    <TouchableOpacity
    style={{width: w, height: h, backgroundColor: getColour(player) }}
    >
        {/* <View style={{ alignItems: 'centre'}}> */}
        <View style={{width: w, height: h, flexDirection:'column', justifyContent:'space-around', alignItems: 'center'}}>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(0,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(1,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(2,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(3,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(4,reverseOrder)} width={wSub} height={hSub}/>
            <SubScreenButton rotation={rotation} player={player} option={getSubName(5,reverseOrder)} width={wSub} height={hSub}/>
        </View>
    </TouchableOpacity>
  )
}

export default SecondScreenButton;