import { RoundRobin } from "./src/utils/RoundRobin"

const teams = ['fc b', 'liverpool', 'cac']
const rr = new RoundRobin<string>(teams, true);

const games = rr.getRounds();
console.log(games);