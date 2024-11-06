// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const withLinks = (editor)=>{

    const { isInline } = editor;
    editor.isInline = (element) => 
        element.type === 'link' ? true :isInline(element);
    return editor;
};

export default withLinks;