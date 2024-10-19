/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Editable, Slate, withReact } from "slate-react";
import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import withEmbeds from "./plugins/withEmbeds";
import withLinks from "./plugins/withLinks";
import withTable from "./plugins/withTable";
import withEquation from "./plugins/withEquation";
import { getBlock, getMarked } from "./utils/SlateUtilityFunctions";
interface IParcer {
  data: Descendant[];
}

const Element = (props: any) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }: any) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

export default function TextParcer({ data }: IParcer) {
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(withEmbeds(withTable(withLinks(withReact(createEditor())))))
      ),
    []
  );

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={data}>
      <div
        className="editor-wrapper"
        style={{ background: "#f3f3f3", padding: "20px" }}
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
