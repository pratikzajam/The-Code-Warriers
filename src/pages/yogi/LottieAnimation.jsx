import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import lottieApi from "lottie-api";

const LottieAnimation = () => {
  const lottieRef = useRef(null);
  let anim = null;
  let animAPI = null;

  useEffect(() => {
    if (!lottieRef.current) return;

    // Load the animation
    anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: "xMidYMid meet",
        imagePreserveAspectRatio: "xMidYMid meet",
      },
      path: "https://labs.nearpod.com/bodymovin/demo/mattjedrzejewski/data.json",
    });

    anim.setSubframe(false);

    anim.addEventListener("DOMLoaded", () => {
      animAPI = lottieApi.createAnimationApi(anim);
      addBodyController();
      addLegController();
      addRightLegController();
      addRightHandController();
      addLeftHandController();
    });

    return () => {
      anim?.destroy(); // Cleanup animation on unmount
    };
  }, []);

  // Helper Functions
  function addController(controller_name) {
    let position = [0, 0, 0];
    let initPositionOffset = [0, 0, 0];
    let currentPositionOffset = [0, 0, 0];
    let lastPos = [0, 0, 0];
    let rotation = 0;
    let initRotationOffset = 0;
    let currentRotationOffset = 0;
    let isCtrlDown = false;
    let transformedPosition;

    const positionController = document.getElementById(controller_name);
    if (!positionController) return;

    positionController.addEventListener("mousedown", handleMouseDown);

    function handleMouseDown(ev) {
      transformedPosition = animAPI.toContainerPoint([ev.pageX, ev.pageY]);
      initRotationOffset = transformedPosition[0];
      currentRotationOffset = 0;
      initPositionOffset[0] = transformedPosition[0];
      initPositionOffset[1] = transformedPosition[1];
      currentPositionOffset[0] = 0;
      currentPositionOffset[1] = 0;

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }

    function handleMouseMove(ev) {
      transformedPosition = animAPI.toContainerPoint([ev.pageX, ev.pageY]);
      if (ev.shiftKey) {
        currentRotationOffset = transformedPosition[0] - initRotationOffset;
      } else {
        currentPositionOffset[0] = transformedPosition[0] - initPositionOffset[0];
        currentPositionOffset[1] = transformedPosition[1] - initPositionOffset[1];
      }
    }

    function handleMouseUp() {
      reset();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      isCtrlDown = false;
    }

    function handleKeyDown(event) {
      if (event.keyCode === 16 && !isCtrlDown) {
        isCtrlDown = true;
        reset();
      }
    }

    function handleKeyUp(event) {
      if (event.keyCode === 16 && isCtrlDown) {
        isCtrlDown = false;
        reset();
      }
    }

    function reset() {
      rotation += currentRotationOffset;
      initRotationOffset = transformedPosition[0];
      currentRotationOffset = 0;

      initPositionOffset[0] = transformedPosition[0];
      initPositionOffset[1] = transformedPosition[1];
      position[0] += currentPositionOffset[0];
      position[1] += currentPositionOffset[1];
      currentPositionOffset[0] = 0;
      currentPositionOffset[1] = 0;
    }

    const positionKeyPath = animAPI.getKeyPath(`#${controller_name},Transform,Position`);
    animAPI.addValueCallback(positionKeyPath, (current) => {
      if (
        lastPos[0] !== current[0] + position[0] + currentPositionOffset[0] ||
        lastPos[1] !== position[1] + currentPositionOffset[1]
      ) {
        lastPos = [
          current[0] + position[0] + currentPositionOffset[0],
          current[1] + position[1] + currentPositionOffset[1],
          0,
        ];
      }
      return lastPos;
    });

    const rotationKeyPath = animAPI.getKeyPath(`#${controller_name},Transform,Rotation`);
    animAPI.addValueCallback(rotationKeyPath, (current) => current + rotation + currentRotationOffset);
  }

  function addRightLegController() {
    addController("C_LEG_R_3");
  }

  function addLegController() {
    addController("C_LEG_L_3");
  }

  function addLeftHandController() {
    addController("C_HAND_L_3");
  }

  function addRightHandController() {
    addController("C_HAND_R_3");
  }

  function addBodyController() {
    addController("BODY_NULL");
  }

  return <div ref={lottieRef} id="lottie" style={{ width: "100%", height: "500px" }} />;
};

export default LottieAnimation;
