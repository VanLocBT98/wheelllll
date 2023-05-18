import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import "./App.css";

gsap.registerPlugin(MotionPathPlugin);

function App() {
  const circlePathRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const circlePath = MotionPathPlugin.convertToPath(circlePathRef.current, false)[0];
    circlePath.id = "circlePath";
    document.querySelector("svg").prepend(circlePath);

    const items = itemsRef.current;
    const numItems = items.length;
    const itemStep = 1 / numItems;
    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);
    const wrapTracker = gsap.utils.wrap(0, numItems);
    const tracker = { item: 0 };

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => i / items.length,
      },
      scale: 0.9,
    });

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(".wrapper", {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });

    tl.to(
      items,
      {
        rotation: "-=360",
        transformOrigin: "center center",
        duration: 1,
        ease: "none",
      },
      0
    );

    tl.to(
      tracker,
      {
        item: numItems,
        duration: 1,
        ease: "none",
        modifiers: {
          item: (value) => wrapTracker(numItems - Math.round(value)),
        },
      },
      0
    );

    items.forEach(function (el, i) {
      el.addEventListener("click", function () {
        var current = tracker.item,
          activeItem = i;

        if (i === current) {
          return;
        }

        document.querySelector(".item.active").classList.remove("active");
        items[activeItem].classList.add("active");

        var diff = current - i;

        if (Math.abs(diff) < numItems / 2) {
          moveWheel(diff * itemStep);
        } else {
          var amt = numItems - Math.abs(diff);

          if (current > i) {
            moveWheel(amt * -itemStep);
          } else {
            moveWheel(amt * itemStep);
          }
        }
      });
    });

    document.getElementById("next").addEventListener("click", function () {
      var i = -1;
      var currentIndex = tracker.item;

      if (i === 0) {
        console.log(items[currentIndex]);
      } else if (i < 0) {
        console.log(
          items[(currentIndex + items.length + i) % items.length]
        );
      } else if (i > 0) {
        console.log(items[(currentIndex + i) % items.length]);
      }

      return moveWheel(-itemStep);
    });

    document.getElementById("prev").addEventListener("click", function () {
      return moveWheel(itemStep);
    });

    function moveWheel(amount) {
      let progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      let next = tracker.item;
      tl.progress(progress);

      document.querySelector(".item.active").classList.remove("active");
      items[next].classList.add("active");

      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress,
        },
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="item active" ref={(el) => (itemsRef.current[0] = el)}>
          1
        </div>
        <div className="item" ref={(el) => (itemsRef.current[1] = el)}>
          2
        </div>
        <div className="item" ref={(el) => (itemsRef.current[2] = el)}>
          3
        </div>
        <div className="item" ref={(el) => (itemsRef.current[3] = el)}>
          4
        </div>
        <div className="item" ref={(el) => (itemsRef.current[4] = el)}>
          5
        </div>
        <div className="item" ref={(el) => (itemsRef.current[5] = el)}>
          6
        </div>
        <div className="item" ref={(el) => (itemsRef.current[6] = el)}>
          7
        </div>
        <div className="item" ref={(el) => (itemsRef.current[7] = el)}>
          8
        </div>
        <svg viewBox="0 0 300 300">
          <circle
            id="holder"
            className="st0"
            cx="151"
            cy="151"
            r="150"
            ref={circlePathRef}
          />
        </svg>
      </div>
      <div className="start">&#8592; Active</div>
      <div className="container" style={{ textAlign: "center" }}>
        <button id="prev">Prev</button>
        <button id="next">Next</button>
      </div>
    </div>
  );
}

export default App;
