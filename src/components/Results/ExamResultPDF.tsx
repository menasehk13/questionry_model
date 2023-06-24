import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { questions } from "../Data/QuestionModel1";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "1cm",
  },
  question: {
    marginBottom: "0.5cm",
  },
  questionText: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "0.25cm",
  },
  answerText: {
    fontSize: "12px",
    marginBottom: "0.1cm",
  },
  correctAnswer: {
    color: "green-500",
  },
  incorrectAnswer: {
    color: "red-500",
  },
});

const ExamResultPDF = ({ userAnswers }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {questions.map((question, index) => (
          <View key={index} style={styles.question}>
            <Text className={`text-lg font-bold mb-1 ${styles.questionText}`}>
              {`${index + 1}. ${question.question}`}
            </Text>
            <Text className={`text-base mb-1 ${styles.answerText}`}>
              Answer:{" "}
              <Text className={`text-base ${styles.correctAnswer}`}>{question.answer}</Text>
            </Text>
            <Text className={`text-base ${styles.answerText}`}>
              Your Answer:{" "}
              <Text
                className={`text-base ${
                  userAnswers[index] === question.answer ? styles.correctAnswer : styles.incorrectAnswer
                }`}
              >
                {userAnswers[index] || "-"}
              </Text>
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ExamResultPDF;
