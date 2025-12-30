
import { Season, Character, GalleryItem, Location } from './types';

export const SEASONS: Season[] = [
  {
    id: 1,
    year: "2016",
    theme: "Innocence & Mystery",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  {
    id: 2,
    year: "2017",
    theme: "Fear & Growth",
    description: "It's 1984 and the citizens of Hawkins are still reeling from the horrors of the Demogorgon. Will Byers has been rescued from the Upside Down but a bigger entity still threatens those who survived.",
    imageUrl: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  {
    id: 3,
    year: "2019",
    theme: "Friendship & Loss",
    description: "In the summer of '85, the heat is on in Hawkins. Romance blossoms and complicated friendships grow, but danger looms as an old enemy returns in a new form.",
    imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  {
    id: 4,
    year: "2022",
    theme: "Darkness & Trauma",
    description: "It's been six months since the Battle of Starcourt. Struggling with the aftermath, our group of friends are separated for the first time. A new supernatural threat surfaces.",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  {
    id: 5,
    year: "2025",
    theme: "Hope, Closure & Unity",
    description: "The final battle begins. Hawkins hangs in the balance as the Upside Down bleeds into the real world. One last stand for the town and the world.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&h=1080&auto=format&fit=crop"
  }
];

export const CHARACTERS: Character[] = [
  {
    name: "Eleven",
    quote: "Friends don't lie.",
    arc: "A girl with telekinetic powers who escaped a secret lab, becoming the heart of Hawkins' defense.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#E50914"
  },
  {
    name: "Mike Wheeler",
    quote: "If we're both going crazy, then we'll go crazy together, right?",
    arc: "The leader of the group who never lost faith in Eleven and kept the Party together through every storm.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#E50914"
  },
  {
    name: "Dustin Henderson",
    quote: "Why are you keeping this curiosity door locked?",
    arc: "The pragmatic logic-center of the group whose bond with Steve became the show's emotional anchor.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#4682B4"
  },
  {
    name: "Lucas Sinclair",
    quote: "We're talkin' about the end of the world.",
    arc: "The realist who became a warrior, proving his courage on the basketball court and in the Creel House.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#FFD700"
  },
  {
    name: "Will Byers",
    quote: "He's here.",
    arc: "The boy whose disappearance started it all, carrying the weight of the Upside Down within his very soul.",
    imageUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#006400"
  },
  {
    name: "Max Mayfield",
    quote: "Running up that hill.",
    arc: "A tough skateboarder whose internal battles and trauma became the focus of Vecna's deadly curse.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#FF4500"
  },
  {
    name: "Jim Hopper",
    quote: "Coffee and contemplation.",
    arc: "The weary Chief of Police who survived a Russian gulag to return as Hawkins' ultimate protector.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#8B4513"
  },
  {
    name: "Joyce Byers",
    quote: "I don't care if anyone believes me.",
    arc: "A mother whose intuition and refusal to give up saved her son and, ultimately, the world.",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#DAA520"
  },
  {
    name: "Steve Harrington",
    quote: "I'm stealthy, like a ninja.",
    arc: "The redemption story of the century—from high school jerk to the world's greatest babysitter.",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#4682B4"
  },
  {
    name: "Robin Buckley",
    quote: "You're gonna look at me and tell me if I'm a good person.",
    arc: "The brilliant polyglot who cracked Russian codes and found a true family in the Scoops Troop.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#7B68EE"
  },
  {
    name: "Eddie Munson",
    quote: "This is for you, Chrissy.",
    arc: "The metalhead pariah who went out in a blaze of glory, shredding for the survival of Hawkins.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&h=1200&auto=format&fit=crop",
    color: "#000000"
  },
  {
    name: "Vecna",
    quote: "Your time is almost at an end.",
    arc: "Henry Creel, One, the architect of every horror Hawkins has faced since the beginning.",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&h=1200&auto=format&fit=crop&grayscale",
    color: "#8B0000"
  },
  {
    name: "Demogorgon",
    quote: "...",
    arc: "The original nightmare. A faceless hunter that turned the woods of Hawkins into a killing ground.",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&h=1200&auto=format&fit=crop&grayscale",
    color: "#2F4F4F"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "The Vanishing", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&h=400&auto=format&fit=crop" },
  { id: 2, title: "Starcourt Mall", imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600&h=400&auto=format&fit=crop" },
  { id: 3, title: "Castle Byers", imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&h=400&auto=format&fit=crop" },
  { id: 4, title: "The Void", imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&h=400&auto=format&fit=crop" },
  { id: 5, title: "The Party", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&h=400&auto=format&fit=crop" },
  { id: 6, title: "The Hellfire Club", imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=600&h=400&auto=format&fit=crop" },
];

export const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Starcourt Mall",
    description: "The crown jewel of 1985 Hawkins—until the Battle of Starcourt turned it into a warzone.",
    significance: "Used as a cover for a secret Soviet research laboratory located deep underground.",
    imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Creel House",
    description: "A derelict mansion with a dark past, holding the keys to Henry Creel's transformation.",
    significance: "Becna's psychological and physical base of operations in Season 4.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Hawkins National Lab",
    description: "A high-security government facility conducting MKUltra experiments.",
    significance: "Where the Gate to the Upside Down was first opened in 1983.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&h=600&auto=format&fit=crop"
  }
];
