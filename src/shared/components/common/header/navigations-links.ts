import type { Component } from "vue";
import { BadgeQuestionMark, House, LogIn } from "@lucide/vue";

type NavigationLink = {
  name: string;
  href: string;
  icon: Component;
};

export const navigationLinks: NavigationLink[] = [
  { name: "Home", href: "/", icon: House },
  { name: "Login", href: "/login", icon: LogIn },
  { name: "FAQ", href: "/faq", icon: BadgeQuestionMark },
];
