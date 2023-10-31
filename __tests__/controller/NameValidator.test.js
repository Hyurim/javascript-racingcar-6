import App from "../../src/App.js";
import { Console } from "@woowacourse/mission-utils";
import NAME_ERROR_MESSAGE from "../../src/MVC/Constants/nameErrorMessage.js";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe("자동차 이름 입력 테스트", () => {
  test("이름 길이가 6자 이상인 경우", async () => {
    //given
    const inputs = ["hyuri,hyu,hyurim"];
    mockQuestions(inputs);

    //when
    const app = new App();

    //then
    await expect(app.play()).rejects.toThrow(
      `${NAME_ERROR_MESSAGE.nameLimitError}`
    );
  });

  test.each([[["hyuri,hyu,hyuri2309"]], [["hyurine"]], [["12345,123456789"]]])(
    "이름이 6자 이상으로 되어 있는 추가 경우",
    async (inputs) => {
      //given
      mockQuestions(inputs);

      //when
      const app = new App();

      //then
      await expect(app.play()).rejects.toThrow(
        `${NAME_ERROR_MESSAGE.nameLimitError}`
      );
    }
  );

  test.each([[["hyuri,hyu,hyuri"]]])(
    "중복된 이름이 있는 경우",
    async (inputs) => {
      //given
      mockQuestions(inputs);

      //when
      const app = new App();

      //then
      await expect(app.play()).rejects.toThrow(
        `${NAME_ERROR_MESSAGE.duplicateError}`
      );
    }
  );

  test.each([[["hyuri,hyu,yu,hyu "]], [["hyuri,ri,hri, hri"]]])(
    "처음과 마지막 공백을 제외할 경우 중복된 이름이 있는 경우",
    async (inputs) => {
      //given
      mockQuestions(inputs);

      //when
      const app = new App();

      //then
      await expect(app.play()).rejects.toThrow(
        `${NAME_ERROR_MESSAGE.duplicateError}`
      );
    }
  );

  test.each([[[""]]])("하나의 공백만 입력된 경우", async (inputs) => {
    // given
    mockQuestions(inputs);

    //when
    const app = new App();

    // then
    await expect(app.play()).rejects.toThrow(
      `${NAME_ERROR_MESSAGE.emptyError}`
    );
  });

  test.each([
    [["hyuri, ,hyu"]],
    [[" ,hyu,rim"]],
    [["hyu,hyuri, "]],
    [["hyu,,hyuri"]],
    [[",hyuri,hyu"]],
    [["hyuri,hyu,"]],
  ])("공백이 포함된 경우", async (inputs) => {
    //given
    mockQuestions(inputs);

    //when
    const app = new App();

    //then
    await expect(app.play()).rejects.toThrow(
      `${NAME_ERROR_MESSAGE.emptyIncludesError}`
    );
  });

  test.each([[[", ,  ,    ,     "]], [["  ,   ,    "]]])(
    "공백으로만 이루어진 경우",
    async (inputs) => {
      //given
      mockQuestions(inputs);

      //when
      const app = new App();

      //then
      await expect(app.play()).rejects.toThrow(
        `${NAME_ERROR_MESSAGE.onlyEmptyError}`
      );
    }
  );
});
