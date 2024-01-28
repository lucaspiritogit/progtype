import { snippets } from "../../../public/codeSnippets";

export default function TestNewSnippets() {
  return snippets.map((s, i) => (
    <div key={i}>
      <br />
      <pre>
        [{s.language}]<br />
        {s.code} <br />
      </pre>
      <br />
    </div>
  ));
}
