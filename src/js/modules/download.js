export default class Download {
   constructor(trigger) {
      this.btns = document.querySelectorAll(trigger);
      this.path = 'assets/img/mainbg.jpg';
   }

   download(path) {
      const link = document.createElement('a');
      link.setAttribute('href', path);
      link.setAttribute('download', 'nice_picture');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }

   init() {
      this.btns.forEach(btn => {
         btn.addEventListener('click', () => {
            this.download(this.path);
         });
      });
   }
}