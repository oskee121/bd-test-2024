import Typography from "@/components/Typography";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

type QuestionnaireItem = { id: number; title: string; answers: string[] };
type CheckAnswersDto = { id: number; answer: string };

const _windowDimensions = Dimensions.get("window");
const _screenDimensions = Dimensions.get("screen");

const _defaultTotalHintAvailable = 1;

// ****** FIRST CHOICE ALWAYS BE THE CORRECT ANSWER ******
const _questionnaire: QuestionnaireItem[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answers: [
      "เที่ยงคืนจ๊าบ สเตชันเจล เซ็กซี่ไลน์เฟอร์นิเจอร์โปรดิวเซอร์.",
      "เอ็กซ์โปอุปนายกแอ็กชั่นแตงโมล้มเหลว ฮิบรู วาไรตี้แอร์บูติค สไตรค์ ทีวีปาร์ตี้มัฟฟินอันเดอร์เฝอ แอร์คอนแทคแจ็กพอตหมิง ล้มเหลว เฟอร์นิเจอร์ ซิมโฟนี่ ท็อปบูตซามูไรฮ็อตกิมจิ กีวีโต๊ะจีน เคลียร์เหมย ก๋ากั่นซินโดรม",
      "อาข่าโปรเจ็ค แพทเทิร์นโหลยโท่ยแต๋วคัตเอาต์ โคโยตี้หมายปองแคนู",
      "เซลส์แมน แบนเนอร์เก๋ากี้สตรอว์เบอร์รีซีอีโอ ภคันทลาพาธx",
    ],
  },
  {
    id: 2,
    title:
      "ซาร์ดีนโค้กชิฟฟอนยังไง ลามะสไลด์ อุปัทวเหตุทอร์นาโดฮิบรูออร์แกนพิซซ่า สไตล์โครนา?",
    answers: ["B-A.x", "B-B", "B-C", "B-D"],
  },
  {
    id: 3,
    title:
      "พาวเวอร์เพรียวบางคอปเตอร์ซาดิสต์ สต๊อคไฟลท์แพทยสภาซิม ซาร์ดีนถ่ายทำทาวน์เฮาส์ซาร์ดีนบลูเบอร์รี่?",
    answers: ["C-A.", "C-Bx", "C-C", "C-D"],
  },
  // {
  //   id: 4,
  //   title:
  //     "สตาร์ทจูเนียร์คอร์รัปชันเฝอจิ๊กโก๋ แฟนซี อาข่ากิมจิแหววอิ่มแปร้ซูเอี๋ย คาร์โก้ยูวี สจ๊วต?",
  //   answers: ["D-A.", "D-B", "D-C", "D-D"],
  // },
  // {
  //   id: 5,
  //   title:
  //     "สตรอเบอร์รีบึม โนติสลิสต์ชนะเลิศ ดีมานด์สตาร์ท พุดดิ้งเคลม บุญคุณคอนโดมิเนียมเซรามิก ทีวีสเตริโอชาร์จทรู สจ๊วตไฮกุชะโนดโอเคกรีน?",
  //   answers: ["E-A.", "E-B", "E-C", "E-D"],
  // },
  // {
  //   id: 6,
  //   title: "Praesent at ante lacinia, blandit massa vel, pretium risus?",
  //   answers: ["E-A.", "E-B", "E-C", "E-D"],
  // },
  // {
  //   id: 7,
  //   title:
  //     "ซัพพลายเบลอสตาร์ทสามแยกสเตชัน ชาร์ตแฮปปี้รามเทพธรรมาภิบาลคอนเทนเนอร์ สไตรค์วาริชศาสตร์ทีวีวัจนะพาสตา ทอร์นาโดมาร์ชอึมครึมโยโย่ อมาตยาธิปไตยโรลออนอันเดอร์เฟรชชี่ ฮัลโหลพุทธศตวรรษ ฟอยล์ยะเยือกเดชานุภาพ สเตริโอ ทาวน์เฮาส์ตะหงิดเพียวละอ่อน?",
  //   answers: ["G-A.", "G-B", "G-C", "G-D"],
  // },
];
function apiGetCorrectAnswer(currentId: number) {
  // This should replace with an API.
  const originalItem: QuestionnaireItem | undefined = _questionnaire.find(
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
  // [
  //   { id: 3, answer: "C-Bx" },
  //   { id: 2, answer: "B-A.x" },
  //   {
  //     id: 1,
  //     answer: "เซลส์แมน แบนเนอร์เก๋ากี้สตรอว์เบอร์รีซีอีโอ ภคันทลาพาธx",
  //   },
  // ];
  const findCorrectedAnswersFromStudent = ({ id, answer }: CheckAnswersDto) => {
    return (
      _questionnaire.find((q) => {
        return q.id === id;
      })?.answers[0] === answer
    );
  };

  console.log(JSON.stringify(allAnswersList));

  const score = allAnswersList.filter(findCorrectedAnswersFromStudent).length;

  console.log(score);
  // const correctAnswer = apiGetCorrectAnswer(id);
}
export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modalStartOverVisible, setModalStartOverVisible] = useState(false);
  const [modalHintVisible, setModalHintVisible] = useState(false);
  const [modalConfirmSubmitVisible, setModalConfirmSubmitVisible] =
    useState(false);
  const [hintAvailable, setHintAvailable] = useState(
    _defaultTotalHintAvailable
  );
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [selectedChoiceList, setSelectedChoiceList] = useState<number[]>(
    Array(questionnaire.length).fill(0)
  );
  const [dimensions, setDimensions] = useState({
    window: _windowDimensions,
    screen: _screenDimensions,
  });
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
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
    setQuestionnaire(shuffleQuestionnaire(_questionnaire));
    setSelectedChoiceList(Array(questionnaire.length).fill(0));
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
  // function shuffleArray(source: any[]): any[] {
  //   let output: any[] = [];

  //   while (source.length) {
  //     const randomIndex = Math.floor(Math.random() * source.length),
  //       element: any = source.splice(randomIndex, 1)[0];

  //     output.push(element);
  //   }
  //   return output;
  // }
  function shuffleQuestionnaire(
    source: QuestionnaireItem[]
  ): QuestionnaireItem[] {
    // return source;
    return [...source].sort(sortShuffle).map(({ answers, ...rest }) => {
      return { answers: [...answers].sort(sortShuffle), ...rest };
    });
  }
  function sortShuffle() {
    return Math.random() - 0.5;
  }

  function submit() {
    const allAnswersList: CheckAnswersDto[] = questionnaire.map(
      (q: QuestionnaireItem, index: number) => {
        console.log(q.id);
        console.log(q.title);
        console.log("I pick:" + q.answers[selectedChoiceList[index] - 1]);
        return { id: q.id, answer: q.answers[selectedChoiceList[index] - 1] };
      }
    );
    // const answersList = questionnaire.map selectedChoiceList;
    const score = apiSubmitCheckAllAnswers({ allAnswersList });
  }

  useEffect(() => {
    startOver();
  }, []);

  useEffect(() => {
    updateSelectedChoiceForCurrent();
  }, [selectedChoiceList, currentQuestion]);

  const styles = StyleSheet.create({
    container: {
      // paddingTop: 35,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 50,
    },
    // questionContainer: {
    //   justifyContent: "center",
    //   alignItems: "center",
    //   height: "33%",
    //   backgroundColor: "rgb(226, 255, 241)",
    //   // borderTopColor: "rgb(172, 172, 172)",
    //   // borderTopWidth: 2,
    //   width: "100%",
    //   paddingBottom: 10,
    // },
    // answerContainerScrollSafeArea: {
    //   flex: 1,
    //   paddingTop: StatusBar.currentHeight,
    // },
    // answerContainer: {
    //   // justifyContent: "center",
    //   alignItems: "flex-start",
    //   // marginTop: 30,
    //   backgroundColor: "rgb(255, 255, 255)",
    //   borderTopColor: "rgb(172, 172, 172)",
    //   borderTopWidth: 2,
    //   width: "100%",
    //   height: "60%",
    //   paddingTop: 15,
    //   paddingBottom: 10,
    //   // paddingLeft: 10,
    //   // paddingRight: 10,
    //   // overflow: "scroll",
    // },
    overlay: {
      position: "absolute",
      right: 0,
      top: 0,
      width: "30%",
      height: "30%",
      backgroundColor: "#eee",
    },
    textTitle: {
      marginLeft: 16,
      fontWeight: "bold",
      fontSize: 28,
      paddingVertical: 10,
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
      // minWidth: 450,
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
      // height: "12%",
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
      borderRadius: 10,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: Colors.blue,
    },
    // rightButton: {
    //   width: "100%",
    //   height: "100%",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   borderRadius: 10,
    //   marginLeft: 5,
    //   marginRight: 5,
    //   backgroundColor: "rgb(100, 167, 200)",
    // },
    iconSmall: {
      fontSize: 16,
    },
    leftSpace: {
      marginLeft: 10,
    },
    rightSpace: {
      marginRight: 10,
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
      // padding: 10,
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
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalButtonTextStyle: {
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/* <form> */}
      {/* {questionnaire && (
        <View style={styles.questionContainer}>
          <Typography style={styles.textTitle}>
            Question {currentQuestion + 1}/{questionnaire.length}
            {" - "}
            {questionnaire[currentQuestion].title}
          </Typography>
        </View>
      )} */}
      {!isLoading && questionnaire.length > 0 && (
        <SafeAreaView style={styles.scrollViewContainer}>
          <ScrollView style={styles.scrollView}>
            <Typography style={styles.textTitle}>
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
      {/* {questionnaire.length > 0 && (
        <SafeAreaView style={styles.answerContainerScrollSafeArea}>
          <ScrollView style={styles.answerContainer}>
            {questionnaire[currentQuestion].answers.map((ans, index) => (
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
                      {index}/{currentQuestion}
                      <View style={styles.choiceSelector}>
                        {selectedChoice === index + 1 ? (
                          <FontAwesome size={28} name="check-square-o" />
                        ) : (
                          <FontAwesome size={28} name="square-o" />
                        )}
                      </View>
                      {ans}
                    </Typography>
                  </View>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      )} */}
      <View style={styles.bottomToolbarContainer}>
        <View style={styles.helpToolbarContainer}>
          <View style={styles.helpToolbarButton}>
            <View style={styles.helpButtonContainer}>
              <Pressable
                onPress={() =>
                  canUseHint() ? setModalHintVisible(true) : () => false
                }
                style={[
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
                  // startOver()
                }
                style={[
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
                  style={[styles.iconSmall, styles.rightSpace]}
                />
                {"Back"}
              </Typography>
            </Pressable>
          </View>
          <View style={styles.nextPrevToolbarPanel}>
            {hasNextQuestion() ? (
              <Pressable
                onPress={() => (canGoNext() ? nextQuestion() : () => false)}
                style={[
                  styles.leftRightButton,
                  !canGoNext() && styles.buttonDisabled,
                ]}
              >
                <Typography
                  style={[
                    styles.buttonTextStyle,
                    !canGoNext() && styles.textDisabled,
                  ]}
                >
                  {"Next"}
                  <FontAwesome
                    size={28}
                    name="chevron-right"
                    style={[styles.iconSmall, styles.leftSpace]}
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
      {/* </form> */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalStartOverVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View>
              <Text style={[modalStyles.modalText, styles.textBody]}>
                Are you sure you want to reset?
              </Text>
            </View>
            <View>
              <Text style={[modalStyles.modalText, styles.textBody]}>
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
              <Text style={[modalStyles.modalText, styles.textBody]}>
                Are you sure you want to use hint?
              </Text>
            </View>
            <View>
              <Text style={[modalStyles.modalText, styles.textBody]}>
                Hint remaining: {hintAvailable}
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
                  useHint();
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalConfirmSubmitVisible}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View>
              <Text style={[modalStyles.modalText, styles.textBody]}>
                Confirm submit?
              </Text>
            </View>
            <View>
              <Text style={[modalStyles.modalText, styles.textBody]}>
                This action cannot be undone...
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
                  submit();
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
