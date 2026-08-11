import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useGame } from "../context/GameContext";
import { useI18n } from "../i18n/LanguageContext";
import type { Difficulty, Duration, GameMode } from "../types/game";
import { cn } from "../utils/cn";

const DURATIONS: Duration[] = [20, 30, 40];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export function GameSetupPage() {
  const navigate = useNavigate();
  const { setupGame } = useGame();
  const { t } = useI18n();
  const [mode, setMode] = useState<GameMode>("individual");
  const [soloName, setSoloName] = useState("");
  const [groupNames, setGroupNames] = useState(["Rania", "Bagas", "Nadia", "Fikri"]);
  const [duration, setDuration] = useState<Duration>(30);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [error, setError] = useState<string | null>(null);

  const names = mode === "individual" ? [soloName] : groupNames;

  function updateGroupName(index: number, value: string) {
    setGroupNames((current) =>
      current.map((name, i) => (i === index ? value : name)),
    );
  }

  function addPlayer() {
    if (groupNames.length >= 6) return;
    setGroupNames((current) => [...current, ""]);
  }

  function removePlayer(index: number) {
    if (groupNames.length <= 2) return;
    setGroupNames((current) => current.filter((_, i) => i !== index));
  }

  function handleStart() {
    const cleaned = names.map((n) => n.trim()).filter(Boolean);
    if (mode === "individual" && cleaned.length !== 1) {
      setError(t("setup.errName"));
      return;
    }
    if (mode === "group" && (cleaned.length < 2 || cleaned.length > 6)) {
      setError(t("setup.errGroup"));
      return;
    }
    if (cleaned.length !== names.length) {
      setError(t("setup.errSlots"));
      return;
    }
    setError(null);
    setupGame({ names: cleaned, mode, duration, difficulty });
    navigate("/game");
  }

  return (
    <section className="py-12 md:py-16">
      <PageContainer className="max-w-3xl">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-orange">
          {t("setup.eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-navy md:text-5xl">
          {t("setup.title")}
        </h1>
        <p className="mt-3 max-w-xl text-navy/70">{t("setup.body")}</p>

        <div className="mt-10 space-y-8">
          <fieldset>
            <legend className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-navy/50">
              {t("setup.mode")}
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Choice
                selected={mode === "individual"}
                onClick={() => setMode("individual")}
                label={t("setup.individual")}
              />
              <Choice
                selected={mode === "group"}
                onClick={() => setMode("group")}
                label={t("setup.group")}
              />
            </div>
          </fieldset>

          {mode === "individual" ? (
            <div>
              <label
                htmlFor="player-name"
                className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-navy/50"
              >
                {t("setup.playerName")}
              </label>
              <input
                id="player-name"
                value={soloName}
                onChange={(event) => setSoloName(event.target.value)}
                placeholder={t("setup.placeholder")}
                className="mt-3 w-full rounded-xl border-2 border-navy bg-white px-4 py-3 text-base text-navy placeholder:text-navy/35"
              />
            </div>
          ) : (
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-navy/50">
                {t("setup.players")}
              </p>
              <ul className="mt-3 space-y-3">
                {groupNames.map((name, index) => (
                  <li key={index} className="flex gap-2">
                    <label className="sr-only" htmlFor={`player-${index}`}>
                      {t("setup.playerN", { n: index + 1 })}
                    </label>
                    <input
                      id={`player-${index}`}
                      value={name}
                      onChange={(event) =>
                        updateGroupName(index, event.target.value)
                      }
                      placeholder={t("setup.playerN", { n: index + 1 })}
                      className="w-full rounded-xl border-2 border-navy bg-white px-4 py-3 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => removePlayer(index)}
                      disabled={groupNames.length <= 2}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-navy disabled:opacity-40"
                      aria-label={t("a11y.removePlayer", { n: index + 1 })}
                    >
                      <Minus size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={addPlayer}
                disabled={groupNames.length >= 6}
                className="mt-3 inline-flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-wider text-navy disabled:opacity-40"
              >
                <Plus size={16} /> {t("setup.addPlayer")}
              </button>
            </div>
          )}

          <fieldset>
            <legend className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-navy/50">
              {t("setup.duration")}
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {DURATIONS.map((item) => (
                <Choice
                  key={item}
                  selected={duration === item}
                  onClick={() => setDuration(item)}
                  label={t("setup.minutes", { n: item })}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-navy/50">
              {t("setup.difficulty")}
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {DIFFICULTIES.map((item) => (
                <Choice
                  key={item}
                  selected={difficulty === item}
                  onClick={() => setDifficulty(item)}
                  label={t(`setup.${item}`)}
                />
              ))}
            </div>
          </fieldset>

          {error ? (
            <p className="text-sm font-medium text-orange" role="alert">
              {error}
            </p>
          ) : null}

          <Button onClick={handleStart} className="w-full sm:w-auto">
            {t("setup.start")}
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}

function Choice({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border-2 border-navy px-3 py-3 font-display text-xs font-extrabold uppercase tracking-wider",
        selected ? "bg-navy text-white" : "bg-white text-navy hover:bg-cream-dark",
      )}
    >
      {label}
    </button>
  );
}
