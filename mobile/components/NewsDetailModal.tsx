import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "@/context/ThemeContext";
import { Article } from "@/types/news";

interface NewsDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  article: Article | null;
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  isVisible,
  onClose,
  article,
}) => {
  const { theme } = useTheme();

  const handleReadMore = () => {
    if (article?.url) {
      Linking.openURL(article.url);
    }
  };

  const styles = createStyles(theme);

  if (!article) return null;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.image} />
          )}
          
          <Text style={styles.title}>{article.title}</Text>
          
          {article.author && (
            <Text style={styles.author}>By {article.author}</Text>
          )}
          
          {article.publishedAt && (
            <Text style={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </Text>
          )}
          
          <Text style={styles.description}>{article.description}</Text>
          
          {article.content && (
            <Text style={styles.content}>{article.content}</Text>
          )}
          
          {article.source?.name && (
            <Text style={styles.source}>Source: {article.source.name}</Text>
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
          {article.url && (
            <TouchableOpacity
              style={[styles.button, styles.readMoreButton]}
              onPress={handleReadMore}
            >
              <Text style={styles.readMoreButtonText}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.background,
      borderRadius: 20,
      width: "95%",
      maxHeight: "90%",
      padding: 20,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 15,
      marginBottom: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 10,
      lineHeight: 28,
    },
    author: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 5,
    },
    date: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      color: theme.text,
      lineHeight: 24,
      marginBottom: 15,
    },
    content: {
      fontSize: 14,
      color: theme.text,
      lineHeight: 22,
      marginBottom: 15,
    },
    source: {
      fontSize: 12,
      color: theme.primary,
      fontStyle: "italic",
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    closeButton: {
      backgroundColor: theme.error,
    },
    readMoreButton: {
      backgroundColor: theme.primary,
    },
    closeButtonText: {
      color: theme.background,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    readMoreButtonText: {
      color: theme.background,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
  });

export default NewsDetailModal; 