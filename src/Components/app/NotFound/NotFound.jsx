import React, { useEffect } from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet";

export default function NotFound() {
  useEffect(() => {
    const canvas = document.getElementById("particles-js");
    const ctx = canvas.getContext("2d");
    let particlesArray;

    function Particle(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    Particle.prototype.update = function () {
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
      }
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    };

    function init() {
      particlesArray = [];
      for (let i = 0; i < 100; i++) {
        let size = Math.random() * 5 + 1;
        let x =
          Math.random() * (window.innerWidth - size * 2 - size * 2 + size * 2);
        let y =
          Math.random() * (window.innerHeight - size * 2 - size * 2 + size * 2);
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = "#fcfcfc";
        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
    }

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }, []);

  return (
    <>
      <Helmet>
        <title>Page Not Found 404</title>
      </Helmet>
      <div className="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="NOT FOUND">NOT FOUND</p>
        </div>
      </div>
      <canvas id="particles-js"></canvas>
    </>
  );
}
