import _ from "lodash";

const firstLetterOfEveryWord = (str: string) => {
    if (!str) return; 
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    return _.toUpper(acronym);
};

export default firstLetterOfEveryWord;