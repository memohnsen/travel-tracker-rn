import { states } from '@/utils/states';
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsCircle } from 'expo-maps/build/apple/AppleMaps.types';
import { useState } from 'react';
import { Platform, Text, View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function Index() {
  const [visitedStates, setVisitedStates] = useState<String[]>([])

  const cameraPosition = {
    coordinates: {
      latitude: 39.833,
      longitude: -98.583,
    },
    zoom: 4
  }

  const markAsVisited = (tappedCircle: AppleMapsCircle) => {
    const stateId = tappedCircle.id

    if (!stateId) {
      return
    }

    if (visitedStates.includes(stateId)) {
      setVisitedStates(prevItems => 
        prevItems.filter(item =>
          item !== stateId
        )
      )
    } else  {
      setVisitedStates(prevItems => [...prevItems, stateId])
    }
  }

  if (Platform.OS === 'ios') {
    // IOS VIEW
    return (
      <>
        <AppleMaps.View 
          style={{ flex: 1 }} 
          cameraPosition={cameraPosition}
          uiSettings={{
            myLocationButtonEnabled: false
          }}
          properties={{
            isTrafficEnabled: false,
            selectionEnabled: false,
            isMyLocationEnabled: false
          }}  
          onCircleClick={(e) => {
            markAsVisited(e)
          }}
          circles={
            states.map((state) => {
              return {
                id: state.id,
                center: { latitude: state.latitude, longitude: state.longitude },
                radius: 60_000,
                color: visitedStates.includes(state.id) ? "green" : "red",
                lineColor: "black",
                lineWidth: 1,
              };
            })
          }
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
          <StatesDetails />
        </GlassView>
      </>
    )
  } else {
    // ANDROID VIEW
    return (
      <>
        <GoogleMaps.View 
          style={{ flex: 1 }} 
          cameraPosition={cameraPosition}
          uiSettings={{
            myLocationButtonEnabled: false
          }}
        />
        <BlurView
          intensity={100}
          tint="dark"
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
          <StatesDetails />
        </BlurView>
      </>
    )
  }
}

// SHARED DETAIL SECTION

function StatesDetails() {
  const progress: number = 50

  const visitedStatesCount = (): String => {
    let count = 0
    states.forEach(state => {
      if (state.visited === true) {
        count ++
      }
    });
    return `${count} of 50 States Visited`
  }

  return(
    <>
      <View className='flex-row justify-between'>
          <View className='flex gap-2'>
            <Text className='text-text-primary font-bold'>Progress</Text>
            <Text className='text-gray-400'>{visitedStatesCount()}</Text>
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
                <Text className="text-text-primary text-xs">{Math.round(progress).toFixed(0)}%</Text>
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
    </>
  )
}