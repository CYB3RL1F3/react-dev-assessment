import React, { memo, useCallback } from "react";

import {
  Page,
  Title,
  Form,
  Image,
  Input,
  Submit,
  Handler,
  Header,
} from "./app.components";

export const placeholder = {
  url:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  alt: "no avatar"
};

const App = () => {

  // on email change
  const onEmailChange = useCallback(
    e => {
      e.persist();
      // impl..
    },
    []
  );

  // get image
  const updateImage = useCallback(
    async (e: React.FormEvent<any>) => {
      e.preventDefault();
      // impl...
    },
    []
  );
  
  return (
    <Page>
      <Header>
        <Title>Gravatar checker</Title>
      </Header>
      <Handler>
        
        <Form onSubmit={updateImage}>
          <Input onChange={onEmailChange} />
          <Submit
            value="Check avatar"
          />
        </Form>
        <Image src={placeholder.url} alt={placeholder.alt} />
      </Handler>
    </Page>
  );
};

export default memo(App);
