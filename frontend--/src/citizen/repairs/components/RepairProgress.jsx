const progressSteps = ["Reported", "Assigned", "In progress", "Resolved"];

export default function RepairProgress({ currentStep }) {
  return (
    <div className="mt-5" aria-label={`Repair progress: ${progressSteps[currentStep]}`}>
      <div className="flex items-center">
        {progressSteps.map((step, index) => {
          const complete = index < currentStep;
          const current = index === currentStep;

          return (
            <div
              className={`flex min-w-0 flex-1 items-center ${
                index === progressSteps.length - 1 ? "flex-none" : ""
              }`}
              key={step}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] font-bold ${
                    complete
                      ? "border-[#00A68E] bg-[#00A68E] text-white"
                      : current
                        ? "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]"
                        : "border-[#D6E1EB] bg-white text-[#9AAAB9]"
                  }`}
                >
                  {complete ? "✓" : index + 1}
                </span>
              </div>

              {index < progressSteps.length - 1 && (
                <span
                  className={`mx-1 h-px min-w-2 flex-1 ${
                    index < currentStep ? "bg-[#00A68E]" : "bg-[#DCE6EF]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 grid grid-cols-4 text-center">
        {progressSteps.map((step, index) => (
          <span
            className={`text-[10px] font-medium leading-4 ${
              index <= currentStep ? "text-[#486278]" : "text-[#9AAAB9]"
            }`}
            key={step}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}