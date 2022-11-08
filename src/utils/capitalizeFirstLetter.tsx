const capitalizeFirstLetter = (srt: string) => {
    if (!srt) {
        return "";
    }
    return srt.charAt(0).toUpperCase() + srt.slice(1);
};

export default capitalizeFirstLetter;