import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { createUser, loggedUserDetail, loginUser, logoutUser } from "@/services/appwrite";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
    const [showSuccessMessage, setSShowSuccessMessage] = useState(false);

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

    console.log(name,email , password, confirmPassword);

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

        // signin function 
        const handleSignin = async () => {
            const trimmedName = name.trim();
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            const trimmedConfirmPassword = confirmPassword.trim();

 
        
            if (!trimmedEmail || !trimmedPassword || !trimmedName || !trimmedConfirmPassword) {
                console.error("Email and password are required.");
                return;
            }

            if (trimmedPassword !== trimmedConfirmPassword){
                console.error('password incorrecnt')
                return;
            }

            try {
                const newUser = await createUser(trimmedEmail, trimmedPassword, trimmedName);
                console.log('new user created :', newUser);
                // change to log in page
                setSShowSuccessMessage(true);
                toggleSignUp();

                setTimeout(() => {
                    setSShowSuccessMessage(false);
                }, 3000);

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
                    {/* Success message box */}
                    {showSuccessMessage && (
                        <View className="absolute top-5 right-5 bg-green-500 px-5 py-3 rounded-xl">
                        <Text className="text-white text-sm font-bold">Account Created Successfully</Text>
                        </View>
                    )}
                    {/* This when user is logged in */}
                    {isLoggedIn ? (
                            <View className="w-full">
                                <Text className="text-white text-2xl font-bold mb-4 text-center">
                                Welcome, {userData?.name}
                                </Text>
                                <View className="items-center relative mt-[20px] mb-8">
                                    {/* Horizontal Line through the middle */}
                                    <View className="absolute top-1/2 w-[110%] border-t border-white/30" />

                                    {/* Profile Picture */}
                                    <View className="bg-[#2e3c56] p-2 rounded-full border-4 border-[#3d4e6d]">
                                    <Image source={images.profilePic} className="w-32 h-32 rounded-full" resizeMode="cover" />
                                    </View>
                                </View>
                                  {/* User Name */}
                                <View className="flex-row items-center mb-4 px-4 py-3 bg-[#1c2339] rounded-xl">
                                    <Image source={icons.user} className="w-6 h-6" style={{ tintColor: "#e0e0ff" }} />
                                    <Text className="text-white ml-4 text-base font-medium">{userData?.name}</Text>
                                </View>

                                {/* User Email */}
                                <View className="flex-row items-center mb-8 px-4 py-3 bg-[#1c2339] rounded-xl">
                                    <Image source={icons.email} className="w-6 h-6" style={{ tintColor: "#e0e0ff" }} />
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
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                        placeholder="Enter your name"
                                        placeholderTextColor="#888"
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-4 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Email</Text>
                                    <TextInput
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#888"
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-4 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Password</Text>
                                    <TextInput
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
                                    />
                                    <Text className="text-gray-300 text-sm mb-1">Confirm Password</Text>
                                    <TextInput
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        className="bg-[#151a2e] text-white rounded-md px-4 py-3 mb-6 border-b border-gray-600"
                                    />
                                    <TouchableOpacity 
                                        className="bg-[#2e3c56] rounded-md py-3 mb-4 items-center"
                                        onPress={handleSignin}>
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
