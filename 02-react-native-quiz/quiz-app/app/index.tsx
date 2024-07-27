import Typography from "@/components/Typography";
import { Colors } from "@/constants/Colors";
import { RankType } from "@/constants/PlayersRank";
import {
  Questionnaire,
  QuestionnaireItemType,
} from "@/constants/Questionnaire";
import { storeDataToStorage } from "@/repository/storage";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";

type CheckAnswersDto = { id: number; answer: string };

const _windowDimensions = Dimensions.get("window");
const _screenDimensions = Dimensions.get("screen");

const _defaultTotalHintAvailable = 1;

function apiGetCorrectAnswer(currentId: number) {
  // This should replace with an API.
  const originalItem: QuestionnaireItemType | undefined = Questionnaire.find(
    ({ id }) => id === currentId
  );
  if (!originalItem) return false;
  return originalItem.answers[0];
}
function apiSubmitCheckAllAnswers({
  allAnswersList,
}: {
  allAnswersList: CheckAnswersDto[];
}) {
  // This should be an API
  const findCorrectedAnswersFromStudent = ({ id, answer }: CheckAnswersDto) => {
    return (
      Questionnaire.find((q) => {
        return q.id === id;
      })?.answers[0] === answer
    );
  };

  console.log(JSON.stringify(allAnswersList));

  const score = allAnswersList.filter(findCorrectedAnswersFromStudent).length;

  console.log(score);
  return score;
}

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireItemType[]>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modalStartOverVisible, setModalStartOverVisible] = useState(false);
  const [modalHintVisible, setModalHintVisible] = useState(false);
  const [modalConfirmSubmitVisible, setModalConfirmSubmitVisible] =
    useState(false);
  const [hintAvailable, setHintAvailable] = useState(
    _defaultTotalHintAvailable
  );
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [selectedChoiceList, setSelectedChoiceList] = useState<number[]>([]);
  const [dimensions, setDimensions] = useState({
    window: _windowDimensions,
    screen: _screenDimensions,
  });
  const [playerNameInput, setPlayerNameInput] = useState<string>("");

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

  const nextQuestion = () => {
    if (currentQuestion >= questionnaire.length) return false;
    return setCurrentQuestion(currentQuestion + 1);
  };
  const prevQuestion = () => {
    if (currentQuestion < 0) return false;
    return setCurrentQuestion(currentQuestion - 1);
  };
  function canGoBack() {
    return 0 < currentQuestion;
  }
  function canSubmit() {
    return (
      selectedChoiceList.filter((n) => {
        return n === 0;
      }).length === 0
    );
  }
  function hasNextQuestion() {
    return currentQuestion < questionnaire.length - 1;
  }
  function closeModal() {
    setModalStartOverVisible(false);
    setModalHintVisible(false);
    setModalConfirmSubmitVisible(false);
  }
  function openModal() {
    setModalStartOverVisible(true);
  }
  function startOver() {
    setIsLoading(true);
    setQuestionnaire(shuffleQuestionnaire(Questionnaire));
    setHintAvailable(_defaultTotalHintAvailable);
    setCurrentQuestion(0);
    updateSelectedChoiceForCurrent();
    setIsLoading(false);
  }
  function selectChoice(index: number, questionIndex: number) {
    selectedChoiceList[questionIndex] = index;
    setSelectedChoiceList(selectedChoiceList);
    updateSelectedChoiceForCurrent();
  }

  function useHint() {
    if (hintAvailable === 0) {
      return false;
    }
    const current = questionnaire[currentQuestion];
    const currentId = current.id;

    const correctAnswer = apiGetCorrectAnswer(currentId);
    if (!correctAnswer) return false;

    const indexOfCorrectAnswer = current.answers.indexOf(correctAnswer);
    selectChoice(indexOfCorrectAnswer + 1, currentQuestion);

    setHintAvailable(hintAvailable - 1);
  }
  function updateSelectedChoiceForCurrent() {
    setSelectedChoice(selectedChoiceList[currentQuestion]);
  }
  function checkIfSafeToReset() {
    return selectedChoiceList.filter((choice) => choice > 0).length === 0;
  }
  function canGoNext() {
    return selectedChoice !== 0;
  }
  function canUseHint() {
    return hintAvailable > 0;
  }
  function shuffleQuestionnaire(
    source: QuestionnaireItemType[]
  ): QuestionnaireItemType[] {
    return [...source].sort(sortShuffle).map(({ answers, ...rest }) => {
      return { answers: [...answers].sort(sortShuffle), ...rest };
    });
  }
  function sortShuffle() {
    return Math.random() - 0.5;
  }
  async function apiSaveScore({ title, score }: RankType) {
    await storeDataToStorage(
      "user.scores",
      JSON.stringify({ title, score, current: true })
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  function allowPlayerName(str: string) {
    if (str === "") return true;

    return str.match(/^[a-zA-Z0-9]+$/) !== null;
  }
  function updatePlayerNameInput(str: string) {
    return setPlayerNameInput(str.toUpperCase());
  }

  async function submit() {
    const allAnswersList: CheckAnswersDto[] = questionnaire.map(
      (q: QuestionnaireItemType, index: number) => {
        console.log(q.id);
        console.log(q.title);
        console.log("I pick:" + q.answers[selectedChoiceList[index] - 1]);
        return { id: q.id, answer: q.answers[selectedChoiceList[index] - 1] };
      }
    );
    const score = apiSubmitCheckAllAnswers({ allAnswersList });

    const result = await apiSaveScore({ title: playerNameInput, score });
    console.log(playerNameInput + " score=" + score);

    setPlayerNameInput("");
    router.replace("/leaderboard");
  }

  useEffect(() => {
    startOver();
  }, []);

  useEffect(() => {
    setSelectedChoiceList(Array(questionnaire.length).fill(0));
  }, [questionnaire]);

  useEffect(() => {
    updateSelectedChoiceForCurrent();
  }, [selectedChoiceList, currentQuestion]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 15,
    },
    textTitle: {
      marginLeft: 16,
      fontWeight: "bold",
      fontSize: 28,
      paddingVertical: 10,
    },
    textQuestion: {
      marginBottom: 15,
      textShadowColor: Colors.white,
      textShadowOffset: { width: 0, height: 1 },
    },
    textAnswer: {
      marginLeft: 16,
      fontWeight: "bold",
      fontSize: 20,
    },
    textBody: {
      color: Colors.dark_gray,
    },
    textWhite: {
      color: Colors.white,
    },
    textDisabled: { color: "rgb(169, 169, 169)" },
    choiceSelector: { width: 30 },
    choiceBox: {
      width: "100%",
      paddingRight: 30,
    },
    choiceSeparator: {
      height: 15,
    },
    helpToolbarContainer: {
      width: "100%",
      height: 50,
    },
    helpToolbarButton: {
      display: "flex",
      width: "100%",
      marginLeft: "auto",
      right: 0,
      columnGap: 15,
      flexDirection: "row",
      paddingLeft: dimensions.window.width < 500 ? 0 : "40%",
    },
    helpButtonContainer: {
      flex: 1,
      marginLeft: "auto",
    },
    helpButton: {
      width: "100%",
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.dark_gray,
    },
    buttonDisabled: {
      backgroundColor: Colors.light_gray,
    },

    bottomToolbarContainer: {
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10,
    },
    nextPrevToolbarContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      columnGap: 15,
    },
    nextPrevToolbarPanel: {
      alignItems: "center",
      flex: 1,
    },
    leftRightButton: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: Colors.blue,
    },
    buttonStyle: {
      borderRadius: 10,
    },
    iconSmall: {
      fontSize: 16,
    },
    scrollViewContainer: { flex: 1 },
    scrollView: {
      marginHorizontal: 0,
    },
    text: {
      fontSize: 42,
    },
    buttonTextStyle: {
      color: Colors.white,
    },
    textModal: {
      fontSize: 16,
    },
    textInput: {
      fontSize: 20,
      padding: 15,
      borderColor: Colors.light_gray,
      borderWidth: 1,
      borderRadius: 10,
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
      {!isLoading && questionnaire.length > 0 && (
        <SafeAreaView style={styles.scrollViewContainer}>
          <ScrollView style={styles.scrollView}>
            <Typography style={[styles.textTitle, styles.textQuestion]}>
              Question {currentQuestion + 1}/{questionnaire.length}
              {" - "}
              {questionnaire[currentQuestion].title}
            </Typography>
            {questionnaire[currentQuestion].answers.map((text, index) => (
              <View
                key={`answer-${currentQuestion}-${index}`}
                style={styles.choiceBox}
              >
                {index > 0 && <View style={styles.choiceSeparator} />}
                <Pressable
                  onPress={() => selectChoice(index + 1, currentQuestion)}
                >
                  <View>
                    <Typography style={styles.textAnswer}>
                      <View style={styles.choiceSelector}>
                        {selectedChoice === index + 1 ? (
                          <FontAwesome size={28} name="check-square-o" />
                        ) : (
                          <FontAwesome size={28} name="square-o" />
                        )}
                      </View>
                      {text}
                    </Typography>
                  </View>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}

      <View style={styles.bottomToolbarContainer}>
        <View style={styles.helpToolbarContainer}>
          <View style={styles.helpToolbarButton}>
            <View style={styles.helpButtonContainer}>
              <Pressable
                onPress={() =>
                  canUseHint() ? setModalHintVisible(true) : () => false
                }
                style={[
                  styles.buttonStyle,
                  styles.helpButton,
                  !canUseHint() && styles.buttonDisabled,
                ]}
              >
                <Typography
                  style={[
                    styles.textWhite,
                    !canUseHint() && styles.textDisabled,
                  ]}
                >
                  {"Hint (" + hintAvailable + ")"}
                </Typography>
              </Pressable>
            </View>
            <View style={styles.helpButtonContainer}>
              <Pressable
                onPress={
                  !checkIfSafeToReset() ? () => openModal() : () => false
                }
                style={[
                  styles.buttonStyle,
                  styles.helpButton,
                  checkIfSafeToReset() && styles.buttonDisabled,
                ]}
              >
                <Typography
                  style={[
                    styles.textWhite,
                    checkIfSafeToReset() && styles.textDisabled,
                  ]}
                >
                  {"Start Over"}
                </Typography>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={[styles.helpToolbarContainer, styles.nextPrevToolbarContainer]}
        >
          <View style={styles.nextPrevToolbarPanel}>
            <Pressable
              onPress={() => (canGoBack() ? prevQuestion() : () => false)}
              style={[
                styles.leftRightButton,
                styles.buttonStyle,
                !canGoBack() && styles.buttonDisabled,
              ]}
            >
              <Typography
                style={[
                  styles.buttonTextStyle,
                  !canGoBack() && styles.textDisabled,
                ]}
              >
                <FontAwesome
                  size={28}
                  name="chevron-left"
                  style={[styles.iconSmall]}
                />
                {" " + "Back"}
              </Typography>
            </Pressable>
          </View>
          <View style={styles.nextPrevToolbarPanel}>
            {hasNextQuestion() ? (
              <Pressable
                onPress={() => (canGoNext() ? nextQuestion() : () => false)}
                style={[
                  styles.leftRightButton,
                  styles.buttonStyle,
                  !canGoNext() && styles.buttonDisabled,
                ]}
              >
                <Typography
                  style={[
                    styles.buttonTextStyle,
                    !canGoNext() && styles.textDisabled,
                  ]}
                >
                  {"Next" + " "}
                  <FontAwesome
                    size={28}
                    name="chevron-right"
                    style={[styles.iconSmall]}
                  />
                </Typography>
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  canSubmit() ? setModalConfirmSubmitVisible(true) : false
                }
                style={[
                  styles.leftRightButton,
                  styles.buttonStyle,
                  !canSubmit() && styles.buttonDisabled,
                ]}
              >
                <Typography
                  style={[
                    styles.buttonTextStyle,
                    !canSubmit() && styles.textDisabled,
                  ]}
                >
                  {"Submit"}
                </Typography>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalStartOverVisible}
      >
        <View style={[modalStyles.centeredView]}>
          <View style={modalStyles.modalView}>
            <View>
              <Text
                style={[
                  styles.textBody,
                  styles.textModal,
                  modalStyles.modalText,
                  modalStyles.modalHeader,
                ]}
              >
                Are you sure you want to reset?
              </Text>
            </View>
            <View>
              <Text
                style={[
                  modalStyles.modalText,
                  styles.textBody,
                  styles.textModal,
                ]}
              >
                All unsaved progress will be lost!
              </Text>
            </View>
            <View style={modalStyles.buttonsContainer}>
              <Pressable
                style={[
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonHighlight,
                ]}
                onPress={() => closeModal()}
              >
                <Text
                  style={[
                    styles.buttonTextStyle,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonLowProfile,
                ]}
                onPress={() => {
                  startOver();
                  closeModal();
                }}
              >
                <Text
                  style={[
                    styles.buttonTextStyle,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalHintVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View>
              <Text
                style={[
                  styles.textBody,
                  styles.textModal,
                  modalStyles.modalText,
                  modalStyles.modalHeader,
                ]}
              >
                Are you sure you want to use hint?
              </Text>
            </View>
            <View>
              <Text
                style={[
                  modalStyles.modalText,
                  styles.buttonStyle,
                  styles.textBody,
                  styles.textModal,
                ]}
              >
                Hint remaining: {hintAvailable}
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
                    styles.buttonTextStyle,
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
                onPress={() => {
                  useHint();
                  closeModal();
                }}
              >
                <Text
                  style={[
                    styles.buttonStyle,
                    styles.buttonTextStyle,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Sure!
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalConfirmSubmitVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View
              style={[modalStyles.modalSection, modalStyles.modalTopSection]}
            >
              <View>
                <Text
                  style={[
                    styles.textBody,
                    styles.textModal,
                    modalStyles.modalText,
                    modalStyles.modalHeader,
                  ]}
                >
                  Confirm submit?
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    modalStyles.modalText,
                    modalStyles.modalTextLast,
                    styles.textBody,
                    styles.textModal,
                  ]}
                >
                  This action cannot be undone...
                </Text>
              </View>
            </View>
            <View style={modalStyles.modalSectionBorder}></View>
            <View style={modalStyles.modalSection}>
              <View>
                <Text
                  style={[
                    modalStyles.modalText,
                    styles.textBody,
                    styles.textModal,
                  ]}
                >
                  Enter your name...
                </Text>
              </View>
              <View>
                <TextInput
                  style={[
                    modalStyles.modalText,
                    styles.textBody,
                    styles.textInput,
                  ]}
                  maxLength={6}
                  onKeyPress={(e) => false}
                  onChangeText={(value) => {
                    if (allowPlayerName(value)) updatePlayerNameInput(value);
                  }}
                  value={playerNameInput}
                />
              </View>
            </View>
            <View style={modalStyles.buttonsContainer}>
              <Pressable
                style={[
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonHighlight,
                ]}
                onPress={() => closeModal()}
              >
                <Text
                  style={[
                    styles.buttonTextStyle,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  modalStyles.buttons,
                  modalStyles.button,
                  modalStyles.buttonClose,
                  modalStyles.buttonLowProfile,
                ]}
                onPress={async () => {
                  await submit();
                  closeModal();
                }}
              >
                <Text
                  style={[
                    styles.buttonTextStyle,
                    modalStyles.modalButtonTextStyle,
                  ]}
                >
                  Sure!
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
