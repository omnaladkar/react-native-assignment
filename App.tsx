// import React, { useEffect } from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import LoginScreen from './src/screens/LoginScreen';
// import TodoScreen from './src/screens/TodoList';
// import ProfileScreen from './src/screens/ProfileScreen';
// import auth from '@react-native-firebase/auth';

// const Tab = createBottomTabNavigator();

// const App = () => {
//   useEffect(() => {
//     SplashScreen.hide();
//   }, []);

//   const user = auth().currentUser;

//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         {user ? (
//           <>
//             <Tab.Screen name="Todo" component={TodoScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//           </>
//         ) : (
//           <Tab.Screen name="Login" component={LoginScreen} />
//         )}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import TodoScreen from './src/screens/TodoList';
import ProfileScreen from './src/screens/ProfileScreen';
import auth from '@react-native-firebase/auth';
import { ThemeProvider, useTheme } from './src/context/TimeContext';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const MainApp = () => {
  const { theme } = useTheme();
  const user = auth().currentUser;

  return (
    <NavigationContainer theme={{ dark: theme === 'dark' }}>
      <Tab.Navigator>
        {user ? (
          <>
            <Tab.Screen name="Todo" component={TodoScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Tab.Screen name="Login" component={LoginScreen} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
