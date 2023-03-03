function is_request_valid(props, body) {
    for (let i = 0; i < props.length; i++) {
        if (!(props[i] in body)) {
            return false;
        }
    }
    return true;
}

module.exports = is_request_valid;