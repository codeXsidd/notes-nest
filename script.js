const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    // DELETE functionality
    deleteBtn.addEventListener('click', () => {
        // Remove the note from DOM
        note.remove()
        // Update localStorage after deletion
        updateLS()
    })

    // EDIT-SAVE functionality
    editBtn.addEventListener('click', () => {
        const isEditing = textArea.classList.contains('hidden')
        
        if (isEditing) {
            // Switch to edit mode
            main.classList.add('hidden')
            textArea.classList.remove('hidden')
            textArea.focus()
            // Change icon to save
            editBtn.innerHTML = '<i class="fas fa-save"></i>'
        } else {
            // Switch to view mode (save)
            main.classList.remove('hidden')
            textArea.classList.add('hidden')
            // Update the rendered content
            main.innerHTML = marked(textArea.value)
            // Change icon back to edit
            editBtn.innerHTML = '<i class="fas fa-edit"></i>'
            // Save to localStorage
            updateLS()
        }
    })

    // Auto-update content while typing (optional - keeps original behavior)
    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []
    notesText.forEach(note => notes.push(note.value))
    localStorage.setItem('notes', JSON.stringify(notes))
}