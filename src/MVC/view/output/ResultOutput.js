import { Console } from "@woowacourse/mission-utils";
import GAME_MESSAGE from "../../constants/gameMessage.js";
import SYMBOLS from "../../constants/symbols.js";

class Output {
  static winnerPrint(result) {
    Console.print(
      `${GAME_MESSAGE.winner}${result.join(SYMBOLS.spaceAndComma)}`
    );
  }
}

export default Output;
