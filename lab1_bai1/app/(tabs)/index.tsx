// App.js
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Định nghĩa kiểu dữ liệu cho post
type PostType = {
  id: number;
  username: string;
  avatar: string;
  contentText?: string;
  contentImage?: string;
  likes: number;
  comments: number;
  shares: number;
};

// Component Post hiển thị 1 bài viết
const Post = ({ post }: { post: PostType }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  return (
    <View style={styles.postContainer}>
      {/* Header: Avatar + tên người dùng */}
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
      </View>

      {/* Nội dung text */}
      {post.contentText ? (
        <Text style={styles.contentText}>{post.contentText}</Text>
      ) : null}

      {/* Nội dung hình ảnh */}
      {post.contentImage ? (
        <Image
          source={{ uri: post.contentImage }}
          style={styles.contentImage}
        />
      ) : null}

      {/* Thống kê like/comment/share */}
      <View style={styles.stats}>
        <Text>{likes} Likes</Text>
        <Text>{comments} Comments</Text>
        <Text>{shares} Shares</Text>
      </View>

      {/* Đường kẻ ngang */}
      <View style={styles.divider} />

      {/* Các nút tương tác */}
      <View style={styles.actions}>
        <Pressable
          onPress={handleLike}
          style={({ pressed }) => [
            { flexDirection: "row", alignItems: "center" },
            pressed && { opacity: 0.6 },
          ]}
        >
          {liked ? (
            <Fontisto name="like" style={styles.likeIconLiked} />
          ) : (
            <AntDesign name="like" style={styles.likeIcon} />
          )}
          <Text style={[styles.actionBtn, liked && styles.liked]}>Like</Text>
        </Pressable>

        <Pressable
          onPress={handleComment}
          style={({ pressed }) => [
            { flexDirection: "row", alignItems: "center" },
            pressed && { opacity: 0.6 },
          ]}
        >
          <EvilIcons name="comment" style={styles.commentIcon} />
          <Text style={styles.actionBtn}>Comment</Text>
        </Pressable>

        <Pressable
          onPress={handleShare}
          style={({ pressed }) => [
            { flexDirection: "row", alignItems: "center" },
            pressed && { opacity: 0.6 },
          ]}
        >
          <Entypo name="share" style={styles.shareIcon} />
          <Text style={styles.actionBtn}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function App() {
  const posts = [
    {
      id: 1,
      username: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      contentText: "Cảnh đẹp!",
      contentImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      likes: 10,
      comments: 2,
      shares: 1,
    },
    {
      id: 2,
      username: "Bob",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      contentText: "Rừng núi hùng vĩ!",
      contentImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      likes: 5,
      comments: 1,
      shares: 0,
    },
    {
      id: 3,
      username: "Charlie",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      contentText: "Sea",
      contentImage:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      likes: 20,
      comments: 4,
      shares: 3,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Banner Header */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerText}>Social Media Feed</Text>
      </View>

      <ScrollView style={styles.container}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBanner: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
  },
  contentImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBtn: {
    fontSize: 16,
    color: "#555",
  },
  liked: {
    color: "blue",
    fontWeight: "bold",
  },
  likeIcon: {
    fontSize: 20,
    color: "black",
    marginRight: 4,
  },
  likeIconLiked: {
    fontSize: 20,
    color: "blue",
    marginRight: 4,
  },
  commentIcon: {
    fontSize: 20,
    color: "black",
    marginRight: 4,
  },
  shareIcon: {
    fontSize: 20,
    color: "black",
    marginRight: 4,
  },
});
