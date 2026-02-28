import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import axios from "axios";

export default function Profile({ route }) {
  const { token } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://YOUR_IP:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <View>
      <Text>{user.fullName}</Text>
      <Text>{user.email}</Text>
      <Text>{user.membershipPlan}</Text>
      <Image
        source={{ uri: user.qrCode }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
