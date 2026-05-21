import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import SignOutButton from "@/components/SignOutButton";
import { Ionicons } from "@expo/vector-icons";
import { useUserSync } from "@/hooks/useUserSync";
import PostComposer from "@/components/PostComposer";

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PostComposer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
