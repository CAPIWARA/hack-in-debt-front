const parse = (value, alternative = false) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return alternative
  }
}

const initial = {
  NODE_ENV: '"development"',
  PORT: '8080',
  JS_SOURCE_MAP: '"#source-map"',
  JS_MINIFY: 'false',
  CSS_EXTRACT: 'false',
  CSS_MINIFY: 'false',
  CSS_SOURCE_MAP: 'false',
  HTML_MINIFY: 'false',
  API: '"https://github.com/"',
  ROLLBAR_TOKEN: 'null',
  ROLLBAR_CAPTURE_UNCAUGHT: 'true',
  ROLLBAR_CAPTURE_UNHANDLED: 'true'
}

const getInitialized = () => {
  const keys = Object.keys(initial)

  const env = Object.entries(process.env).reduce((env, [key, value]) => {
    if (keys.includes(key)) {
      env[key] = value
    }
    return env
  }, {})

  return env
}

const env = { ...initial, ...getInitialized() }

exports.env = env

exports.__dirname = __dirname
exports.__filename = __filename

Object.entries(env).forEach(([key, value]) => exports[key] = parse(value))
