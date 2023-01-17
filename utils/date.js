const moment = require("moment");

const formatTimestamp = (timestamp, options = {}) => {
    const { format = "MMMM Do, YYYY [at] h:mm a" } = options;
    return moment(timestamp).format(format);
};

module.exports = formatTimestamp;