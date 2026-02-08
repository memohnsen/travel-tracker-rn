import { GlassView } from 'expo-glass-effect';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, Text, View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Index() {
  const cameraPosition = {
    coordinates: {
      latitude: 39.833,
      longitude: -98.583,
    },
    zoom: 4
  }

  const progress: number = 50

  if (Platform.OS === 'ios') {
    return (
      <>
        <AppleMaps.View 
          style={{ flex: 1 }} 
          cameraPosition={cameraPosition}
          uiSettings={{
            myLocationButtonEnabled: false
          }}
        />
        <GlassView
          style={{
            position: 'absolute',
            bottom: 120,
            padding: 16,
            borderRadius: 24,
            height: 104,
            width: '91.666%',
            alignSelf: 'center',
          }}
        >
          <View className='flex-row justify-between'>
            <View className='flex gap-2'>
              <Text className='text-white font-bold'>Progress</Text>
              <Text className='text-gray-400'>1 of 50 States Visited</Text>
            </View>
            <AnimatedCircularProgress
              size={48}
              width={4}
              fill={progress}
              tintColor="green"
              backgroundColor="#3d5875"
              rotation={360}
            >
              {
                (progress: number) => (
                  <Text className="text-white text-xs">{Math.round(progress).toFixed(0)}%</Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View className='flex-row justify-center items-center content-center mt-2'>
              <View className='rounded bg-green-500 size-2 mr-1 mt-0.5' />
              <Text className='text-gray-400 text-xs mr-4'>Visited</Text>
              <View className='rounded bg-red-500 size-2 mr-1 mt-0.5' />
              <Text className='text-gray-400 text-xs'>Not Visited</Text>
          </View>
        </GlassView>
      </>
    )
  } else {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }} 
        cameraPosition={cameraPosition}
      />
    )
  }
}
