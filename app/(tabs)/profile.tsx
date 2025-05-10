import { images } from "@/constants/images";
import { checkUserLoggedIn } from "@/services/appwrite";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await checkUserLoggedIn();
            setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <SafeAreaView className="bg-primary flex-1">
            <Image source={images.bg} className="absolute w-full z-0" />

            <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <View className="flex-1 items-center justify-start pt-20 px-6 w-full">
                    {isLoggedIn ? (
                        <Text className="text-white text-xl font-bold">Welcome back, user!</Text>
                    ) : (
                        <View className="w-[90%]">
                            <View className="items-center">
                                <Image source={images.logo} className=""/>
                                <Text className="text-white text-2xl font-bold mt-2">Movie Time</Text>
                                <Text className="text-gray-400 text-sm mb-10">Find Your Movie</Text>
                            </View>

                            {isSignUp ? (
                                <>
                                    <Text className="text-gray-300 text-sm mb-1">Name</Text>
                                    <TextInput
                                        placeholder="Enter your name"
                                        placeholderTextColor="#888"
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-4 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Email</Text>
                                    <TextInput
                                        placeholder="Enter your email"
                                        placeholderTextColor="#888"
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-4 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Password</Text>
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Confirm Password</Text>
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
                                    />
                                    <TouchableOpacity className="bg-[#2e3c56] rounded-md py-3 mb-4 items-center">
                                        <Text className="text-white font-medium">Sign Up</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}

                            <Text className="text-center text-gray-400 mt-8">
                                {isSignUp ? (
                                    <>
                                        Already have an account?{" "}
                                        <Text className="text-white font-bold" onPress={toggleSignUp}>
                                            Log in
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        Don’t have an account?{" "}
                                        <Text className="text-white font-bold" onPress={toggleSignUp}>
                                            Create now
                                        </Text>
                                    </>
                                )}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
