namespace("fm.poc.Faces", {}, () => {
  const bodyTypes = ["fit","superman","hulk","woman"];
  const ranges = {
    eyebrows: [27,47],
    eyes: [41,48],
    mouth: [0,26]
  }
  const buildFace = function(bodyType, mouth, rightEyebrow, leftEyebrow, rightEye, leftEye) {
    return {
      "bodyType": bodyType,
      "bgColor": "#cccccc",
      "version": "0.0.1",
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
    return ranges.mouth.map(mouth => buildSymetricalFace(bodyType, mouth, ranges.eyebrows[0], ranges.eyes[0]));
  }
  const buildForAllSymetricalEyes = function(bodyType) {
    return ranges.eyebrows.reduce((acc, eyebrow) => acc.concat(ranges.eyes.map(eye => buildSymetricalFace(bodyType, ranges.mouths[0], eyebrow, eye))), []);
  }
  const buildForAllMixedEyes = function(bodyType) {
    return ranges.eyebrows.reduce((acc,leftEyebrow) => {
      return acc.concat(ranges.eyebrows.reduce((acc, rightEyebrow) => {
        return acc.concat(ranges.eyes.reduce((acc, leftEye) => {
          return acc.concat(ranges.eyes.map(rightEye => buildFace(bodyType, ranges.mouths[0], rightEyebrow, leftEyebrow, rightEye, leftEye)));
        }), acc);
      }), acc);
    }, []);
  }
  return { bodyTypes, ranges, buildFace, buildSymetricalFace, buildForEachMouth, buildForAllSymetricalEyes, buildForAllMixedEyes };
});