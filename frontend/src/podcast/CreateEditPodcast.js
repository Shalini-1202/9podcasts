import { LeftOutlined } from "@ant-design/icons";
import { Form, Modal, Button, Input, Select, Checkbox, Radio } from "antd";
import React, { useState } from "react";

import axios from "axios";

const { Option } = Select;

const CreateEditPodcast = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState(null);
  const [domain, setDomain] = useState(null);
  const [lang, setLang] = useState("en");
  const [isExplicit, setIsExplicit] = useState(null);
  const [aname, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [copyright, setCopyright] = useState(null);
  const [categoryId, setCategoryId] = useState("tc");
  const [radio, setRadio] = useState(1);
  const [pcategory, setpCategory] = useState("tc");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const payload = {
      title: title,
      description: description,
      website_address: domain,
      category_id: categoryId,
      language: lang,
      is_explict: isExplicit,
      cover_art_id: 1,
      author_name: aname,
      author_email: email,
      copyright: copyright,
    };

    console.log(payload);
    // http request to server
    axios
      .post("http://localhost:9999/podcasts", payload)
      .then((res) => console.log(res));

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const validateMessages = {
    required: `Label is required!`,
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadio(e.target.value);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a new podcast
      </Button>
      <Modal
        title="New Podcast"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        height={1000}
      >
        <Form
          {...layout}
          name="podcast-form"
          onFinish={onFinish}
          validateMessages={validateMessages}
          align={LeftOutlined}
        >
          <h3>Podcast Details</h3>
          <Form.Item label="Title">
            <Input
              placeholder="A very nice podcast show title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              placeholder="Tell us about your podcast. What makes it different?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Podcast Domain">
            <Input
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Language">
            <Input.Group compact>
              <Form.Item name={"language"} noStyle>
                <Select
                  placeholder="Language"
                  value={lang}
                  onChange={(val) => setLang(val)}
                >
                  <Option value="en">English</Option>
                  <Option value="hi">Hindi</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Checkbox
            value={isExplicit}
            onChange={(e) => {
              setIsExplicit(e.target.checked);
            }}
          >
            This episode includes explicit content.{" "}
          </Checkbox>
          <h3>Author Details</h3>
          <Form.Item label="Name">
            <Input
              placeholder="Your name"
              value={aname}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              placeholder="abc123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Copyright">
            <Input
              // placeholder="Your name"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
            />
          </Form.Item>
          <h3>Categories</h3>
          <Form.Item label="Category">
            <Input.Group compact>
              <Form.Item name={"category"} noStyle>
                <Select
                  placeholder="Category"
                  value={categoryId}
                  onChange={(val) => setCategoryId(val)}
                >
                  <Option value={1}>Tech</Option>
                  <Option value={2}>Non-Tech</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditPodcast;
