import { exclude, build, resolve } from './util'
import chalk from 'chalk'
import config from './config/build'

const path = resolve('dist/static')

const start = async () => {
  await exclude(path)

  const stats = await build(config)

  const { errors } = stats.toJson()

  if (stats.hasErrors()) {
    console.log(chalk.red(errors))
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
}

start()
