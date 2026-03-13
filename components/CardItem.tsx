import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from "heroui-native";
import { TouchableOpacity } from 'react-native';

interface CardItemProps {
    title: string
}
  
const CardItem = ({title}: CardItemProps) => {
    return (
        <TouchableOpacity>
            <Card className="mb-2 flex-row items-center justify-between rounded-xl">
                <Card.Title className="font-regular text-md">{title}</Card.Title>
                <Ionicons name="chevron-forward-outline" size={24} color="gray" />
            </Card>
        </TouchableOpacity>
    )
}

export default CardItem