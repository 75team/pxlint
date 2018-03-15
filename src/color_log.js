import colors from 'colors'

export default {
  success(message) {
    console.log(`[success] ${message}`.green)
  },
  warning(message) {
    console.log('[warning] ${message}'.yellow)
  },
  error(message) {
    console.log('[error] ${message}'.red)
  },
  info(message) {
    console.log(message)
  }
}