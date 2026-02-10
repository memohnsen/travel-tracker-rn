import StateListComponent from '@/components/StateListComponent'
import { states } from '@/utils/states'
import { ScrollView } from 'react-native'

const StateList = () => {
  return (
    <ScrollView 
      className='bg-background flex-1 p-4' 
      contentInsetAdjustmentBehavior='automatic' 
    >
      {states.map((state) => (
        <StateListComponent
          key={state.id}
          state={state}
        />
      ))}
    </ScrollView>
  )
}

export default StateList