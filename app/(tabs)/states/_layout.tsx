import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTransparent: Platform.OS === 'ios' ? true : false,
            headerLargeTitle: true,
            headerShown: true,
            title: "States",
        }}
        />
    </Stack>
  )
}

export default Layout
