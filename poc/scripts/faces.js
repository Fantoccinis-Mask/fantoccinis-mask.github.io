namespace("fm.poc.Faces", {}, () => {
  const version = "0.0.1";
  const bodyTypes = ["fit","superman","hulk","woman"];
  const ranges = {
    eyebrows: [27,47],
    eyes: [41,48],
    mouth: [0,26]
  }
  const range = function([ min, max ]) {
    const outval = [];
    for(let i = min; i <= max; i++) {
      outval.push(i);
    }
    return outval;
  }
  const buildFace = function(bodyType, mouth, rightEyebrow, leftEyebrow, rightEye, leftEye) {
    return {
      "bodyType": bodyType,
      "bgColor": "#cccccc",
      "version": version,
      "layers": [
        {
          "part": "head",
          "index": 0,
          "shading": 0
        },
        {
          "part": "mouth",
          "index": mouth,
          "shading": 0,
          "base": "#990000"
        },
        {
          "part": "eyebrows",
          "index": leftEyebrow,
          "shading": 0
        },
        {
          "part": "eyebrows",
          "index": rightEyebrow,
          "shading": 0,
          "flip": true
        },
        {
          "part": "eyes",
          "index": leftEye,
          "shading": 0
        },
        {
          "part": "eyes",
          "index": rightEye,
          "shading": 0,
          "flip": true
        }
      ]
    }
  }
  const buildSymetricalFace = function(bodyType, mouth, eyebrow, eye) {
    return buildFace(bodyType, mouth, eyebrow, eyebrow, eye, eye)
  }
  const buildForEachMouth = function(bodyType) {
    return range(ranges.mouth).map(mouth => buildSymetricalFace(bodyType, mouth, ranges.eyebrows[0], ranges.eyes[0]));
  }
  const buildForAllSymetricalEyes = function(bodyType) {
    return range(ranges.eyebrows).reduce((acc, eyebrow) => acc.concat(range(ranges.eyes).map(eye => buildSymetricalFace(bodyType, ranges.mouth[0], eyebrow, eye))), []);
  }
  const buildForAllMixedEyes = function(bodyType) {
    const eyebrows = range(ranges.eyebrows);
    const eyes = range(ranges.eyes);
    console.log({ eyebrows, eyes });
    const outval = [];
    eyebrows.forEach((leftEyebrow) => {
      eyebrows.forEach((rightEyebrow) => {
        eyes.forEach((leftEye) => {
          eyes.forEach((rightEye) => {
            outval.push(buildFace(bodyType, ranges.mouth[0], rightEyebrow, leftEyebrow, rightEye, leftEye));
          });
        });
      });
    });
    return outval;
  }
  return { version, bodyTypes, ranges, buildFace, buildSymetricalFace, buildForEachMouth, buildForAllSymetricalEyes, buildForAllMixedEyes };
});