import functions from "firebase-functions"

export let helloWorld = functions.region('southamerica-east1').https.onRequest((req, res) => {
  let world = `from ES6 in Cloud Functions!`
  res.status(200).send(`Hello ${world}`)
})