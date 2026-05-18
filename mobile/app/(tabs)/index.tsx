import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSignOut } from '@/hooks/useSignOut';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  const {handleSignOut} = useSignOut()
  return (
    <SafeAreaView>
    <TouchableOpacity onPress={handleSignOut}>
      <Text>HomeScreen!</Text>
     <Feather name="log-out" size={24} color={"#E0245E"}/>

      
    </TouchableOpacity >
    </SafeAreaView>
  )
}

export default HomeScreen