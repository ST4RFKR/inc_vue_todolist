import type { Component } from "vue";
import { BadgeQuestionMark, House } from "@lucide/vue";

type NavigationLink = {
  name: string;
  href: string;
  icon: Component;
};

export const navigationLinks: NavigationLink[] = [
  { name: "Home", href: "/", icon: House },
  { name: "FAQ", href: "/faq", icon: BadgeQuestionMark },
];
