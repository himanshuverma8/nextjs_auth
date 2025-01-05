import React from "react";

const Spinner: React.FC = () => {
  return (
    <>
      <style>
        {`
        .container{
             position: absolute;
             display: flex;
             justify-content: center;
             align-items: center;
        }
          .spinner {
            position: relative;
            width: 10px; /* Adjust spinner size */
            height: 10px;
          }

          .spinner div {
            position: absolute;
            width: 50%;
            height: 150%;
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
            animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
          }

          .spinner div:nth-child(1) {
            --delay: 0.1;
            --rotation: 36;
            --translation: 150;
          }

          .spinner div:nth-child(2) {
            --delay: 0.2;
            --rotation: 72;
            --translation: 150;
          }

          .spinner div:nth-child(3) {
            --delay: 0.3;
            --rotation: 108;
            --translation: 150;
          }

          .spinner div:nth-child(4) {
            --delay: 0.4;
            --rotation: 144;
            --translation: 150;
          }

          .spinner div:nth-child(5) {
            --delay: 0.5;
            --rotation: 180;
            --translation: 150;
          }

          .spinner div:nth-child(6) {
            --delay: 0.6;
            --rotation: 216;
            --translation: 150;
          }

          .spinner div:nth-child(7) {
            --delay: 0.7;
            --rotation: 252;
            --translation: 150;
          }

          .spinner div:nth-child(8) {
            --delay: 0.8;
            --rotation: 288;
            --translation: 150;
          }

          .spinner div:nth-child(9) {
            --delay: 0.9;
            --rotation: 324;
            --translation: 150;
          }

          .spinner div:nth-child(10) {
            --delay: 1;
            --rotation: 360;
            --translation: 150;
          }

          @keyframes spinner-fzua35 {
            0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
            }

            50% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
            }
          }
        `}
      </style>
     <div className="container">
     <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
     </div>
    </>
  );
};

export default Spinner;
