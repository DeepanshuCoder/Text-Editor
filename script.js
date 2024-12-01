const canvas = new fabric.Canvas('canvas');
const undoStack = [];
const redoStack = [];

// Add Text
document.getElementById('addText').addEventListener('click', () => {
    const text = new fabric.Textbox('New Text', {
        left: 100,
        top: 100,
        fontSize: 20,
        fontFamily: 'Arial',
    });
    canvas.add(text);
    saveState();
});

// Change Font Family
document.getElementById('fontFamily').addEventListener('change', (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set('fontFamily', e.target.value);
        canvas.renderAll();
        saveState();
    }
});

// Change Font Size
document.getElementById('fontSize').addEventListener('input', (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        activeObject.set('fontSize', parseInt(e.target.value));
        canvas.renderAll();
        saveState();
    }
});

// Bold
document.getElementById('bold').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        const isBold = activeObject.fontWeight === 'bold';
        activeObject.set('fontWeight', isBold ? 'normal' : 'bold');
        canvas.renderAll();
        saveState();
    }
});

// Italic
document.getElementById('italic').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        const isItalic = activeObject.fontStyle === 'italic';
        activeObject.set('fontStyle', isItalic ? 'normal' : 'italic');
        canvas.renderAll();
        saveState();
    }
});

// Underline
document.getElementById('underline').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
        const isUnderline = activeObject.underline === true;
        activeObject.set('underline', !isUnderline);
        canvas.renderAll();
        saveState();
    }
});

// Undo
document.getElementById('undo').addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(JSON.stringify(canvas.toJSON()));
        const lastState = undoStack.pop();
        canvas.loadFromJSON(lastState);
        canvas.renderAll();
    }
});

// Redo
document.getElementById('redo').addEventListener('click', () => {
    if (redoStack.length > 0) {
        undoStack.push(JSON.stringify(canvas.toJSON()));
        const nextState = redoStack.pop();
        canvas.loadFromJSON(nextState);
        canvas.renderAll();
    }
});

// Save Canvas State
function saveState() {
    redoStack.length = 0; // Clear redo stack
    undoStack.push(JSON.stringify(canvas.toJSON()));
}

// Save initial state
saveState();