const contentEl = document.getElementById("content");

let blink = false;
let blinkDelay = 500;
let cursorShown = false;

let content = "";
const contentPrefix = ""; // normally \n
content += contentPrefix;


let setContent = str => {
  content = str;
};

let appendContent = str => {
  setContent(content + str);
};


let wait = ms => new Promise(r => setTimeout(() => r(), ms));

window.int1 = setInterval(() => contentEl.innerText = content + (blink && cursorShown ? "_" : ""), 30)
window.int2 = setInterval(() => cursorShown = !cursorShown, blinkDelay);

const SCHEMAS = {
  text: async (data) => {
    appendContent(data[1]);
    if(data[2]) await wait(data[2]);
  },
  delay: async (data) => {
    await wait(data[1]);
  },
  write: async (data) => {
    let t = 0;
    while (data[1].length > t) {
      let char = data[1][t];
      let charLast = data[1][t - 1];
      appendContent(charLast == " " ? " " + char : char);
      t++;
      await wait(data[2] || 25);
    }
  },
  blink: () => blink = true,
  noblink: () => blink = false,
  clear: () => content = contentPrefix + "",
};

let printSchema = async schemas => {
  for (let i = 0; schemas[i]; i++) {
    let data = schemas[i];
    await SCHEMAS[data[0]](data);
  }
};




const timedText = (str, totalTime) => ["write", str, totalTime / str.length];

const main = async () => {
  await SCHEMAS.blink();
  await printSchema([
    timedText('Linux raspberrypi 5.10.17+ #1414 Fri Apr 30 13:16:27 BST 2021 armv6l\n\nThe programs included with the Debian GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nDebian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nLast login: Wed Dec  1 14:51:36 2021 from 192.168.1.3', 3000),
    timedText('\n\nreis@raspberrypi:~ $', 1000),
    ["delay", 1000],
    timedText(' cd stats', 1000),
    timedText('\nreis@raspberry:~/stats $', 1000),
    timedText(' node stats.js', 1500),
    timedText('\nHi, I\'m reis.\nI\'m a JS Backend developer\nDiscord: reis#1215\nGitHub: reisxd\nStuff that i created:\nDr.Coomer\n2DCraft\n... and many more which isn\'t listed here.'),
    timedText('\nreis@raspberry:~/stats $ ', 1000)
  ])
};
main();

contentEl.style.padding = "2rem"
