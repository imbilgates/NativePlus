import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Article, NewsApiResponse } from "../types/news";

import { useTheme } from "@/context/ThemeContext";

const API_KEY = "fefd22d9502c4c659eb59e93c43cec8b";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  const { theme } = useTheme();

  const fetchArticles = async (selectedCategory: string) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`;
    try {
      const res = await fetch(url);
      const data: NewsApiResponse = await res.json();
      setArticles(data.articles);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(category);
  }, [category]);

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.categoryContainer]}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              cat === category && [
                styles.activeCategory,
                { backgroundColor: theme.primary },
              ],
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                cat === category && styles.activeText,
              ]}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={articles}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background }]}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <Text style={[styles.title, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text
              style={[styles.description, { color: theme.text }]}
              numberOfLines={3}
            >
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    padding: 10,
  },
  image: {
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
