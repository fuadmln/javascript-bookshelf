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
  console.log(books);
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