// Text editor
const elements = document.querySelectorAll('.editable');
const editor = new MediumEditor(elements, {
  placeholder: {
    text: 'Enter description here (Select the text to open the editor)',
    hideOnClick: true,
  },
  toolbar: {
    allowMultiParagraphSelection: true,
    buttons: [
      'removeFormat',
      'bold',
      'italic',
      'underline',
      'anchor',
      'h1',
      'h2',
      'h3',
      'justifyLeft',
      'justifyRight',
      'justifyCenter',
      'justifyFull',
      'quote',
    ],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    relativeContainer: null,
    standardizeSelectionStart: false,
    static: true,
    align: 'center',
    sticky: true,
    updateOnEmptySelection: false,
  },
});
