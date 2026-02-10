import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';


export default function TabsLayout() {
  return (
    <NativeTabs>
        <NativeTabs.Trigger name="index">
            <Label hidden />
            <Icon sf={{ default: "map", selected: "map.fill"}} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="states">
            <Label hidden />
            <Icon sf={{ default: "checklist.unchecked", selected: "checklist.checked"}} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
            <Label hidden />
            <Icon sf={{ default: "gearshape", selected: "gearshape.fill"}} />
        </NativeTabs.Trigger>
    </NativeTabs>
  )
}
