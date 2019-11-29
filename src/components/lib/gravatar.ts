import querystring from "query-string";
import md5 from "md5";
import isRetina from "is-retina";
import axios, { AxiosResponse } from "axios";
import 'babel-polyfill';
export interface Avatar {
  status: number;
  data: {
    src: string;
    alt: string;
  } | null;
  error: string | null;
}

export const getAvatarUrl = (email: string, size: number): string => {

  const base: string = `https://www.gravatar.com/avatar/`;
  
  const query: string = querystring.stringify({
    s: size * (isRetina ? 2 : 1),
    r: "g",
    d: 404
  });
  
  // Gravatar service currently trims and lowercases all registered emails
  const formattedEmail: string = email.trim().toLowerCase();
  
  const hash: string = md5(formattedEmail, { encoding: "binary" }) as string;
  const src: string = `${base}${hash}?${query}`;
  return src;
  
}

export const getAvatar = async (email: string): Promise<Avatar> => {
  if (email === "") return {
    status: 404,
    data: null,
    error: "You must type an email"
  };
  const url = getAvatarUrl(email, 400);
  try {
    const response: AxiosResponse<any> = await axios.get(url, {
    method: "GET",
    responseType: "blob"
  });
  if (response.status === 200) {
    const src: string = window.URL.createObjectURL(new Blob([response.data]))
    return {
      status: 200,
      data: {
        src,
        alt: email
      },
      error: null
    };
  } else {
    return {
      status: response.status,
      data: null,
      error: `${email} doesn't have any avatar !`
    }
  }
  } catch(e) {
    console.log(e);
    return {
      status: 404,
      data: null,
      error: `${email} doesn't have any avatar !`
    };
  }
  
}
