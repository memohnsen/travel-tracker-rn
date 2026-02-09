import StateListComponent from '@/components/StateListComponent'
import { states } from '@/utils/states'
import { Stack } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

const StateList = () => {
  return (
    <View className='bg-background flex-1'>
      <Stack.Screen options={{
        headerTransparent: true,
        headerLargeTitleEnabled: true,
        title: 'States',
        headerShown: true
      }}/>
      <FlatList
        data={states}
        renderItem={({item}) => <StateListComponent state={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <Text className='text-text-primary text-4xl font-bold mt-16 mb-4'>States</Text>
        }
        className='flex-1 p-4'
      />
    </View>
  )
}

export default StateList