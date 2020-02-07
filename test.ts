import { RoundRobin } from "./src/utils/RoundRobin"

const teams = ['fc b', 'liverpool', 'cac', 'aaa', 'bbb']
const rr = new RoundRobin<string>(teams);

const games = rr.getRounds();
console.log(games);