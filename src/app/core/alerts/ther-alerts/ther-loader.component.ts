import { Component } from '@angular/core';

@Component({
  selector: 'app-ther-loader',
  template: `<div class="container">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
  </div>`,
  styles: `
    ::ng-deep .modal-content {
      width: 100%;
      border: none;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ring {
      position: absolute;
      height: 200px;
      width: 200px;
      border: 0px solid #272727;
      border-radius: 50%;
    }

    .ring:nth-child(1) {
      border-bottom-width: 10px;
      border-color: #ca2c92;
      animation: rotate1 1.5s linear infinite;
    }

    .ring:nth-child(2) {
      border-right-width: 10px;
      border-color: #00ffff;
      animation: rotate2 1.5s linear infinite;
    }

    .ring:nth-child(3) {
      border-top-width: 10px;
      border-color: #e0e722;
      animation: rotate3 1.5s linear infinite;
    }

    @keyframes rotate1 {
      0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }
    @keyframes rotate2 {
      0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }
    @keyframes rotate3 {
      0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
  `,
})
export class TherLoaderComponent {}
