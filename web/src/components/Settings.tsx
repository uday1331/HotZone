import React, { useState } from "react";
import { Typography, Input, Button, message } from "antd";
import axios from "axios";

const { Title } = Typography;

export const Settings: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <div>
      <Title>Change Password</Title>
      <Input placeholder="new password" type="password" onChange={(e) => {
        setNewPassword(e.target.value);
      }} />
      <Button style={{ marginTop: "12px" }} type="primary" onClick={async () => {
        try {
          if (newPassword && newPassword.length > 3) {
            await axios.put("https://group-q-hotzone.herokuapp.com/hotzone/change_password/", {
            new_password: newPassword
            } , {
              headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
              }
            });
            message.success("password changed successfully!");
            setNewPassword("");
          } else {
            message.error("password is too short or blank!");
          }
        } catch (e) {
          message.error("failed to change password");
        }
      }}>Change</Button>
    </div>
  )
}