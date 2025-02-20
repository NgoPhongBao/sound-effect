"use client";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function RivePage() {
  const { rive, RiveComponent } = useRive({
    src: "/riv/boy.riv",
    stateMachines: "jump",
    autoplay: true,
  });
  const jumpInput = useStateMachineInput(rive, "jump", "jump");

  return (
    <>
      <RiveComponent className="h-[500px]" />
      <button onClick={() => jumpInput && jumpInput.fire()}>Jump</button>
    </>
  );
}
