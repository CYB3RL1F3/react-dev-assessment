import React from "react";
import { mount, configure } from "enzyme";
import App, { placeholder } from "./app";
import Adapter from "enzyme-adapter-react-16";
import { act } from "@testing-library/react";

import "babel-polyfill"
const A = Adapter as any;
configure({ adapter: new A() });

jest.resetModules();
jest.mock("../lib/gravatar", () => ({
  getAvatar: jest.fn().mockImplementation((email: string) => {
    return new Promise(resolve => {
      if (email === "deikean@gmail.com") {
        return resolve({
          status: 200,
          data: {
            src: "https://image.com/aaa.jpg",
            alt: "deikean@gmail.com"
          },
          error: null
        });
      } else {
        return resolve({
          status: 404,
          data: {
            src: "",
            alt: ""
          },
          error: `${email} doesn't have any avatar !`
        });
      }
    });
  })
}));

require("../lib/gravatar");

import {
  Page,
  Title,
  Form,
  Image,
  ErrorHandler,
  Input,
  Submit,
  Header,
  SuccessHandler
} from "./app.components";
jest.useFakeTimers();

describe("<App />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  })
  it("should mount app properly", () => {
    expect(wrapper).toHaveLength(1);
  });
  it("should render title with right props", () => {
    const title = wrapper.find(Page).find(Header).find(Title);
    expect(title).toHaveLength(1);
    expect(title.props()).toEqual({
      children: "Gravatar checker"
    });
  });
  it("should render avatar with placeholder", () => {
    const avatar = wrapper.find(Page).find(Image);
    expect(avatar).toHaveLength(1);
    expect(avatar.props()).toEqual({
      src: placeholder.url,
      alt: placeholder.alt
    });
  });
  it("should render form with right props", () => {
    const form = wrapper.find(Page).find(Form);
    expect(form).toHaveLength(1);
    const input = wrapper.find(Page).find(Form).find(Input);
    expect(input).toHaveLength(1);
    const submit = wrapper
      .find(Page)
      .find(Form)
      .find(Submit);
    expect(submit).toHaveLength(1);
  });
  describe("on submit form", () => {
    describe("when avatar is received", () => {
      it("should display avatar with right props", async () => {
        const input = wrapper.find(Input);
        await act(async () => {
          await input.simulate("change", {
            target: {
              value: "deikean@gmail.com"
            }
          });
        });

        wrapper.update();
        const form = wrapper.find(Form);
        await act(async () => {
          await form.simulate("submit");
        });
        
        wrapper.update();
        const avatar = wrapper.find(Page).find(Image);
        expect(avatar).toHaveLength(1);
        expect(avatar.props()).toEqual({
          src: "https://image.com/aaa.jpg",
          alt: "deikean@gmail.com"
        });
        const successHandler = wrapper.find(Page).find(SuccessHandler);
        expect(successHandler).toHaveLength(1);
        expect(successHandler.props()).toEqual({
          children: ["deikean@gmail.com", " has an avatar !"]
        });
      });
    });
    describe("when avatar doesn't exists", () => {
      it("should display placeholder with right props", async () => {
        const input = wrapper.find(Input);
        await act(async () => {
          await input.simulate("change", {
            target: {
              value: "fail@gmail.com"
            }
          });
        });
        wrapper.update();
        const form = wrapper.find(Form);
        await act(async () => {
          await form.simulate("submit");
        });
        wrapper.update();
        const avatar = wrapper.find(Page).find(Image);
        expect(avatar).toHaveLength(1);
        expect(avatar.props()).toEqual({
          src: placeholder.url,
          alt: placeholder.alt
        });
        const errorHandler = wrapper.find(Page).find(ErrorHandler);
        expect(errorHandler).toHaveLength(1);
        expect(errorHandler.props()).toEqual({
          children: "fail@gmail.com doesn't have any avatar !"
        });
      });
    });
  });
});