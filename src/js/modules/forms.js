export default class Forms {
   constructor() {
      this.forms = document.querySelectorAll('form');
      this.message = {
         loading: 'Loading...',
         success: 'Thank you! we will call you back!',
         failure: 'Something wrong...'
      };
      this.path = '../../assets/server.php';
   }
   checkMailInputs() {
      const mailInputs = document.querySelectorAll("[type='email']")
      mailInputs.forEach(input => {
         input.addEventListener('keydown', (e) => {
            
            if (e.key.match(/[^a-z 0-9 @ \. \_ \-]/ig)) {
               e.preventDefault();
            }
         });
      });
   }
   
   initMask() {
      let setCursorPosition = (pos, elem) => {
         elem.focus();

         if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
         } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
         }
      };

      function createMask() {
         let matrix = '+1 (___) ___-____',
            i = 0,
            def = matrix.replace(/\D/g, ''), 
            val = this.value.replace(/\D/g, ''); 


         if (def.length >= val.length) {
            val = def;
         }

         this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
         }); 
         if (event.type === 'blur') {
            if (this.value.length == 2) {
               this.value = '';
            }
         } else {
            setCursorPosition(this.value.length, this);
         }
      }

      let inputs = document.querySelectorAll('[name="phone"]');

      inputs.forEach(input => {
         input.addEventListener('input', createMask);
         input.addEventListener('focus', createMask);
         input.addEventListener('blur', createMask);
      });
   }

   async postData(url, data) {
      let res = await fetch(url, {
         method: 'POST',
         body: data
      });

      return await res.text();
   }
   init() {
      this.checkMailInputs();
      this.initMask();
      this.forms.forEach(form => {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.style.cssText = `
               margin-top: 15px;
               font-size: 10px;
               color: grey;
            `;
            form.parentNode.appendChild(statusMessage);

            statusMessage.textContent = this.message.loading;

            const formData = new FormData(form);
            this.postData(this.path, formData)
               .then(res => {
                  console.log(res);
                  statusMessage.textContent = this.message.success;
               })
               .catch(() => {
                  statusMessage.textContent = this.message.failure;
               })
               .finally(() => {
                  form.reset();
                  setTimeout(() => {
                     statusMessage.remove();
                  }, 5000);
               });
            
         });
      });
   }
}