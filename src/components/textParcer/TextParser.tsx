/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Editable, Slate, withReact } from "slate-react";
import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
// import { getBlock, getMarked } from "./utils/SlateUtilityFunctions";
import withEmbeds from "./plugins/withEmbeds";
import withLinks from "./plugins/withLinks";
import withTable from "./plugins/withTable";
import withEquation from "./plugins/withEquation";
import { getBlock, getMarked } from "./utils/SlateUtilityFunctions";
interface IParcer {
  data: Descendant[];
  background?: string;
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Element = (props: any) => {
  return getBlock(props);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Leaf = ({ attributes, children, leaf }: any) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

export default function TextParcer({ data, background, color }: IParcer) {
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(withEmbeds(withTable(withLinks(withReact(createEditor())))))
      ),
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);
  console.log(background, "background");

  return (
    <Slate editor={editor} initialValue={data}>
      <div
        className="editor-wrapper"
        style={{
          background: background ? background : "#fff",
          padding: "20px 0",
          color: color ? color : "black",
        }}
      >
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
    </Slate>
  );
}
