import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTransparent: true,
            headerLargeTitle: true,
            headerShown: true,
            title: "States",
        }}
        />
    </Stack>
  )
}

export default Layout
