let books = [];

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('bookForm').addEventListener('submit', submitHandler);
});

const submitHandler = (e) => {
  e.preventDefault();
  console.log(getFormBook());
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