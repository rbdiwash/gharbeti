import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import logo from "../assets/5.png";
import mainLogo from "../assets/icon.png";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#0e2f4f", white: "#fff" };

const slides = [
  {
    id: "1",
    image: require("../assets/image1.png"),
    title: "Seamless Rent Management",
    subtitle: "Track payments, send reminders, and manage rent effortlessly.",
  },
  {
    id: "2",
    image: require("../assets/image2.png"),
    title: "Daily Rent Calculations",
    subtitle: "Simplify rent management with automatic daily calculations.",
  },
  {
    id: "3",
    image: require("../assets/image3.png"),
    title: "Automatic Rent Receipts",
    subtitle:
      "Get instant digital receipts after each rent payment for hassle-free record keeping.",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item?.image}
        style={{ height: "70%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const SplashScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        {/* <Image
          source={logo}
          className="w-20 h-24 text-center flex items-center mx-auto"
        /> */}

        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View>
              <TouchableOpacity
                onPress={() => navigation.replace("tenantLogin")}
                className={"bg-white rounded px-4 py-2 text-center"}
              >
                <Text className="text-center font-bold">GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="w-full flex flex-row items-center justify-between">
              <TouchableOpacity
                activeOpacity={0.8}
                className={"text-white bg-transparent"}
                onPress={skip}
              >
                <Text className={"text-white font-bold"}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                className={"bg-white rounded px-4 py-2"}
              >
                <Text className="font-bold">Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Image
        source={mainLogo}
        style={{ height: "15%", width, resizeMode: "contain", marginTop: 20 }}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.6 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
    overflow: "hidden",
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SplashScreen;
