const storageKey = 'BOOKSHELF';
let books = [];

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('bookForm').addEventListener('submit', submitHandler);
  document.getElementById('populateButton').addEventListener('click', populateBooksHandler);
  document.getElementById('emptyButton').addEventListener('click', emptyRackHandler);
  document.getElementById('searchInput').addEventListener('input', searchBookHandler);

  books = loadBooks();
  renderBooks(books);
});

const submitHandler = (e) => {
  e.preventDefault();
  if(!isValidForm()){
    alert('harap isi form judul, penulis, tahun dengan benar!');
    return;
  }

  books.push(getFormBook());
  e.target.reset();
  renderBooks(books);
  saveBooks(books);
}

const getFormBook = () => {
  return {
    id: +new Date(),
    title: document.getElementById('inputJudul').value,
    author: document.getElementById('inputPenulis').value,
    year: document.getElementById('inputTahun').value,
    isComplete: document.getElementById('inputSelesai').checked
  }
}

const isValidForm = () => {
  const judul = document.getElementById('inputJudul').value;
  const penulis = document.getElementById('inputPenulis').value;
  const tahun = document.getElementById('inputTahun').value;

  return (judul && penulis && tahun);
}

const isStorageAvailable = () => (typeof (Storage) !== 'undefined');

const loadBooks = () => {
  if(!isStorageAvailable) return [];
  
  const storageData = localStorage.getItem(storageKey);
  if( storageData === null) return [];
  
  return JSON.parse(storageData);
}

const saveBooks = (booksToSave) => {
  if(!isStorageAvailable) return;

  localStorage.setItem(storageKey, JSON.stringify(booksToSave));
}

const createEmptyBookElement = (text) => createElement('p', 'empty-book', text);

const createBookElement = (book) => {
  const {id, title, author, year, isComplete} = book;

  const titleElm = createElement('h3', 'book__title', title);
  const yearElm = createElement('span', 'book__year', ` (${year})`);
  const authorElm = createElement('p', 'book__author', `oleh ${author}`);
  const deleteBtn = createElement('button', 'btn-delete', 'Hapus');
  
  deleteBtn.addEventListener('click', ()=> {
    deleteBookHandler(id, title);
  });

  let moveBtn;
  if(isComplete) moveBtn = createElement('button', 'btn-unfinish', 'Belum Selesai Baca');
  else moveBtn = createElement('button', 'btn-finish', 'Selesai Baca');

  moveBtn.addEventListener('click', () => {
    moveRackHandler(id, isComplete);
  })

  const headerElm = document.createElement('header');
  headerElm.appendChild(titleElm).appendChild(yearElm);

  const container = document.createElement('div');
  container.className = 'book';
  container.appendChild(headerElm);
  container.appendChild(authorElm);
  container.appendChild(moveBtn);
  container.appendChild(deleteBtn);

  return container;
}

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = text
  return element;
}

const removeChilds = (container) => {
  while(container.hasChildNodes()){
    container.removeChild(container.firstChild);
  }
}

const renderBooks = (booksToRender) => {
  const unfinishedContainer = document.getElementById('unfinishedBooks');
  const finishedContainer = document.getElementById('finishedBooks');

  removeChilds(unfinishedContainer);
  removeChilds(finishedContainer);

  booksToRender.forEach((book) => {
    if(book.isComplete){
      finishedContainer.appendChild(createBookElement(book));
    } else {
      unfinishedContainer.appendChild(createBookElement(book));
    }
  });

  if(!finishedContainer.hasChildNodes()){
    finishedContainer.appendChild(createEmptyBookElement('Belum ada buku yang selesai dibaca'));
  }
  if(!unfinishedContainer.hasChildNodes()){
    unfinishedContainer.appendChild(createEmptyBookElement('Tidak ada buku yang belum selesai dibaca'));
  }
}

const populateBooksHandler = () => {
  books = [
    {
      id: 1,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      year: '1997',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Supernova',
      author: 'Dewi Lestari',
      year: '2001',
      isComplete: false,
    },
    {
      id: 3,
      title: 'Hujan',
      author: 'Tere Liye',
      year: '2016',
      isComplete: true,
    },
    {
      id: 4,
      title: 'Negri 5 Menara',
      author: 'Ahmad Fuadi',
      year: '2009',
      isComplete: false,
    },
    {
      id: 5,
      title: 'Naruto',
      author: 'Masashi Kishimoto',
      year: '2000',
      isComplete: true,
    },
  ];

  renderBooks(books);
  saveBooks(books);
}

const searchBookHandler = (e) => {
  const keyword = e.target.value;

  if(keyword){
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(keyword));
    renderBooks(filteredBooks);
    return;
  }

  renderBooks(books);
}

const deleteBookHandler = (id, title) => {
  const proceed = confirm(`Apakah Anda yakin ingin menghapus ${title}?`);
  if(!proceed) return;

  books = books.filter((book) => book.id != id);
  
  renderBooks(books);
  saveBooks(books);
}

const moveRackHandler = (id, isComplete) => {
  const index = books.findIndex((book) => book.id == id);
  books[index].isComplete = !isComplete;

  renderBooks(books);
  saveBooks(books);
}

const emptyRackHandler = () => {
  const proceed = confirm('Semua buku akan dihapus, apakah anda yakin?');
  if(!proceed) return;
  
  books = [];
  renderBooks(books);
  saveBooks(books);
}