const log = ({ debug }) => (...args) => {
  if (debug) {
    const [msg, ...otherArgs] = args

    console.log(`analyticsId.${msg}`, ...otherArgs)
  }
}

export default log
