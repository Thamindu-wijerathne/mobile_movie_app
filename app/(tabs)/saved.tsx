import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
    <View className="flex-1 bg-[#0b0e1a] items-center justify-start pt-20 px-6">
      <Text className="text-4xl">🏠</Text>
      <Text className="text-white text-2xl font-bold mt-2">The Tolet</Text>
      <Text className="text-gray-400 text-sm mb-10">Find Your House</Text>

      <View className="w-full">
        <Text className="text-white text-xl font-bold mb-6">Login</Text>

        <Text className="text-gray-300 text-sm mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#888"
          className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-4 border-b border-gray-600"
        />

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-300 text-sm mb-1">Password</Text>
          <TouchableOpacity>
            <Text className="text-gray-400 text-sm">Forgot?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
        />

        <TouchableOpacity className="bg-[#2e3c56] rounded-md py-3 mb-4 items-center">
          <Text className="text-white font-medium">Log In</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 my-2">Or continue with</Text>

        <View className="flex-row justify-between mt-2">
          <TouchableOpacity className="border border-gray-600 rounded-md py-2 px-4 w-[48%] items-center">
            <Text className="text-white">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-600 rounded-md py-2 px-4 w-[48%] items-center">
            <Text className="text-white">Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-gray-400 mt-8">
          Don’t have account? <Text className="text-white font-bold">Create now</Text>
        </Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default Profile;