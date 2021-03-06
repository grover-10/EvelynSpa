import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {

  @Input('appHideHeader') toolbar: any;
  private toolbarHeight = 34;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { 
  }


  ngOnInit(){

    this.toolbar = this.toolbar.el;
    this.domCtrl.read(() =>{
      this.toolbarHeight = this.toolbar.clientHeight;
    });
  }

  @HostListener('ionScroll',['$event']) onContentScroll($event){
   const scroolTop = $event.detail.scrollTop;
   let newPosition = - (scroolTop / 5);

   if(newPosition < -this.toolbarHeight){
     newPosition = - this.toolbarHeight;
   }

   let newOpacity = 1 - (newPosition / -this.toolbarHeight);

   this.domCtrl.write(() =>{
     this.renderer.setStyle(this.toolbar, 'top',`${newPosition}px`);
     this.renderer.setStyle(this.toolbar, 'opacity',`${newOpacity}px`);
   });

  }

}
