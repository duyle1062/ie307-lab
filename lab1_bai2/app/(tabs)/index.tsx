import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dữ liệu
const fruits_vegetables = [
  {
    title: "Fruits",
    url: "https://cdn-icons-png.flaticon.com/512/1625/1625099.png",
    data: ["Banana", "Orange", "Grapes", "Mango", "Pineapple"],
  },
  {
    title: "Vegetables",
    url: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png",
    data: ["Carrot", "Broccoli", "Spinach", "Beets & Beet Greens", "Kale"],
  },
];

const workouts = [
  { id: "1", type: "Push-ups" },
  { id: "2", type: "Squats" },
  { id: "3", type: "Planks" },
  { id: "4", type: "Groiner" },
  { id: "5", type: "Spider Crawl" },
  { id: "6", type: "Glute Bridge" },
  { id: "7", type: "Dumbbell rows" },
  { id: "8", type: "Burpees" },
  { id: "9", type: "Standing Long Jump" },
  { id: "10", type: "Lunges" },
];

export default function App() {
  // selectedItems will be an array of strings (either workout type or fruit/vegetable name)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Hàm xử lý chọn / bỏ chọn
  const toggleSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Render từng workout (FlatList)
  const renderWorkout = ({ item }: { item: { id: string; type: string } }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItems.includes(item.type) && styles.selectedItem,
      ]}
      onPress={() => toggleSelect(item.type)}
    >
      <Text style={styles.itemText}>{item.type}</Text>
      <Text style={styles.button}>
        {selectedItems.includes(item.type) ? "DESELECT" : "SELECT"}
      </Text>
    </TouchableOpacity>
  );

  // Render từng fruit/vegetable (SectionList)
  const renderFruitVeg = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}
      onPress={() => toggleSelect(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
      <Text style={styles.button}>
        {selectedItems.includes(item) ? "DESELECT" : "SELECT"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        }}
        style={styles.background}
      >
        <Text style={styles.title}>Workouts</Text>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkout}
        />

        <Text style={styles.title}>Fruits & Vegetables</Text>
        <SectionList
          sections={fruits_vegetables}
          keyExtractor={(item, index) => item + index}
          renderItem={renderFruitVeg}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Image
                source={{ uri: section.url }}
                style={styles.sectionImage}
              />
            </View>
          )}
        />

        {/* Hiển thị các item đã chọn */}
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Selected Items:</Text>
          <Text style={styles.selectedText}>
            {selectedItems.length > 0
              ? selectedItems.join(", ")
              : "No items selected"}
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#0008",
    borderRadius: 8,
    padding: 4,
  },
  sectionHeader: {
    padding: 5,
    borderRadius: 5,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "none",
  },
  sectionImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 88,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fff",
    marginVertical: 4,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedItem: {
    backgroundColor: "#cdeaf7",
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    fontWeight: "bold",
    color: "#007bff",
  },
  selectedContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  selectedTitle: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
  },
});
