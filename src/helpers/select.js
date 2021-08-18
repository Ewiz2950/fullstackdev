function select(attribute, field) {
    if (attribute == field) {
        return `<option selected value="${field}">${field}</option>`
    } else {
        return `<option value="${field}">${field}</option>`
    }
}