module.exports = ({ debug }) => (...args) => {
  if (debug) {
    const [msg, ...otherArgs] = args

    console.log(`analyticsId.${msg}`, ...otherArgs)
  }
}
