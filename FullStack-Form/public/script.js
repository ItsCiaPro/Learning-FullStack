let formsContainer = document.getElementById('form-box')

function switchForm(formId) {
   document.getElementById('login-form').classList.remove('active');
   document.getElementById('register-form').classList.remove('active');

   document.getElementById(formId).classList.add('active')

   if (formsContainer.classList.contains('slide-left')) {
      formsContainer.classList.remove('slide-left');
      formsContainer.classList.add('slide-right')
   } 
   
   else if (formsContainer.classList.contains('slide-right')) {
      formsContainer.classList.remove('slide-right');
      formsContainer.classList.add('slide-left')
   } 
   
   else if (!formsContainer.classList.contains('slide-right') && !formsContainer.classList.contains('slide-left')) {
      formsContainer.classList.add('slide-right')
   }
}