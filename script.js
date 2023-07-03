const form = document.querySelector('form');
const progressBar = document.querySelector('.progress-bar');
const btn = document.querySelector('#btn');
console.log(btn);

console.log(progressBar);
let firstName = '';

form.addEventListener('keydown', e => {
  const target = e.target;
  const value = target.value;
  const length = value.length + 1;
  const min = Number(target.getAttribute('minlength'));
  const max = Number(target.getAttribute('maxlength'));
  const pattern = target.getAttribute('pattern')
  const id = target.id;
  const span = target.nextElementSibling;
  
  if (length > min && length < max && value.match(pattern)) { 
    addValid(target);
    switch (id) {
      case "fname":
        span.textContent = 'A fantastic name!';
        break;
      case "lname":
        span.textContent = 'A great family I hear.';
        break;
      case "email":
        span.textContent = 'Creative email right here.';
        break;
      case "area-code":
        break;
      case "number":
        span.textContent = 'Push notification incoming (just kidding)';
        break;
      case "password":
        span.textContent = 'Juuuust right!';
        break;
    }
  } else {
    addInvalid(target);
    switch (id) {
      case "fname":
        if (length < min) {
          span.textContent = 'Is your name really that short?';
        } else if (!value.match(pattern)) {
          span.textContent = 'Capital letters. Keep it clean please.'
        } else if (length > max) {
          addInvalid(target);
          span.textContent = 'Is your name really this long?'
        }
        break;

      case "lname":
        if (length < min) {
          span.textContent = 'Short for a family name?';
        } else if (!value.match(pattern)) {
          span.textContent = 'Capital letters. What would your parent say?'
        } else if (length > max) {
          addInvalid(target);
          span.textContent = 'I\'ve never heard of this family?'
        }
        break;

      case "email":
        if (length < min) {
          span.textContent = 'Come on, thats not enough for the .com part?';
        } else if (!value.match(pattern)) {
          span.textContent = 'Yup, should bounce'
          console.log(pattern)
        } else if (length > max) {
          addInvalid(target);
          span.textContent = 'You own the record for longest address?'
        }
        break;

        case "area-code":
          break;
      
        case "number":
          if (length < min) {
            span.textContent = 'Don\'t worry, we wont prank call you.';
          } else if (!value.match(pattern)) {
            span.textContent = 'You know theres a standard right? E.164'
            console.log(pattern)
          } else if (length > max) {
            addInvalid(target);
            span.textContent = 'Your keyboard getting tired?'
          }
          break;
        
        case "password":
          if (length < min) {
            span.textContent = 'Too short';
          } else if (!value.match(pattern)) {
            span.textContent = 'Too simple, mix of numbers, capitals, letters, and specials'
            console.log(pattern)
          } else if (length > max) {
            addInvalid(target);
            span.textContent = 'Too long, you ever going to remember that?';
          }
          break;
    }
  }
})

form.addEventListener('focusout', e => {
  const target = e.target;
  const value = target.value;
  const id = target.id;
  const span = target.nextElementSibling;

  if (id === 'pconf') {
    const currentPassword = document.querySelector('#password').value;
    
    if (value === currentPassword) {
      addValid(target);
      span.textContent = 'A perfect match!'
    } else {
      addInvalid(target);
      console.log(value)
      console.log(currentPassword)
      span.textContent = 'Told you you would not remember.'
    }
  }

  const inputs = form.querySelectorAll('input');
  const inputsArray = [...inputs];
  const validInputs = inputsArray.filter(input => input.dataset.isValid === 'true').map(input => input.id);

  if (validInputs.includes('fname')) {
    firstName = form.querySelector('#fname').value;
    console.log(firstName);
  }

  const validInputsLength = validInputs.length;
  const progressBarLength = ((validInputsLength / inputsArray.length) * 100).toFixed(2);
  progressBar.style.width = `${progressBarLength}%`;

  if (progressBarLength >= 100) {
    btn.removeAttribute('disabled');
    btn.textContent = '';
    btn.textContent = `Let's go ${firstName}`;
  }
})

const addValid = target => {
  target.dataset.isValid = 'true';
  target.classList.remove('invalid');
  target.classList.add('valid');
} 

const addInvalid = target => {
  target.dataset.isValid = 'false';
  target.classList.remove('valid');
  target.classList.add('invalid');
}