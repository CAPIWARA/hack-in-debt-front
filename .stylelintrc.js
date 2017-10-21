module.exports = {
  "processors": ["stylelint-processor-html"],
  "extends": [
    "stylelint-rscss/config"
  ],
  "rules": {
    "rscss/no-descendant-combinator": false,
    "rscss/class-format": [
      true,
      {
        "element": "^([a-z][a-z0-9]*)(-?([a-z][a-z0-9]*))+$",
      }
    ]
  }
}
