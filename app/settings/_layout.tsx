import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerBackButtonDisplayMode: 'minimal',
            title: 'Settings',
            headerShadowVisible: false,
            headerTransparent: true,
        }} />
    </Stack>
  )
}

export default Layout