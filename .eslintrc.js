module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": [
      2,
      {
        allow: [
          "_getExperienceSelector",
          "_getARNavigator",
          "_getARNavigator",
          "_getVRNavigator",
          "_getVRNavigator",
          "_getExperienceButtonOnPress",
          "_getExperienceButtonOnPress",
          "_exitViro",
          "_exitViro"
        ]
      }
    ]
  },
  globals: {
    fetch: false
  }
};
