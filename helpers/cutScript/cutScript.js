const cutScript = htmlContent => {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (SCRIPT_REGEX.test(htmlContent)) {
        htmlContent = htmlContent.replace(SCRIPT_REGEX, "");
    }
    return htmlContent;
}
export {
    cutScript
}