import { useEffect, useState, useRef} from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [ball, setBall] = useState({ frame: 0 });
  const [imageTarget, setImageTarget] = useState(3000);

  useEffect(() => {
    // define number of frames in the animation
    const frameCount = 179;
    
    // function to generate the file path for each frame
    const currentFrame = (index) => `./best-ball/${(index + 1).toString()}.jpg`;
    
    // load images from the directory and push them to the images array
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
    setImages(images);
    // call render function when the first image is loaded
    images[0].onload = render;

    gsap.to(ball, {
      frame: frameCount - 1,
      snap: "frame",
      overwrite: "true",
      scrollTrigger: {
          trigger: "#reticle",
          anticipatePin: 1,
          // markers: true,
          // pin: true,   // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: `${imageTarget}px`, // end after scrolling 500px beyond the start
          scrub: 0.5, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
    });
    

    const heroCanvas = document.querySelector(".hero-canvas");
    const heroImageLayer = document.querySelector(".hero-image-layer");

  window.onscroll = function() {
    var rect = heroImageLayer.getBoundingClientRect();
    if (rect.bottom <= window.innerHeight) {
        var scrolledPixels = (window.innerHeight - rect.top) - imageTarget;
        heroCanvas.style.top = `-${scrolledPixels}px`;
    } else if (rect.top >= 0) {
      
    } else{
      heroCanvas.style.top = `0px`;
    }
  };


  });

  function render() {
    const canvas = document.querySelector("#reticle");
    const context = canvas.getContext("2d");
    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
  }
  
  return (
    <section className="hero-section">
      <div style={{ height: `${imageTarget}px` }} className="hero-image-layer"></div>
      <canvas ref={canvasRef} id="reticle" className="hero-canvas"/>
    </section>
  );
}


