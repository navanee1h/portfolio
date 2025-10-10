import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "./data/data";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const ProjectsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const ProjectCard = ({ project }) => (
    <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 min-w-full md:min-w-0">
      <div className="h-48 overflow-hidden cursor-pointer">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onClick={() => setPreviewImg(project.image)}
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium border border-gray-600 rounded-full bg-gray-700 text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-1 text-white">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-40 lg:h-40 ">
          {Array.isArray(project.description) ? (
            <ul className="list-disc pl-5 space-y-2">
              {project.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            project.description
          )}
        </p>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          <span className="text-violet-400">Projects</span>
        </h2>

        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {isMobile ? (
          // Mobile Carousel
          <div className="relative mb-12">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, key) => (
                  <div key={key} className="w-full flex-shrink-0 px-2">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-800 rounded-full p-2 shadow-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-300" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-800 rounded-full p-2 shadow-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {projects.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      currentSlide === index ? "bg-blue-400" : "bg-gray-600"
                    )}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Desktop Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, key) => (
              <ProjectCard key={key} project={project} />
            ))}
          </div>
        )}
      </div>
      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
};
