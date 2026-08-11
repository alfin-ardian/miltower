import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { GameProvider } from "./context/GameContext";
import { GameLayout } from "./components/layout/GameLayout";
import { MarketingLayout } from "./components/layout/MarketingLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { EvaluationPage } from "./pages/EvaluationPage";
import { GamePage } from "./pages/GamePage";
import { GameResultPage } from "./pages/GameResultPage";
import { GameSetupPage } from "./pages/GameSetupPage";
import { LandingPage } from "./pages/LandingPage";
import { MechanismPage } from "./pages/MechanismPage";
import { PhilosophyPage } from "./pages/PhilosophyPage";
import { QuestionPage } from "./pages/QuestionPage";
import { TeamPage } from "./pages/TeamPage";
import { TipsPage } from "./pages/TipsPage";

export default function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/philosophy" element={<PhilosophyPage />} />
              <Route path="/mechanism" element={<MechanismPage />} />
              <Route path="/tips" element={<TipsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/game/setup" element={<GameSetupPage />} />
            </Route>
            <Route element={<GameLayout />}>
              <Route path="/game" element={<GamePage />} />
              <Route path="/game/question" element={<QuestionPage />} />
              <Route path="/game/evaluation" element={<EvaluationPage />} />
              <Route path="/game/result" element={<GameResultPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </LanguageProvider>
  );
}
