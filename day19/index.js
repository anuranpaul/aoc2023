//RUN FROM adventofcode.com
const headers = new Headers({
    "User-Agent": "github.com/yolocheezwhiz/adventofcode/"
  });
  //cache puzzle input
  const day = "2023/day/19";
  localStorage[day] = localStorage[day] || (await (await fetch("https://adventofcode.com/" + day + "/input", {
    headers: headers
  })).text()).trim();
  let inputs = localStorage[day].split('\n');
  let answer_p1 = 0;
  let answer_p2 = 0;
  //we're gonna build an object of function calls
  const workflow = {};
  //split input where workflows end and where parts begin
  const len = inputs.indexOf("");
  //for part 2 - Ensure we'll evaluate until 4000
  const ranges = {
    x: [4000],
    m: [4000],
    a: [4000],
    s: [4000]
  };
  for (let i = 0; i < len; i++) {
    //get function elements
    let split = inputs[i].split("{")[1].split("}")[0].split(/:|,/);
    for (let el of split)
      //find bool evaluations
      if (el.match(/(<|>)/)) {
        ranges[el.substring(0, 1)].push(+el.substring(2) + (el.substring(1, 2) == ">" ? 0 : -1));
      }
  }
  //for part 2 - remove duplicates and order arrays
  const x = [...new Set(ranges.x)].sort((a, b) => a - b);
  const m = [...new Set(ranges.m)].sort((a, b) => a - b);
  const a = [...new Set(ranges.a)].sort((a, b) => a - b);
  const s = [...new Set(ranges.s)].sort((a, b) => a - b);
  //for each workflow
  for (let i = 0; i < len; i++) {
    //get function name
    const func_name = inputs[i].split("{")[0];
    const reg = new RegExp("(?<![a-z])" + func_name + "(?![a-z])");
    //avoid modifying the function name at the beginning of the string
    for (let j = 0; j < len; j++) inputs[j] = inputs[j].split("{")[0] + "{" + inputs[j].split("{")[1].replace(reg, "workflow." + func_name + "(xmas)");
  }
  //we loop again, this time to build workflow functions
  for (let i = 0; i < len; i++) {
    //get function name
    const func_name = inputs[i].split("{")[0];
    //build functions with ternary logic from workflows
    workflow[func_name] = new Function("x", "m", "a", "s", inputs[i]
      .replaceAll(":", "?")
      .replaceAll(",", ":")
      .replace("}", ";")
      .replace(/.*{/, "return ")
      .replaceAll("A", "x+m+a+s")
      .replaceAll("R", "0")
      .replaceAll("xmas", "x,m,a,s"));
  }
  //process each part
  for (let i = len + 1; i < inputs.length; i++) {
    const xmas = inputs[i].replace("{x=", "").replace("m=", "").replace("a=", "").replace("s=", "").replace("}", "").split(",");
    answer_p1 += workflow.in(+xmas[0], +xmas[1], +xmas[2], +xmas[3]);
  }
  console.log("part 1 answer: " + answer_p1);
  
  
  //beancounters
  let log = x.length * m.length * a.length * s.length;
  let bean = 0;
  for (let i = 0; i < x.length; i++)
    for (let j = 0; j < m.length; j++)
      for (let k = 0; k < a.length; k++)
        for (let l = 0; l < s.length; l++, bean++) {
          
          if (workflow.in(x[i], m[j], a[k], s[l]) > 0) answer_p2 += (x[i] - x[i - 1] || x[i]) * (m[j] - m[j - 1] || m[j]) * (a[k] - a[k - 1] || a[k]) * (s[l] - s[l - 1] || s[l]);
          //beancounting prints
          if (bean % 50000000 == 0) console.log(bean / 1000000 + "M/" + log / 1000000 + "M processed");
        }
  console.log("part 1 answer: " + answer_p1);
  console.log("part 2 answer: " + answer_p2);
  /*
   * we could've made this much faster by computing ranges of ranges (e.g. x[1...8] && m[23...112] && a[77...79] && s[444...467] returns true)
   * but let's not over-engineer this. My brain cannot comprehend anymore!
   */