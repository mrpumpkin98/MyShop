import { fontSize } from "./default";

export default function Toolbar() {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-size">
          {fontSize.map((val) => (
            <option value={val} selected={val === "16px"}>
              {val.replace(/[^0-9]/g, "")}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
