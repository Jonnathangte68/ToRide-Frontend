export default function convertVhToPx(vh, type: "w" | "h" = "w") {
    try {
        // d = a * (b / c)
        // d / (b / c) = a
        if (type === "h") {
            return vh / (100 / document.documentElement.clientHeight);
        }
        return vh / (100 / document.documentElement.clientWidth);
    } catch(err) { console.log("err with transform units vh to px"); }
}