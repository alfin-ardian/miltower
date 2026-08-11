import type { Question } from "../types/game";
import type { Locale } from "../i18n/translations";

export const QUESTION_EN: Record<string, string> = {
  "ml-01":
    "You see a viral photo with a caption claiming the event just happened. What will you do before sharing it? Explain at least two steps and why.",
  "ml-02":
    "You see a viral video with a provocative caption. How do you decide whether the video is worth trusting?",
  "ml-03":
    "An account shares a clipped politician interview, then adds text that pretends to be the interview’s conclusion. How do you judge whether the clip is honest or misleading?",
  "ml-04":
    "A news headline sounds explosive, but you have not read the article. What is the risk of sharing the title immediately, and how can you read it more carefully?",
  "ml-05":
    "An influencer recommends a product as if it were an honest review. What signs help you tell sincere opinion from hidden promotion?",
  "ml-06":
    "A celebrity video appears to show a confession, but friends say it is a deepfake. How do you check the face, voice, and claim without spreading it first?",
  "il-01":
    "You find two articles with different information about the same event. What will you do to decide which information is more trustworthy?",
  "il-02":
    "A family chat forwards a chain message claiming an urgent health danger, with no source link. What do you do before sending it to another group?",
  "il-03":
    "An infographic shows dramatic numbers but names no method, sample, or institution. How do you judge whether the data is fit to use in an argument?",
  "il-04":
    "For a class assignment you find a Wikipedia explanation and one journal article. How do you use both responsibly instead of copying them raw?",
  "il-05":
    "Someone in a comment writes “they say it is scientifically proven” without naming a study. What questions do you ask before trusting that claim?",
  "il-06":
    "Two news sites write conflicting timelines about who started an incident. How do you build your own timeline from the available evidence, and when do you delay a conclusion?",
  "dl-01":
    "A friend asks for your account password because they want to help you log in. Should you give it? Explain why.",
  "dl-02":
    "You get a DM with a prize-draw link that expires “today only.” How do you decide if the link is safe, and what do you do if you already clicked it?",
  "dl-03":
    "You are at a cafe and need to check your balance on public Wi-Fi. What are the risks, and what is a safer way to handle money outside the home?",
  "dl-04":
    "A friend posts photos with a real-time location every day. What is the privacy impact, and how would you talk about it without lecturing?",
  "dl-05":
    "A private chat screenshot of yours is posted on someone else’s story. What digital and social steps do you take, and how do you prevent it next time?",
  "dl-06":
    "A new app asks for camera, microphone, contacts, and location even though it is only a task reminder. How do you judge those permissions before tapping “allow”?",
};

export function questionText(question: Question, locale: Locale): string {
  if (locale === "en") {
    return QUESTION_EN[question.id] ?? question.question;
  }
  return question.question;
}
