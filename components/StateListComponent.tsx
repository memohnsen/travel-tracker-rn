import { USState } from '@/utils/states'
import { Text, TouchableOpacity, View } from 'react-native'

const StateListComponent = ({state}: {state: USState}) => {

    return (
        <View className='flex-row bg-secondary mb-3 p-4 rounded-lg justify-between items-center'>
            <Text className='text-text-primary'>{state.name}</Text>
            <TouchableOpacity>
                <Text className='size-4 border-gray-500 border rounded-full'></Text>
            </TouchableOpacity>
        </View>
    )
}

export default StateListComponent