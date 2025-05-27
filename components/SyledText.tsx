import React from 'react';
import { Text, TextProps } from 'react-native';

export function PoppinsBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Bold' }]} />;
}
export function PoppinsExtraBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-ExtraBold' }]} />;
}
export function PoppinsMedium(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Medium' }]} />;
}
export function PoppinsRegular(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Regular' }]} />;
}
export function PoppinsSemiBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-SemiBold' }]} />;
}
export function PoppinsLight(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins-Light' }]} />;
}