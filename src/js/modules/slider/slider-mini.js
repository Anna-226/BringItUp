import Slider from "./slider";

export default class MiniSlider extends Slider {
   constructor(container, prev, next) {
      super(container, prev, next);
   }

   bindTriggers() {
        
   }
   init() {
      this.container.style.cssText = `
         display: flex;
         flex-wrap: wrap;
         overflow: hidden;
         align-items: flex-start;
      `;
   }
}