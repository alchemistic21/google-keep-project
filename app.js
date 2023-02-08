class Note {
    constructor(id, title, text) {
      this.id = id;
      this.title = title;
      this.text = text;
    }
  }
  
  class App {
    constructor() {
      // localStorage.setItem('test', JSON.stringify(['123']));
      // JSON.parse(localStorage.getItem('test'));
      this.notes = JSON.parse(localStorage.getItem('notes')) || [];
      console.log(this.notes);
      this.selectedNoteId = ""
      this.miniSidebar = true;
  
      this.$activeForm = document.querySelector(".active-form");
      this.$inactiveForm = document.querySelector(".inactive-form");
      this.$noteTitle = document.querySelector("#note-title");
      this.$noteText = document.querySelector("#note-text");
      this.$notes = document.querySelector(".notes");
      this.$form = document.querySelector("#form");
      this.$modal = document.querySelector(".modal");
      this.$modalForm = document.querySelector("#modal-form");
      this.$modalTitle = document.querySelector("#modal-title");
      this.$modalText = document.querySelector("#modal-text");
      this.$closeModalForm = document.querySelector("#modal-btn");
      this.$sidebar = document.querySelector(".sidebar");
      this.$sidebarActiveItem = document.querySelector(".active-item");
  
      this.addEventListeners();
      this.dislayNotes();
    }
  
    addEventListeners() {
      document.body.addEventListener("click", (event) => {
        this.handleFormClick(event);
        this.closeModal(event);
        this.openModal(event);
        this.handleArchiving(event);
      })
  
      this.$activeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        this.addNote(cuid(), title, text);
        this.closeActiveForm();
      })

      this.$modalForm.addEventListener("submit", (event) => {
        event.preventDefault();
      })

        this.$sidebar.addEventListener("mouseover", (event) => {
          this.handleToggleSidebar();
        })
        this.$sidebar.addEventListener("mouseout", (event) => {
          this.handleToggleSidebar();
        })

    }
  

    handleFormClick(event) {
      const isActiveFormClickedOn = this.$activeForm.contains(event.target);
      const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
  
      if (isInactiveFormClickedOn) {
        this.openActiveForm();
      } 
      else if (!isInactiveFormClickedOn && !isActiveFormClickedOn) {
        this.addNote({ title, text});
        this.closeActiveForm();
      }
    }
  
    opeActiveForm() {
      this.$inactiveForm.style.display = "none";
      this.$activeForm.style.display = "block";
      this.$noteText.focus();
    }
    closeActiveForm() {
      this.$inactiveForm.style.display = "block";
      this.$activeForm.style.display = "none";
      this.$noteTitle.value = "";
      this.$noteText.value = "";
    }
  
    openModal(event) {
      const $selectedNote = event.target.closest(".note");
      if($selectedNote && !event.target.closest(".archive")) {
        this.selectedNoteId = $selectedNote.id;
        this.$modalTitle.value = $selectedNote.children[1].innerHTML;
        this.$modalText.value = $selectedNote.children[2].innerHTML
        this.$modal.classList.add("open-modal");
      } else {
           return;
      }
    }

    closeModal(event) {
      const isModalFormClickedOn = this.$modalForm.contains(event.target);
      const isCloseModalBtnClickedOn = this.$closeModalForm.contains(events.target);
      if((!isModalFormClickedOn || isCloseModalBtnClickedOn) && this.$modal.classList.contains("open-modal")) {
        this.editNote(this.selectedNoteId, { title: this.$modalTitle.value, text: this.$modalText});
        this.$modal.classList.remove("open-modal");
      }
    }
  
    handleArchiving(event) {
      const $selectedNote = event.target.closest(".note");
      if($selectedNote && event.target.closest(".archive")) {
          this.selectedNoteId = $selectedNote.id;
          this.deleteNote(this.selectedNoteId);
      } else {
          return;
      }
   }

    addNote({ title, text}) {
      if (text != "") {
        const newNote = new Note(cuid(), title, text);
        this.notes = [...this.notes, newNote];
        this.render();
      }
    }
  
    editNote(id, {title, text}) {
      this.notes = this.notes.map((note) => {
        if (note.id == id) {
          note.title = title;
          note.text = text;
        }
        return note;
      });
      this.render();
    }
  
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id != id);
      this.render();
    }
  
handleMouseOverNote(element) {
  const $note = document.querySelector("#"+element.id);
  const $checkNote = $note.querySelector(".check-circle")
  const $noteFooter = $note.querySelector(".note-footer")
  $checkNote.style.visibility = "visible";
  $noteFooter.style.visibility = "visible";
 }

handleMouseOutNote(element) {
  const $note = document.querySelector("#"+element.id);
  const $checkNote = $note.querySelector(".check-circle")
  const $noteFooter = $note.querySelector(".note-footer")
  $checkNote.style.visibility = "hidden";
  $noteFooter.style.visibility = "hidden";
 }

handleToggleSidebar() {
  if(this.iniSidebar) {
    this.$sidebar.style.width = "250px";
    this.$sidebar.classList.add("sidebar-hover");
    this.miniSidebar = false;
  }
  else {
    this.$sidebar.style.width = "80px";
    this.$sidebar.classList.remove("sidebar-hover");
    this.miniSidebar = true;
  }
}

  savedNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  render() {
    this.savedNotes();
    this.displayNotes();
  }

  displayNotes() {
    // Need to fill still 
  }

}
