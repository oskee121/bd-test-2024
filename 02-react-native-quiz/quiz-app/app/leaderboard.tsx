import Typography from "@/components/Typography";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
  // AsyncStorage,
} from "react-native";
import { PlayersRank, RankType } from "@/constants/PlayersRank";
import { useEffect, useState } from "react";
import { getDataFromStorage } from "@/repository/storage";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const _windowDimensions = Dimensions.get("window");
const _screenDimensions = Dimensions.get("screen");

export default function LeaderboardScreen() {
  const router = useRouter();
  const [ranks, setRanks] = useState<any[]>([]);
  const [_dimensions, setDimensions] = useState({
    window: _windowDimensions,
    screen: _screenDimensions,
  });
  const [modalHomeVisible, setModalHomeVisible] = useState(false);

  const loadFromMemory = async () => {
    const yourScore: string | undefined = await getDataFromStorage(
      "user.scores"
    );
    if (yourScore === undefined) return false;

    let newScores: RankType[] = [...PlayersRank];
    newScores.push(JSON.parse(yourScore));
    newScores = newScores.sort((a, b) => {
      if (a.current) return b.score - 0.5 - a.score;
      return b.score - a.score;
    });
    setRanks(newScores);
  };
  useEffect(() => {
    setRanks(PlayersRank);
    loadFromMemory();
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => {
      return subscription?.remove();
    };
  });

  function closeModal() {
    setModalHomeVisible(false);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingBottom: 15,
    },
    headerText: {
      paddingTop: 30,
      fontSize: 36,
      textAlign: "center",
      textShadowColor: Colors.white,
      textShadowOffset: { width: 0, height: 1 },
    },
    bodyText: {
      fontWeight: "bold",
    },
    ranksContainer: {
      paddingVertical: 30,
    },
    rankRow: {
      alignItems: "center",
      flexDirection: "row",
      height: 70,
      justifyContent: "center",
    },
    rankCol: {
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      zIndex: 1000,
    },
    rankCurrentImage: {
      position: "absolute",
      zIndex: 0,
    },
    rankTitle: { width: 150 },
    rankText: { fontSize: 24 },
    rankImage: { width: 80, height: 80, zIndex: 1000 },
    rankScore: { width: 80 },
    yourScore: {
      position: "relative",
      width: 180,
      right: 200,
      left: "auto",
      height: 70,
      justifyContent: "center",
      alignItems: "center",
    },
    yourScorePointer: {
      position: "absolute",
      left: "auto",
      right: -180,
      width: 180,
      height: 70,
      top: 30,
      bottom: 0,
      marginVertical: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomToolbarContainer: {
      width: "100%",
      marginHorizontal: 15,
      paddingHorizontal: 15,
    },
    buttonBlue: {
      backgroundColor: Colors.blue,
      paddingVertical: 10,
    },
    buttonStyle: {
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTextWhite: {
      color: Colors.white,
    },
    textWhite: {
      color: Colors.white,
    },
    scrollViewContainer: { flex: 1, width: "100%" },
    scrollView: {
      marginHorizontal: 0,
      width: "100%",
    },
    current: { position: "relative" },
    textModal: {
      color: Colors.dark_gray,
      fontSize: 16,
    },
  });

  const modalStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      paddingLeft: 30,
      paddingRight: 30,
      marginHorizontal: "auto",
      width: "100%",
    },
    modalSection: {
      width: "80%",
      paddingHorizontal: 30,
      paddingVertical: 15,
    },
    modalTopSection: {},
    modalSectionBorder: {
      width: "50%",
      borderColor: Colors.light_gray,
      borderBottomWidth: 1,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "100%",
      maxWidth: 600,
    },
    buttonsContainer: {
      display: "flex",
      columnGap: 30,
      flexDirection: "row",
      width: "100%",
    },
    buttons: {
      alignItems: "center",
      flex: 1,
    },
    button: {
      borderRadius: 20,
      elevation: 2,
      paddingVertical: 10,
    },
    buttonHighlight: {
      backgroundColor: Colors.blue,
    },
    buttonLowProfile: {
      backgroundColor: Colors.light_gray,
    },
    buttonClose: {},
    modalHeader: { fontSize: 24 },
    modalText: {
      textAlign: "center",
      marginBottom: 20,
    },
    modalTextLast: {
      marginBottom: 0,
    },
    modalButtonTextStyle: {
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerText}>Leaderboard</Text>
          <View style={styles.ranksContainer}>
            {ranks.length > 0 &&
              ranks.map((n, index) => (
                <View
                  key={index}
                  style={[styles.rankRow, n.current && styles.current]}
                >
                  {index + 1 === 1 && (
                    <Image
                      source={require("../assets/images/1-winner.png")}
                      width={80}
                      height={80}
                      style={[styles.rankImage]}
                    />
                  )}
                  {index + 1 === 2 && (
                    <Image
                      source={require("../assets/images/2-rank.png")}
                      width={80}
                      height={80}
                      style={[styles.rankImage]}
                    />
                  )}
                  {index + 1 === 3 && (
                    <Image
                      source={require("../assets/images/3-rank.png")}
                      width={80}
                      height={80}
                      style={[styles.rankImage]}
                    />
                  )}
                  {3 < index + 1 && (
                    <Typography
                      style={[
                        styles.rankCol,
                        styles.rankText,
                        styles.rankScore,
                      ]}
                    >
                      {index + 1}
                    </Typography>
                  )}
                  <Typography
                    style={[styles.rankCol, styles.rankTitle, styles.rankText]}
                  >
                    {n.title}
                  </Typography>
                  <Typography
                    style={[styles.rankCol, styles.rankScore, styles.rankText]}
                  >
                    {n.score}
                  </Typography>

                  {/* <View
                style={[styles.rankCol, styles.rankText]}
              > */}
                  {/* </View> */}
                  <View style={[styles.yourScore]}>
                    <Typography
                      style={[
                        styles.rankCol,
                        styles.rankText,
                        styles.yourScorePointer,
                      ]}
                    >
                      {n.current && (
                        <FontAwesome size={36} name="hand-o-left" />
                      )}
                      {n.current && " " + "Your Score"}
                    </Typography>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={[styles.bottomToolbarContainer]}>
        <Pressable
          onPress={() => setModalHomeVisible(true)}
          style={[styles.buttonStyle, styles.buttonBlue]}
        >
          <Typography style={[styles.bodyText, styles.textWhite]}>
            Home
          </Typography>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalHomeVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View>
              <Text
                style={[
                  styles.textModal,
                  modalStyles.modalText,
                  modalStyles.modalHeader,
                ]}
              >
                Are you sure you want to navigate to the start page
              </Text>
            </View>
            <View style={modalStyles.buttonsContainer}>
              <Pressable
                style={[
                  styles.buttonStyle,
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonHighlight,
                ]}
                onPress={() => closeModal()}
              >
                <Text
                  style={[
                    styles.buttonStyle,
                    styles.buttonTextWhite,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.buttonStyle,
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonLowProfile,
                ]}
                onPress={() => router.replace("/")}
              >
                <Text
                  style={[
                    styles.buttonStyle,
                    styles.buttonTextWhite,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Yes! Go to Start Page
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
