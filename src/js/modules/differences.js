export default class Differences {
   constructor(oldOfficer, newOfficer, items) {
      this.oldOfficer = document.querySelector(oldOfficer),
      this.newOfficer = document.querySelector(newOfficer),
      this.oldItems = this.oldOfficer.querySelectorAll(items),
      this.newItems = this.newOfficer.querySelectorAll(items),
      this.oldCounter = 0,
      this.newCounter = 0;
   }

   hideItems(items) {
      items.forEach((item, i, arr) => {
         if (i<arr.length - 1) {
            item.style.display = 'none';
         }
      });
   }
   bindTriggers(container, items, counter) {
      container.querySelectorAll('.plus').forEach(btn => {
         btn.addEventListener('click', () => {
         if (counter<items.length-2) {
            items[counter].style.display = 'flex';
            counter++;
         }else{
            items[counter].style.display = 'flex';
            items[counter+1].style.display = 'none';
         }
         });
      });
   }
   init() {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
   }
}