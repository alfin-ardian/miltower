import type { Locale } from "../i18n/translations";
import type { Evaluation, Question, Rubric } from "../types/game";
import { countWords } from "../utils/words";

const PRACTICE_KEYWORDS = [
  "source",
  "verify",
  "fact check",
  "context",
  "date",
  "compare",
  "comparing",
  "credible",
  "evidence",
  "privacy",
  "security",
  "don't immediately",
  "do not immediately",
  "wait",
  "sumber",
  "verifikasi",
  "cek fakta",
  "cek",
  "konteks",
  "tanggal",
  "bandingkan",
  "membandingkan",
  "kredibel",
  "kredibilitas",
  "hoaks",
  "hoax",
  "bias",
  "bukti",
  "konfirmasi",
  "metadata",
  "reverse",
  "asli",
  "privasi",
  "password",
  "kata sandi",
  "phishing",
  "tautan",
  "link",
  "izin",
  "lokasi",
  "screenshot",
  "wifi",
  "https",
  "otp",
  "tidak langsung",
  "jangan langsung",
  "menunda",
  "klarifikasi",
  "otoritas",
  "resmi",
  "deepfake",
  "edit",
  "potongan",
  "judul",
  "baca",
  "domain",
  "akun",
  "keamanan",
  "data",
  "persetujuan",
];

const CONNECTORS = [
  "karena",
  "sehingga",
  "misalnya",
  "contoh",
  "pertama",
  "kedua",
  "lalu",
  "kemudian",
  "namun",
  "tetapi",
  "jika",
  "apabila",
  "alasan",
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFKD");
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number): number {
  return Math.round(value);
}

function containsAny(haystack: string, needles: string[]): string[] {
  return needles.filter((needle) => haystack.includes(needle.toLowerCase()));
}

/**
 * Mock essay evaluator.
 * Replace the body of `evaluateEssay` with a POST /api/evaluate call later.
 */
export async function evaluateEssay(
  question: Question,
  answer: string,
  locale: Locale = "en",
): Promise<Evaluation> {
  const wait = 1500 + Math.random() * 1000;
  await delay(wait);
  return scoreEssay(question, answer, locale);
}

export function scoreEssay(
  question: Question,
  answer: string,
  locale: Locale = "en",
): Evaluation {
  const text = normalize(answer);
  const words = countWords(answer);
  const min = question.minimumWords;
  const sentences = answer
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 18);

  const topicHits = question.referenceTopics.filter((topic) =>
    text.includes(topic.toLowerCase()),
  );
  const practiceHits = containsAny(text, PRACTICE_KEYWORDS);
  const connectorHits = containsAny(text, CONNECTORS);

  const topicRatio =
    question.referenceTopics.length === 0
      ? 0.5
      : topicHits.length / question.referenceTopics.length;
  const wordRatio = clamp(words / Math.max(min, 1), 0, 1.6);
  const sentenceScore = clamp(sentences.length / 3, 0, 1);
  const connectorScore = clamp(connectorHits.length / 3, 0, 1);
  const practiceScore = clamp(practiceHits.length / 5, 0, 1);

  const relevance = round(
    clamp(8 + topicRatio * 12 + practiceScore * 5, 6, 25),
  );
  const accuracy = round(
    clamp(9 + practiceScore * 11 + topicRatio * 5, 6, 25),
  );
  const argumentation = round(
    clamp(7 + sentenceScore * 10 + connectorScore * 8, 5, 25),
  );
  const completeness = round(clamp(4 + wordRatio * 8, 3, 15));
  const clarity = round(
    clamp(4 + (words > 20 && words < 280 ? 5 : 2) + connectorScore * 2, 3, 10),
  );

  const rubric: Rubric = {
    relevance,
    accuracy,
    argumentation,
    completeness,
    clarity,
  };

  const score = clamp(
    relevance + accuracy + argumentation + completeness + clarity,
    0,
    100,
  );

  const status =
    score >= 80 ? "strong" : score >= 60 ? "adequate" : "weak";

  const strengths = buildStrengths(
    topicHits,
    practiceHits,
    sentences.length,
    locale,
  );
  const improvements = buildImprovements(
    question,
    topicHits,
    words,
    min,
    locale,
  );
  const feedback = buildFeedback(status, strengths, improvements, locale);

  return {
    score,
    status,
    rubric,
    feedback,
    strengths,
    improvements,
  };
}

function buildStrengths(
  topicHits: string[],
  practiceHits: string[],
  sentenceCount: number,
  locale: Locale,
): string[] {
  const en = locale === "en";
  const items: string[] = [];
  if (
    practiceHits.some(
      (k) =>
        k.includes("sumber") ||
        k.includes("verifikasi") ||
        k.includes("source") ||
        k.includes("verify"),
    )
  ) {
    items.push(en ? "Checking the source" : "Mengecek sumber");
  }
  if (practiceHits.some((k) => k.includes("banding") || k.includes("compar"))) {
    items.push(en ? "Comparing information" : "Membandingkan informasi");
  }
  if (
    practiceHits.some(
      (k) =>
        k.includes("tidak langsung") ||
        k.includes("jangan langsung") ||
        k.includes("menunda") ||
        k.includes("don't immediately") ||
        k.includes("do not immediately") ||
        k.includes("wait"),
    )
  ) {
    items.push(en ? "Not sharing immediately" : "Tidak langsung membagikan");
  }
  if (
    practiceHits.some(
      (k) =>
        k.includes("privasi") ||
        k.includes("password") ||
        k.includes("keamanan") ||
        k.includes("privacy") ||
        k.includes("security"),
    )
  ) {
    items.push(en ? "Considering digital security" : "Mempertimbangkan keamanan digital");
  }
  if (topicHits.length >= 2) {
    items.push(
      en ? "Covering several key angles of the prompt" : "Menyentuh beberapa sudut penting soal",
    );
  }
  if (sentenceCount >= 3) {
    items.push(
      en ? "Argument laid out in several steps" : "Argumen disusun dalam beberapa langkah",
    );
  }
  if (items.length === 0) {
    items.push(
      en ? "Tried answering in your own words" : "Sudah mencoba menjawab dengan kata-kata sendiri",
    );
  }
  return items.slice(0, 3);
}

function buildImprovements(
  question: Question,
  topicHits: string[],
  words: number,
  min: number,
  locale: Locale,
): string[] {
  const en = locale === "en";
  const missing = question.referenceTopics.filter(
    (topic) => !topicHits.includes(topic),
  );
  const items: string[] = [];
  if (missing.length > 0) {
    items.push(
      en
        ? `Add a check for ${missing.slice(0, 2).join(" and ")}.`
        : `Tambahkan pengecekan ${missing.slice(0, 2).join(" dan ")}.`,
    );
  }
  if (words < min + 10) {
    items.push(
      en
        ? "Develop the reason behind each step, not only a list of actions."
        : "Kembangkan alasan di balik setiap langkah, bukan hanya daftar tindakan.",
    );
  }
  if (items.length === 0) {
    items.push(
      en
        ? "Give a concrete situation so the argument feels more alive."
        : "Berikan contoh situasi konkret agar argumen lebih hidup.",
    );
  }
  return items.slice(0, 2);
}

function asClause(text: string, locale: Locale): string {
  const trimmed = text.replace(/\.$/, "");
  if (!trimmed) {
    return locale === "en" ? "add a concrete example" : "menambah contoh konkret";
  }
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

function buildFeedback(
  status: Evaluation["status"],
  strengths: string[],
  improvements: string[],
  locale: Locale,
): string {
  const en = locale === "en";
  const joiner = en ? " and " : " dan ";
  const strengthText = strengths.slice(0, 2).join(joiner).toLowerCase();
  const improveText =
    improvements[0] ??
    (en ? "Add evidence or an example." : "Tambahkan bukti atau contoh.");

  if (status === "strong") {
    return en
      ? `Your answer already shows the right steps. You ${strengthText}. It would be stronger if you also ${asClause(improveText, locale)}.`
      : `Jawabanmu sudah menunjukkan langkah yang tepat. Kamu sudah ${strengthText}. Akan lebih kuat jika kamu juga ${asClause(improveText, locale)}.`;
  }
  if (status === "adequate") {
    return en
      ? `Your direction is right, but it can be sharper. ${improveText} Tie every step to a clear reason.`
      : `Arah jawabanmu sudah benar, tapi masih bisa lebih tajam. ${improveText} Kaitkan setiap langkah dengan alasan yang jelas.`;
  }
  return en
    ? `This answer is still too general to use as a decision. Break it into concrete steps: what you check, why it matters, and what you should not do. ${improveText}`
    : `Jawaban ini masih terlalu umum untuk dipakai sebagai keputusan. Coba pecah menjadi langkah konkret: apa yang dicek, mengapa itu penting, dan apa yang tidak boleh dilakukan. ${improveText}`;
}
