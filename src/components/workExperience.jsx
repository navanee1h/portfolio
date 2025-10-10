import React from "react";
import { experiences } from "./data/data"; 

const WorkExperience = () => {

  const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

  return (
    <section id="experiences" className="py-12  text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center tracking-wide">
          Work Experience
        </h2>
        <div className="space-y-10">
          {sortedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl  shadow-md 
              transition-all duration-300 ease-in-out
              hover:shadow-2xl   hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <h3 className="text-2xl font-semibold">{exp.role}</h3>
                <p className="text-gray-400 text-lg">{exp.company}</p>
              </div>

              {/* Period */}
              <p className="text-gray-500 text-sm font-medium text-center mb-4">
                {exp.period}
              </p>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-center whitespace-pre-line max-w-3xl mx-auto">
                {exp.description}
              </p>

              {/* Tags */}
              {exp.tags && (
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {exp.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-700 px-3 py-1 rounded-full border border-gray-600 
                      transition-all duration-300 "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
