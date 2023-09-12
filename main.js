let books = [];

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('bookForm').addEventListener('submit', submitHandler);
});

const submitHandler = (e) => {
  e.preventDefault();
  if(!isValidForm()){
    alert('harap isi form judul, penulis, tahun dengan benar!');
    return;
  }

  books.push(getFormBook());
  e.target.reset();
  renderBooks();
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

const createEmptyBookElement = (text) => {
  const element = document.createElement('p');
  element.innerText = text;
  return element;
}

const renderBooks = () => {
  const unfinishedContainer = document.getElementById('unfinishedBooks');
  const finishedContainer = document.getElementById('finishedBooks');

  if(!finishedContainer.hasChildNodes()){
    finishedContainer.appendChild(createEmptyBookElement('Belum ada buku yang selesai dibaca'));
  }
  if(!unfinishedContainer.hasChildNodes()){
    unfinishedContainer.appendChild(createEmptyBookElement('Tidak ada buku yang belum selesai dibaca'));
  }
}