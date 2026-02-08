import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Label hidden />
            <Icon sf={{ default: "map", selected: "map.fill"}} />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="list">
            <Label hidden />
            <Icon sf={{ default: "checklist.unchecked", selected: "checklist.checked"}} />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="settings">
            <Label hidden />
            <Icon sf={{ default: "gearshape", selected: "gearshape.fill"}} />
          </NativeTabs.Trigger>
        </NativeTabs>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  )
}
