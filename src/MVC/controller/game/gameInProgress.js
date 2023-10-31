import progressOutput from "../../view/output/progressOutput.js";

const gameInProgress = (keyValue) => {
  keyValue.forEach((value) => {
    const name = Object.keys(value)[0];
    const hyphen = value[name];
    progressOutput.gameInProgressPrint(name, hyphen);
  });
};

export default gameInProgress;
