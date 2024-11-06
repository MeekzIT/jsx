// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const withEquation = (editor) =>{
    const { isInline } = editor;
    editor.isInline = (element) =>
        element.type === 'equation' && element.inline ? true : isInline(element)
    return editor;
}

export default withEquation;