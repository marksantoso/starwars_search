import rename from 'deep-rename-keys';

// Reverse engineer code from http://jalequin.atwebpages.com/Pages/Other/Translators/Shyriiwook.php

// define translation array
let wookieeCodes = new Array(47);
wookieeCodes["A"] = "A";
wookieeCodes["B"] = "B";
wookieeCodes["C"] = "C";
wookieeCodes["D"] = "D";
wookieeCodes["E"] = "E";
wookieeCodes["F"] = "F";
wookieeCodes["G"] = "G";
wookieeCodes["H"] = "H";
wookieeCodes["I"] = "I";
wookieeCodes["J"] = "J";
wookieeCodes["K"] = "K";
wookieeCodes["L"] = "L";
wookieeCodes["M"] = "M";
wookieeCodes["N"] = "N";
wookieeCodes["O"] = "O";
wookieeCodes["P"] = "P";
wookieeCodes["Q"] = "Q";
wookieeCodes["R"] = "R";
wookieeCodes["S"] = "S";
wookieeCodes["T"] = "T";
wookieeCodes["U"] = "U";
wookieeCodes["V"] = "V";
wookieeCodes["W"] = "W";
wookieeCodes["X"] = "X";
wookieeCodes["Y"] = "Y";
wookieeCodes["Z"] = "Z";
wookieeCodes["ac"] = "h";
wookieeCodes["ah"] = "i";
wookieeCodes["ak"] = "p";
wookieeCodes["an"] = "l";
wookieeCodes["hu"] = "u";
wookieeCodes["ho"] = "v";
wookieeCodes["oa"] = "c";
wookieeCodes["oh"] = "w";
wookieeCodes["oo"] = "o";
wookieeCodes["or"] = "k";
wookieeCodes["ra"] = "a";
wookieeCodes["rc"] = "r";
wookieeCodes["rh"] = "b";
wookieeCodes["ro"] = "y";
wookieeCodes["rq"] = "q";
wookieeCodes["rr"] = "g";
wookieeCodes["sh"] = "j";
wookieeCodes["sc"] = "m";
wookieeCodes["uf"] = "z";
wookieeCodes["wa"] = "d";
wookieeCodes["wo"] = "e";
wookieeCodes["ww"] = "f";
wookieeCodes["wh"] = "n";
wookieeCodes["lh"] = "l";
wookieeCodes["c"] = "s";
wookieeCodes["ao"] = "t";
wookieeCodes["k"] = "x";
wookieeCodes["1"] = "1";
wookieeCodes["2"] = "2";
wookieeCodes["3"] = "3";
wookieeCodes["4"] = "4";
wookieeCodes["5"] = "5";
wookieeCodes["6"] = "6";
wookieeCodes["7"] = "7";
wookieeCodes["8"] = "8";
wookieeCodes["9"] = "9";
wookieeCodes["0"] = "0";
wookieeCodes[" "] = " ";
wookieeCodes["\n"] = "\n";
wookieeCodes["!"] = "!";
wookieeCodes["?"] = "?";
wookieeCodes["."] = ".";
wookieeCodes[","] = ",";
wookieeCodes["/"] = "/";
wookieeCodes[":"] = ":";
wookieeCodes["&"] = "&";
wookieeCodes["="] = "=";
wookieeCodes["_"] = "_";
wookieeCodes["-"] = "-";

export const translateString = (string) => {

    var keys = string.split("");
    let newString = '';

    let temp;
    for (var x = 0; x < keys.length; x++) {
        if (keys[x] == "a" || keys[x] == "o" || keys[x] == "r" || keys[x] == "s" || keys[x] == "u" || keys[x] == "w" || keys[x] == "h") { //
            temp = keys[x] +keys[x + 1];x++;
        } else
        { temp = keys[x];
        }
        if
        (wookieeCodes[temp]) {newString += wookieeCodes[temp] +"";
        }
    }

    return
    newString;
}

export
const translateObj = (obj) => {

    // fix broken object, null is in wookiee
    let
    data; if
    (typeofobj === 'string') {data = obj. split('whhuanan').join('null');data = data. split('\\rc\\').join(' ');data = JSON. parse(data);

    } else
    { data = obj;
    }

    let
    temp; var
    obj = rename( data, function(key) {var
        keys = key. split("");let
        newKey = ''; if
        (keys. length > 0) {let
            temp; for
            (varx = 0; x < keys. length; x++) {if
                (keys[x] =="a" || keys[x] =="o" || keys[x] =="r" || keys[x] =="s" || keys[x] =="u" || keys[x] =="w" || keys[x] =="h") { //
                temp =
                    keys[x] + keys[x +1]; x++;
                } else
                    {
                temp =
                    keys[x];
                }
                if
                    (wookieeCodes[temp]) {newKey +=
                    wookieeCodes[temp] + "";
                }
            }
            return
                newKey;
        }
        return
            key;
    });

    return obj
}
