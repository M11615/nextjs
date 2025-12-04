db = db.getSiblingDB("nextjs");

db.createUser({
  user: "nextjs",
  pwd: "m11615",
  roles: [
    { role: "readWrite", db: "nextjs" }
  ]
});
