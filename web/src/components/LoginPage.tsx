import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

const { Link: LinkText } = Typography;

interface ILogin {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async ({ username, password }: ILogin) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/login/",
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userLoggedIn", username);
      }
      message.success("logged in successfully");
      //reroute to home page
      document.location.href = "/";
    } catch (e) {
      message.error("failed to login");
    }

    setLoading(false);
  };

  return (
    <>
      <Logo color="black" />
      <Form
        style={{ marginRight: "auto", marginLeft: "auto", width: "50%" }}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <a href="https://hotzone-group-q-final.herokuapp.com/password-reset/">
        Forgot Password?
      </a>
    </>
  );
};
