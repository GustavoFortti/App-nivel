import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const centerX = width / 2,
  centerY = height / 2;



export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _subscribe();
    StatusBar.setHidden(true, 'fade');
    return () => {
      _unsubscribe();
    };
  }, []);

  const _setInterval = () => {
    DeviceMotion.setUpdateInterval(77);
  };

  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.rotation);
    });
    _setInterval();
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  let { beta, gamma } = data;

  gamma = round(gamma);
  beta = round(beta);

  const cylinderElement = (
    <>
      <Circle cx={centerX} cy={centerY} r="100" fill={((gamma >= -0.02 && gamma <= 0.02) && (beta <= 0.02 && beta >= -0.04)) ? 'black' : 'white' } />
      <Circle
        cx={centerX - (gamma * 90) / 3.14}
        cy={centerY - (beta * 90) / 3.14}
        r="95"
        fill='black'
      />
    </>
  );

  const gammaAlign = gamma <= 1.57 && gamma >= -1.57;

  return (
    <View>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      />
       
      <LinearGradient
        colors={[((gamma >= -0.02 && gamma <= 0.02) && (beta <= 0.02 && beta >= -0.04)) ? 'black' : 'rgb(55, 60, 63)', 'rgb(55, 60, 63)']}
        style={{ padding: 1, alignItems: 'center', borderRadius: 5 }}>
          {gammaAlign && (
            <Svg height={height} width={width} originX={centerX} originY={centerY}>
              {cylinderElement}
            </Svg>
          )}
          {!gammaAlign && <Text color="lightgray">Aqui não</Text>}
      </LinearGradient>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}