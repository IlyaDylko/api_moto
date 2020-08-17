import React from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Main from '../screens/Main/Main'
import DriverProfile from '../screens/DriverProfile/DriverProfile'
import DriverRaces from '../screens/DriverRaces/DriverRaces'

const Stack = createStackNavigator()

export default function navigator() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="DriverProfile" component={DriverProfile} />
        <Stack.Screen name="DriverRaces" component={DriverRaces} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
