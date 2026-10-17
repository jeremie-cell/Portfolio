
import { useCallback, useState } from "react";

import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import Navbar from "./components/NavBar.jsx";
import LogoSection from "./sections/LogoSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import PageLoader from "./components/PageLoader.jsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <PageLoader onComplete={handleLoaderComplete} />
      )}

      <div
        className={`portfolio-content ${
          isLoading ? "portfolio-hidden" : "portfolio-visible"
        }`}
        aria-hidden={isLoading}
      >
        <Navbar />
        <Hero />
        <ShowcaseSection />
        <LogoSection />
        <FeatureCards />
        <ExperienceSection />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
