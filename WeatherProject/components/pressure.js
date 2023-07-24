import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, G, Path, Text } from 'react-native-svg';

const Pressure = ({ pressure }) => {
  const radius = 150;
  const strokeWidth = 2;
  const diameter = radius * 2;
  const minPressure = 960;
  const maxPressure = 1060;
  const pressureRange = maxPressure - minPressure;
  const pressureAngle = ((pressure - minPressure) / pressureRange) * 180 - 90;

  const allScale = Array.from({ length: pressureRange + 1 }, (_, i) => minPressure + i);

  return (
    <View style={{ aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width="100%" height="100%">
        <G transform={`translate(${radius + strokeWidth - 40 / 2 + 13}, ${radius + strokeWidth + 75 / 2}) scale(0.8)`}>
          <Path
            stroke="black"
            fill="none"
            strokeWidth={4}
            d={`
              M ${radius * 0.9}, 0
              A ${radius * 0.9} ${radius * 0.9} 0 0 0 ${-radius * 0.9}, 0
            `}
          />
          <Path
            stroke="black"
            fill="none"
            strokeWidth={4}
            d={`
              M ${radius * 1}, 0
              A ${radius * 1} ${radius * 1} 0 0 0 ${-radius * 1}, 0
            `}
          />
          {allScale.map((_, i) => {
            const isMajor = i % 5 === 0;
            const scaleAngle = (i / pressureRange) * 180 - 90;
            const scalePosition = {
              x: radius * Math.sin((Math.PI / 180) * scaleAngle),
              y: -radius * Math.cos((Math.PI / 180) * scaleAngle),
            };
            const scaleLength = isMajor ? 0.9 : 0.95;
            const annotationPosition = {
              x: scalePosition.x * (scaleLength + 0.15) + (scalePosition.x > 0 ? -5 : 5),
              y: scalePosition.y * (scaleLength + 0.15),
            };
            
            return (
              <React.Fragment key={`scale${i}`}>
                <Line
                  x1={scalePosition.x * scaleLength}
                  y1={scalePosition.y * scaleLength}
                  x2={scalePosition.x}
                  y2={scalePosition.y}
                  stroke="black"
                  strokeWidth={isMajor ? 2 : 1}
                />
                {isMajor && scaleAngle <= 0 && (
                  <Text
                    x={annotationPosition.x}
                    y={annotationPosition.y}
                    fill="black"
                    fontSize={12}
                    textAnchor="end"
                    alignmentBaseline="middle"
                    stroke="none"
                  >
                    {minPressure + i}
                  </Text>
                )}
                {isMajor && scaleAngle > 0 && (
                  <Text
                    x={annotationPosition.x}
                    y={annotationPosition.y}
                    fill="black"
                    fontSize={12}
                    textAnchor="start"
                    alignmentBaseline="middle"
                    stroke="none"
                  >
                    {minPressure + i}
                  </Text>
                )}
              </React.Fragment>
            );
          })}
          <Line x1={radius * 0.9} y1={0} x2={-radius * 0.9} y2={0} stroke="black" strokeWidth={2} />
          <Path
            stroke="red"
            fill="none"
            strokeWidth={4}
            d={`
              M 0,0
              L ${Math.sin((Math.PI / 180) * pressureAngle) * radius * 0.9}, ${-Math.cos((Math.PI / 180) * pressureAngle) * radius * 0.9}
            `}
          />
          <Circle cx="0" cy="0" r={radius * 0.075} fill="black" />
          <Text
            x={-30}
            y={-40}
            fill="black"
            fontSize={32}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {pressure} hPa
          </Text>

          <Text
            x={-150}
            y={30}
            fill="black"
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            Low
          </Text>
          <Text
            x={150}
            y={30}
            fill="black"
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            High
          </Text>
        </G>
      </Svg>
    </View>
  );
};

export default Pressure;
