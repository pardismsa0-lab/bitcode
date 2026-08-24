export interface Tok {
  cls: string;
  t: string;
}

interface LangDef {
  comment: string;
  kw: string;
}

const KW_PY =
  "def|class|return|if|elif|else|for|while|import|from|as|in|not|and|or|None|True|False|lambda|try|except|finally|raise|with|yield|pass|break|continue|global|assert|is|self|print";
const KW_JS =
  "const|let|var|function|return|if|else|for|while|do|class|extends|super|new|import|export|from|default|async|await|try|catch|finally|throw|switch|case|break|continue|typeof|instanceof|this|null|undefined|true|false|of|in|yield|delete|void";
const KW_TS = `${KW_JS}|interface|type|enum|implements|public|private|protected|readonly|namespace|declare|keyof|never|unknown|any|string|number|boolean|object`;
const KW_SQL =
  "SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AND|OR|NOT|NULL|AS|DISTINCT|COUNT|SUM|AVG|UNION|INDEX|UNIQUE|DEFAULT|CASCADE|select|from|where|insert|into|values|update|set|delete|create|table|primary|key|join|left|right|inner|on|group|by|order|having|limit|and|or|not|null|as|distinct|count|index|unique";
const KW_BASH =
  "if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|export|local|sudo|cd|ls|grep|chmod|mkdir|rm|cp|mv|cat|curl|git|docker|npm|node|python|pip|apt|brew|source";
const KW_YAML = "true|false|null|yes|no|on|off";
const KW_JAVA =
  "public|private|protected|class|interface|extends|implements|return|if|else|for|while|new|import|package|void|int|long|double|boolean|String|static|final|this|super|null|true|false|try|catch|finally|throw|throws|abstract|synchronized";
const KW_GO =
  "package|import|func|return|if|else|for|range|var|const|type|struct|interface|map|chan|go|defer|select|switch|case|break|continue|nil|true|false|make|new|append|len|string|int|error";
const KW_DOCKER = "FROM|RUN|COPY|ADD|WORKDIR|ENV|EXPOSE|CMD|ENTRYPOINT|ARG|LABEL|VOLUME|USER|HEALTHCHECK";
const KW_HTML = "html|head|body|div|span|header|footer|main|section|article|nav|aside|ul|ol|li|a|p|h1|h2|h3|h4|img|button|form|input|label|table|tr|td|th|meta|link|script|style|title";
const KW_CSS =
  "display|flex|grid|position|margin|padding|color|background|border|width|height|font|gap|align|justify|content|items|transform|transition|animation|opacity|z-index|top|right|bottom|left";

const LANGS: Record<string, LangDef> = {
  py: { comment: "#[^\\n]*", kw: KW_PY },
  js: { comment: "\\/\\/[^\\n]*", kw: KW_JS },
  jsx: { comment: "\\/\\/[^\\n]*", kw: KW_JS },
  ts: { comment: "\\/\\/[^\\n]*", kw: KW_TS },
  tsx: { comment: "\\/\\/[^\\n]*", kw: KW_TS },
  sql: { comment: "--[^\\n]*", kw: KW_SQL },
  bash: { comment: "#[^\\n]*", kw: KW_BASH },
  shell: { comment: "#[^\\n]*", kw: KW_BASH },
  yaml: { comment: "#[^\\n]*", kw: KW_YAML },
  yml: { comment: "#[^\\n]*", kw: KW_YAML },
  java: { comment: "\\/\\/[^\\n]*", kw: KW_JAVA },
  go: { comment: "\\/\\/[^\\n]*", kw: KW_GO },
  dockerfile: { comment: "#[^\\n]*", kw: KW_DOCKER },
  docker: { comment: "#[^\\n]*", kw: KW_DOCKER },
  html: { comment: "<!--[\\s\\S]*?-->", kw: KW_HTML },
  css: { comment: "\\/\\*[^\\n]*?\\*\\/", kw: KW_CSS },
  txt: { comment: "#[^\\n]*", kw: "api|service|controller|repository|domain|test|src|tests|cmd|internal|pkg" },
};

const STR = `"([^"\\\\\\n]|\\\\.)*"|'([^'\\\\\\n]|\\\\.)*'|\`([^\`\\\\\\n]|\\\\.)*\``;
const NUM = "\\b\\d[\\d_]*(\\.\\d+)?\\b";

export function highlightLine(line: string, lang: string): Tok[] {
  const def = LANGS[lang] ?? LANGS.txt;
  const re = new RegExp(`(${def.comment})|(${STR})|\\b(${def.kw})\\b|(${NUM})`, "g");
  const out: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) out.push({ cls: "tk-pl", t: line.slice(last, m.index) });
    if (m[1] !== undefined) out.push({ cls: "tk-cm", t: m[0] });
    else if (m[2] !== undefined) out.push({ cls: "tk-st", t: m[0] });
    else if (m[3] !== undefined) out.push({ cls: "tk-kw", t: m[0] });
    else out.push({ cls: "tk-num", t: m[0] });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex += 1;
  }
  if (last < line.length) out.push({ cls: "tk-pl", t: line.slice(last) });
  return out;
}

export function highlightCode(code: string, lang: string): Tok[][] {
  return code.split("\n").map((line) => highlightLine(line, lang));
}

export const LANG_LABEL: Record<string, string> = {
  py: "Python",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  sql: "SQL",
  bash: "Terminal",
  shell: "Terminal",
  yaml: "YAML",
  yml: "YAML",
  java: "Java",
  go: "Go",
  dockerfile: "Dockerfile",
  docker: "Dockerfile",
  html: "HTML",
  css: "CSS",
  txt: "ساختار",
};
