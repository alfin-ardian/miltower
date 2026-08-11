import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BlockConfirm } from "../components/game/BlockConfirm";
import { CurrentPlayer } from "../components/game/CurrentPlayer";
import { GameProgress } from "../components/game/GameProgress";
import { GameTopBar } from "../components/game/GameTopBar";
import { Tower } from "../components/game/Tower";
import { TowerStability } from "../components/game/TowerStability";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { useGame } from "../context/GameContext";
import { useI18n } from "../i18n/LanguageContext";
import type { TowerBlockData } from "../types/game";
import { wouldCauseCollapse } from "../utils/tower";

export function GamePage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const {
    state,
    currentPlayer,
    selectBlock,
    clearSelection,
    pullSelectedBlock,
    continueGame,
  } = useGame();
  const [pullingId, setPullingId] = useState<string | null>(null);

  useEffect(() => {
    if (state.gameStatus === "evaluating") {
      navigate("/game/evaluation");
    }
    if (state.gameStatus === "finished") {
      navigate("/game/result");
    }
  }, [state.gameStatus, navigate]);

  if (state.players.length === 0 || state.gameStatus === "setup") {
    return <Navigate to="/game/setup" replace />;
  }

  function handleSelect(block: TowerBlockData) {
    if (
      pullingId ||
      state.gameStatus !== "playing" ||
      state.structuralCollapse ||
      state.towerStability <= 0
    ) {
      return;
    }
    selectBlock(block.id, block.color);
  }

  function handlePull() {
    if (!state.selectedBlockId) return;
    const willCollapse = wouldCauseCollapse(
      state.towerBlocks,
      state.selectedBlockId,
    );
    setPullingId(state.selectedBlockId);
    window.setTimeout(() => {
      pullSelectedBlock();
      if (willCollapse) {
        window.setTimeout(() => navigate("/game/question"), 900);
        return;
      }
      navigate("/game/question");
    }, 520);
  }

  return (
    <div className="pb-16">
      <GameTopBar
        turnNumber={state.turnNumber}
        playerName={currentPlayer?.name ?? t("game.playerFallback")}
      />
      <PageContainer className="grid gap-6 py-8 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-5">
          <Tower
            blocks={state.towerBlocks}
            selectedId={state.selectedBlockId}
            pullingId={pullingId}
            stability={state.towerStability}
            turnNumber={state.turnNumber}
            collapsed={state.structuralCollapse}
            onSelect={handleSelect}
          />
        </div>

        <div className="space-y-4 lg:col-span-4">
          <GameProgress turnNumber={state.turnNumber} maxTurns={state.maxTurns} />
          {state.gameStatus === "question" ? (
            <section className="card-editorial p-5">
              <h1 className="font-display text-2xl font-black uppercase tracking-tight text-navy">
                {t("game.waitingTitle")}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {t("game.waitingBody")}
              </p>
              <Button className="mt-4" onClick={() => navigate("/game/question")}>
                {t("game.continueCard")}
              </Button>
            </section>
          ) : state.structuralCollapse || state.towerStability <= 0 ? (
            <section className="card-editorial p-5">
              <h1 className="font-display text-2xl font-black uppercase tracking-tight text-navy">
                {t("game.collapsedTitle")}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {t("game.collapsedBody")}
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  continueGame();
                  navigate("/game/result");
                }}
              >
                {t("eval.seeResult")}
              </Button>
            </section>
          ) : state.selectedBlockColor ? (
            <BlockConfirm
              color={state.selectedBlockColor}
              turnNumber={state.turnNumber}
              dangerous={
                !!state.selectedBlockId &&
                wouldCauseCollapse(state.towerBlocks, state.selectedBlockId)
              }
              onPull={handlePull}
              onCancel={clearSelection}
            />
          ) : (
            <section className="card-editorial p-5">
              <h1 className="font-display text-2xl font-black uppercase tracking-tight text-navy">
                {t("game.pickTitle")}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {t("game.pickBody")}
              </p>
            </section>
          )}
        </div>

        <div className="space-y-4 lg:col-span-3">
          <CurrentPlayer
            player={currentPlayer}
            turnNumber={state.turnNumber}
            maxTurns={state.maxTurns}
          />
          <TowerStability value={state.towerStability} />
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/")}
          >
            {t("game.exit")}
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}
