// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

/**
 * TabBarIcon Component:
 * A wrapper for the Ionicons component tailored for tab bar icons.
 * @param style - Additional style for the icon.
 * @param rest - Remaining properties passed to the Ionicons component.
 */
export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
