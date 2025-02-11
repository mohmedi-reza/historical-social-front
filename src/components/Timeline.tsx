import React, { useRef, useState, useEffect } from "react";
import { TimelineStep } from "../types/TimelineStep";
import { useNavigate } from "react-router-dom";
import Icon from "./icon/icon.component";

const Timeline: React.FC<{ steps?: TimelineStep[] }> = ({ steps = [] }) => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<TimelineStep | null>(null);
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, []);

  const handleNodeClick = (step: TimelineStep) => {
    setSelectedStep(step);
    navigate(`/?event=${step.id}`);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center px-10  w-screen sm:w-full overflow-hidden relative">
      {/* Scrollable Timeline Container */}
      <div
        ref={timelineRef}
        className="relative w-screen px-6 sm:w-full overflow-x-auto cursor-grab active:cursor-grabbing no-scrollbar"
        style={{
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          direction: "rtl",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative flex w-full items-center  h-32  min-w-screen sm:min-w-full max-w-screen-lg">
          {/* Timeline Line */}
          <div
            className="absolute top-1/2 right-0 h-[5px] bg-gradient-to-l from-gray-400 via-gray-200 to-gray-400 rounded-badge"
            style={{
              width: `${steps.length * 150}px`,
            }}
          ></div>

          {steps.length > 0 ? (
            steps.map((step, index) => {
              const nodePosition = (index / (steps.length - 1)) * 150;
              const isSelected = selectedStep?.id === step.id;

              return (
                <div
                  key={step.id}
                  className={`absolute p-2 rounded-xl flex flex-col items-center transition-all ease-in-out duration-300 hover:text-white ${
                    isSelected ? "scale-110 bg-gray-600" : "hover:scale-125"
                  }`}
                  style={{ right: `${nodePosition}%` }}
                >
                  <button
                    className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 p-2 justify-center items-center cursor-pointer rounded-full border shadow-lg transition-transform transform ${
                      isSelected
                        ? "bg-gray-100 border-gray-500 scale-125 shadow-white shadow-xl"
                        : "bg-gray-600 border-white/50 hover:border-white"
                    }`}
                    onClick={() => handleNodeClick(step)}
                    onMouseEnter={(e) => {
                      setHoveredStep(step);
                      setTooltipPos({ x: e.clientX, y: e.clientY - 40 });
                    }}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {isSelected && <Icon className="text-gray-800" name={"sun"} />}
                  </button>

                  <span
                    className={`mt-6 text-xs sm:text-sm lg:text-base font-semibold text-gray-400 ${
                      isSelected && "text-white font-extrabold"
                    }`}
                  >
                    {step.year}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 w-full py-4">
              هیچ داده‌ای موجود نیست
            </div>
          )}
        </div>
      </div>

      {hoveredStep && (
        <div
          className="fixed px-2 sm:px-3 py-2 bg-gray-800 text-white rounded-md shadow-lg text-xs sm:text-sm"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {hoveredStep.label}
        </div>
      )}
    </div>
  );
};

export default Timeline;
