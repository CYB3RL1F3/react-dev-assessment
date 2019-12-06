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
  ErrorHandler,
  SuccessHandler,
} from "./app.components";
import { getAvatar } from "../lib/gravatar";

export const placeholder = {
  url:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  alt: "no avatar"
};

const App = () => {
  const [placeholderState, setPlaceholder] = React.useState(placeholder);
  const [error, setError] = React.useState(null);
  const [valid, setValid] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  let email = "";
  
  // on email change
  const onEmailChange = useCallback(
    e => {
      e.persist();
      // impl..
      email = e.target.value;
    },
    []
  );

  // get image
  const updateImage = useCallback(
    async (e: React.FormEvent<any>) => {
      e.preventDefault();
      // impl...
      setLoading(true);
      const res = await getAvatar(email);
      setLoading(false);

      if(res.status === 200) {
        setPlaceholder({url: res.data.src, alt: res.data.alt});
        setValid(`${email} has an avatar !`);
        setError(null);
      } else if ([404, 500].includes(res.status)) {
        setPlaceholder(placeholder);
        setError(res.error);
        setValid(null);
      }
    },
    []
  );
  
  return (
    <Page>
      <Header>
        <Title>Gravatar viewer</Title>
      </Header>
      <Handler>
        {error && <ErrorHandler>{error}</ErrorHandler> }
        {valid && <SuccessHandler>{valid}</SuccessHandler> }
        
        <Form onSubmit={updateImage}>
          <Input onChange={onEmailChange} />
          <Submit
            value={loading ? "loading..." : "Check avatar"}
            disabled={loading}
          />
        </Form>
        <Image src={placeholderState.url} alt={placeholderState.alt} />
      </Handler>
    </Page>
  );
};

export default memo(App);
