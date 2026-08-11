import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { EvaluationResult } from "../components/game/EvaluationResult";
import { GameTopBar } from "../components/game/GameTopBar";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useGame } from "../context/GameContext";
import { useI18n } from "../i18n/LanguageContext";

export function EvaluationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, t } = useI18n();
  const { state, currentPlayer, submitForEvaluation, continueGame } = useGame();
  const [step, setStep] = useState(0);
  const passedAnswer = (location.state as { answer?: string } | null)?.answer;
  const steps = [t("eval.s1"), t("eval.s2"), t("eval.s3"), t("eval.s4")];

  useEffect(() => {
    if (state.evaluation) return;
    const text = passedAnswer ?? state.currentAnswer;
    if (!text.trim()) return;
    void submitForEvaluation(text, locale);
  }, [
    state.evaluation,
    submitForEvaluation,
    passedAnswer,
    state.currentAnswer,
    locale,
  ]);

  useEffect(() => {
    if (state.evaluation) return;
    const id = window.setInterval(() => {
      setStep((value) => (value + 1) % steps.length);
    }, 700);
    return () => window.clearInterval(id);
  }, [state.evaluation, steps.length]);

  if (state.players.length === 0) {
    return <Navigate to="/game/setup" replace />;
  }
  if (!state.currentQuestion && !state.evaluation) {
    return <Navigate to="/game" replace />;
  }
  const answerText = (passedAnswer ?? state.currentAnswer).trim();
  if (!state.evaluation && !answerText) {
    return <Navigate to="/game/question" replace />;
  }

  function handleContinue() {
    const next = continueGame();
    navigate(next === "finished" ? "/game/result" : "/game");
  }

  const collapsed = state.towerStability <= 0 || state.structuralCollapse;

  return (
    <div className="pb-16">
      <GameTopBar
        turnNumber={state.turnNumber}
        playerName={currentPlayer?.name ?? t("game.playerFallback")}
      />
      <PageContainer className="py-8">
        {!state.evaluation ? (
          <div className="mx-auto max-w-lg py-20 text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-navy border-t-yellow" />
            <p className="mt-6 font-display text-2xl font-black uppercase tracking-tight text-navy">
              {steps[step]}
            </p>
            <p className="mt-3 text-sm text-navy/60">{t("eval.weighing")}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <EvaluationResult evaluation={state.evaluation} />
            <Button onClick={handleContinue}>
              {collapsed || state.turnNumber >= state.maxTurns
                ? t("eval.seeResult")
                : t("eval.continue")}
            </Button>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
