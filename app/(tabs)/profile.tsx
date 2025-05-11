import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { checkUserLoggedIn, loggedUserDetail, loginUser, logoutUser } from "@/services/appwrite";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup

    const [userData, setUserData] = useState<Models.User<Models.Preferences> | null>(null);
    
    useEffect(() => {
        if (userData) {
          console.log("User data updated:", userData);
        }
      }, [userData]);
      
    // Log in & Sign in form data 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    console.log(email , password);

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

    // login function 
    const handleLogin = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
    
        if (!trimmedEmail || !trimmedPassword) {
            console.error("Email and password are required.");
            return;
        }
    
        try {
            const session = await loginUser(trimmedEmail, trimmedPassword);
            const user = await loggedUserDetail();
            setUserData(user);
            console.log("Logged in:", user);
            setIsLoggedIn(true);


        } catch (error) {
            console.error("Login error:", error);
        }
    };    

    const logout = async () => {
        try {
            await logoutUser();
            setIsLoggedIn(false);
        } catch(error) {
            console.log('logout error : ', error);
        }
    }

    return (
        <SafeAreaView className="bg-primary flex-1">
            <Image source={images.bg} className="absolute w-full z-0" />

            <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <View className="flex-1 items-center justify-start pt-20 px-6 w-full">
                    {/* This when user is logged in */}
                    {isLoggedIn ? (
                            <View>
                                <Text className="text-white text-lg font-semibold">
                                Welcome, {userData?.name}
                            </Text>
                                <View className="items-center relative mt-[20px]">
                                    {/* Horizontal Line through the middle */}
                                    <View className="absolute top-1/2 w-[110%] border-t border-white" />

                                    {/* Profile Picture */}
                                    <Image
                                        source={images.profilePic}
                                        className="w-40 h-40 mr-[65%]"
                                        resizeMode="cover"
                                    />
                                </View>
                                  {/* User Name */}
                                <View className="flex-row items-center mb-4 px-2 mt-5">
                                    <Image
                                    source={icons.user}
                                    className="w-5 h-5"
                                    style={{ tintColor: 'white' }}
                                    />
                                    <Text className="text-white ml-4 text-base font-medium">{userData?.name}</Text>
                                </View>

                                {/* User Email */}
                                <View className="flex-row items-center mb-6 px-2 mt-5">
                                    <Image
                                    source={icons.email}
                                    className="w-5 h-5"
                                    style={{ tintColor: 'white' }}
                                    />
                                    <Text className="text-white ml-4 text-base font-medium">{userData?.email}</Text>
                                </View>

                                <View className="items-end mr-2">
                                    <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-xl" onPress={logout}>
                                    <Text className="text-white font-bold text-sm">Log out</Text>
                                    </TouchableOpacity>
                                </View>

                        </View>
                    ) : (
                        <View className="w-[90%]">
                            <View className="items-center">
                                <Image source={images.logo}/>
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
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
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
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
                                    />
                                    <TouchableOpacity 
                                        className="bg-[#2e3c56] rounded-md py-3 mb-4 items-center"
                                        onPress={handleLogin}
                                    >
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
