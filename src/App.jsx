import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./sections/Home";
import Overview from "./sections/Overview";
import HowEFTWorks from "./sections/HowEFTWorks";
import Benefits from "./sections/Benefits";
import Security from "./sections/Security";
import Legal from "./sections/Legal";
import Recommendations from "./sections/Recommendations";
import EFTSimulator from "./components/EFTSimulator";
import Conclusion from "./sections/Conclusion";

const SECTION_IDS = ["home","overview","how-it-works","benefits","security","legal","recommendations","simulator","conclusion"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [simulatorScenario, setSimulatorScenario] = useState(null);

  useEffect(() => {
    const observers = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const goToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSimulatorWithScenario = (scenarioId) => {
    setSimulatorScenario(scenarioId);
    setTimeout(() => {
      document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar activeSection={activeSection} />
      <main className="flex-1 lg:ml-64">
        <Home onGoToSimulator={goToSimulator} />
        <div className="border-t border-slate-800 mx-8" />
        <Overview />
        <div className="border-t border-slate-800 mx-8" />
        <HowEFTWorks onGoToSimulator={goToSimulator} />
        <div className="border-t border-slate-800 mx-8" />
        <Benefits />
        <div className="border-t border-slate-800 mx-8" />
        <Security onGoToSimulatorWithScenario={goToSimulatorWithScenario} />
        <div className="border-t border-slate-800 mx-8" />
        <Legal />
        <div className="border-t border-slate-800 mx-8" />
        <Recommendations onGoToSimulator={goToSimulator} />
        <div className="border-t border-slate-800 mx-8" />
        <EFTSimulator key={simulatorScenario} initialScenarioId={simulatorScenario} />
        <div className="border-t border-slate-800 mx-8" />
        <Conclusion onGoToSimulator={goToSimulator} />
      </main>
    </div>
  );
}
