import type { User } from "./types";

export const initialUsers: User[] = [
  { id: 1, firstName: "Emily", lastName: "Johnson", age: 28, gender: "female", email: "emily.johnson@x.dummyjson.com", phone: "+81 965-431-3024", username: "emilys", company: { name: "Dooley, Kozey and Cronin", title: "Sales Manager" }, address: { city: "Phoenix", country: "United States" } },
  { id: 2, firstName: "Michael", lastName: "Williams", age: 35, gender: "male", email: "michael.williams@x.dummyjson.com", phone: "+49 258-627-6644", username: "michaelw", company: { name: "Kuhn, Cronin and Spinka", title: "Project Manager" }, address: { city: "Houston", country: "United States" } },
  { id: 3, firstName: "Sophia", lastName: "Brown", age: 42, gender: "female", email: "sophia.brown@x.dummyjson.com", phone: "+81 210-652-2785", username: "sophiab", company: { name: "Hirthe, Mueller and Wiza", title: "Operations Manager" }, address: { city: "Washington", country: "United States" } },
  { id: 4, firstName: "James", lastName: "Davis", age: 45, gender: "male", email: "james.davis@x.dummyjson.com", phone: "+49 614-958-9364", username: "jamesd", company: { name: "Rempel Inc", title: "Software Engineer" }, address: { city: "Seattle", country: "United States" } },
  { id: 5, firstName: "Emma", lastName: "Miller", age: 30, gender: "female", email: "emma.miller@x.dummyjson.com", phone: "+91 607-295-6448", username: "emmaj", company: { name: "Gutmann Inc", title: "Quality Assurance" }, address: { city: "Jacksonville", country: "United States" } }
];
