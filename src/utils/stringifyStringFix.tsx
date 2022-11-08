function stringifyStringFix(text: any) {
    let json = text;
    json.replace(/\\"/g,"\uFFFF");  // U+ FFFF
    //eslint-disable-next-line
    json = json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"');
    return json;
}

export default stringifyStringFix;