// SHARED DETAIL SECTION

import { Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

export function StatesDetails({ visitedStates }: { visitedStates: string[] }) {
    const progress: number = 50
  
    return(
      <>
        <View className='flex-row justify-between'>
            <View className='flex gap-2'>
              <Text className='text-text-primary font-bold'>Progress</Text>
              <Text className='text-gray-400'>{visitedStates.length} of 50 States Visited</Text>
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