let books = [];

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('bookForm').addEventListener('submit', submitHandler);
});

const submitHandler = (e) => {
  e.preventDefault();
  console.log('submitted');
}