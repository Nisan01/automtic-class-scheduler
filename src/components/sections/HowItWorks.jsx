"use client";

import { CircleCheck, Cog, Rocket } from "lucide-react";
import { forwardRef } from "react";

const HowItWorks = forwardRef(function HowItWorks(props, ref) {
  const steps = [
    {
      title: "Enter Required Details",
      description:
        "Admin inputs semesters, subjects, teachers, availability, breaks, and period timings into the system.",
      icon: <Cog className="w-8 h-8 text-white" />,
    },
    {
      title: "Automatic Schedule Generation",
      description:
        "The core algorithm generates optimized schedules, considering teacher constraints, subject priority, and balanced workload.",
      icon: <Rocket className="w-8 h-8 text-white" />,
    },
    {
      title: "Review & Publish",
      description:
        "Admin reviews and finalizes the generated schedule. Once published, students and faculty can immediately view the live timetable.",
      icon: <CircleCheck className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section ref={ref} className="py-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title and Subheading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 mb-16">
          A simple three-step process to generate and deploy your institutional timetable.
        </p>

        {/* Steps Container */}
        <div className="relative grid md:grid-cols-3 gap-10">
          {/* Connection Line (Desktop/Tablet Only) */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1/2 -z-0">
            <div className="relative h-full">
              <div className="absolute top-0 left-1/3 right-1/3 h-full border-b-2 border-dashed border-gray-300 transform translate-x-1/2"></div>
              <div className="absolute top-0 left-2/3 right-1/3 h-full border-b-2 border-dashed border-gray-300"></div>
            </div>
          </div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center bg-white rounded-xl p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-6 ring-4 ring-indigo-200 shadow-lg">
                {step.icon}
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full text-white text-sm font-bold shadow-md">
                {idx + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HowItWorks;
