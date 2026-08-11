import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { EssayInput } from "../components/game/EssayInput";
import { GameTopBar } from "../components/game/GameTopBar";
import { QuestionCard } from "../components/game/QuestionCard";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useGame } from "../context/GameContext";
import { useI18n } from "../i18n/LanguageContext";
import { questionTimerSeconds } from "../utils/scoring";
import { formatTime, MAX_ANSWER_WORDS, validateAnswer } from "../utils/words";
import { cn } from "../utils/cn";

export function QuestionPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { state, currentPlayer, setAnswer } = useGame();
  const [draft, setDraft] = useState(state.currentAnswer);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(() =>
    questionTimerSeconds(state.difficulty),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (state.players.length === 0) {
    return <Navigate to="/game/setup" replace />;
  }
  if (!state.currentQuestion) {
    return <Navigate to="/game" replace />;
  }

  const question = state.currentQuestion;

  function handleSubmit() {
    const code = validateAnswer(draft);
    if (code === "empty") {
      setError(t("question.empty"));
      return;
    }
    if (code === "tooLong") {
      setError(t("question.tooLong", { n: MAX_ANSWER_WORDS }));
      return;
    }
    setError(null);
    setAnswer(draft);
    navigate("/game/evaluation", { state: { answer: draft } });
  }

  return (
    <div className="pb-16">
      <GameTopBar
        turnNumber={state.turnNumber}
        playerName={currentPlayer?.name ?? t("game.playerFallback")}
      />
      <PageContainer className="max-w-3xl space-y-6 py-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-navy/60">{t("question.calm")}</p>
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-full border-2 border-navy px-3 py-1 font-display text-sm font-extrabold",
              seconds <= 20 ? "bg-orange text-white" : "bg-white text-navy",
            )}
            aria-live="polite"
            aria-label={t("a11y.timeLeft", { time: formatTime(seconds) })}
          >
            <Clock size={16} />
            {formatTime(seconds)}
          </p>
        </div>

        {seconds === 0 ? (
          <p className="rounded-xl border-2 border-yellow bg-yellow/40 px-4 py-3 text-sm text-navy">
            {t("question.timeUp")}
          </p>
        ) : null}

        <QuestionCard question={question} />
        <EssayInput value={draft} onChange={setDraft} />

        {error ? (
          <p className="text-sm font-medium text-orange" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => navigate("/game")}>
            {t("question.back")}
          </Button>
          <Button onClick={handleSubmit}>{t("question.submit")}</Button>
        </div>
      </PageContainer>
    </div>
  );
}
