import React, { useState } from "react";
import { Typography, Input, Button, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

export const Settings: React.FC = () => {
  const history = useHistory();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Title>Change Password</Title>
      <Input
        placeholder="new password"
        type="password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <Button
        style={{ marginTop: "12px" }}
        type="primary"
        onClick={async () => {
          try {
            setLoading(true);
            if (newPassword && newPassword.length > 3) {
              await axios.put(
                "/hotzone/change_password/",
                {
                  new_password: newPassword,
                },
                {
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }
              );
              message.success("password changed successfully!");
              setNewPassword("");
            } else {
              message.error("password is too short or blank!");
            }
          } catch (e) {
            message.error("failed to change password");
          }
          setLoading(false);
        }}
        loading={loading}
      >
        Change
      </Button>

      <Button
        style={{ display: "block", marginTop: "64px", marginLeft: "auto", marginRight: "auto" }}
        type="primary"
        danger
        onClick={() => {
          localStorage.clear();
          history.go(0);
        }}
      >
        Log Out
      </Button>
    </div>
  );
};
