export type Job = {
  title: string;
  company: string;
  website: string;
};

export type User = {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender: string;
  pronouns: string;
  bio: string;
  flipSentences: string[];
  address: string;
  phoneNumber: string; 
  email: string;      
  website: string;
  jobTitle: string;
  jobs: Job[];
  about: string;
  avatar: string;
  ogImage: string;
  namePronunciationUrl: string;
  keywords: string[];
  dateCreated: string;
};