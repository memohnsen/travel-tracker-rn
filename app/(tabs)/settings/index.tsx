import CardItem from '@/components/CardItem'
import { ScrollView, Text, View } from 'react-native'

const Settings = () => {
  return (
    <ScrollView 
      className='bg-background flex-1 p-4' 
      contentInsetAdjustmentBehavior='automatic' 
    >
      <CardItem title="Completion %" />
      <CardItem title="Badges" />
      <CardItem title="Passport" />
      <CardItem title="Submit Feedback" />

      <View className='items-center justify-center mt-8'>
        <Text className='text-gray-400'>TravelTracker Version 1.0.0</Text>
      </View>
    </ScrollView>
  )
}

export default Settings