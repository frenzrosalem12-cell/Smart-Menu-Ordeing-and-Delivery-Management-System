import { Tabs } from 'expo-router';
import BottomNavigation from '../../components/BottomNavigation';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <BottomNavigation {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="menu" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="reviews" />
    </Tabs>
  );
}
