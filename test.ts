import "reflect-metadata";
import { createConnection, createQueryBuilder } from "typeorm";
import { User } from "./src/db/entity/User";
import { Player } from "./src/db/entity/Player";
import { Team } from "./src/db/entity/Team";
import { Permission } from "./src/core/permissions";
import { League } from "./src/db/entity/League";
import { Division } from "./src/db/entity/Division";


createConnection().then(async connection => {

  const userRepository = connection.getRepository(User);
  const teamRepository = connection.getRepository(Team);
  const playerRepository = connection.getRepository(Player);
  const leagueRepository = connection.getRepository(League);
  const divisionRepository = connection.getRepository(Division);

  // let divisionA = new Division();
  // divisionA.name = "Division A";

  // let liffa = new League();
  // liffa.name = "Liffa";
  // liffa.contact = "El villi";
  // liffa.address = "San carlo";

  // liffa = await leagueRepository.save(liffa);
  // divisionA.league = liffa;

  // divisionA = await divisionRepository.save(divisionA);
  // liffa.divisions = [divisionA];
  // liffa = await leagueRepository.save(liffa);

  const teams = await teamRepository.find({ relations: ['division', 'players', 'players.user'] });
  console.log(teams);
  // console.log(teams[0].division);
  // (teams[1].division as any).then(d => {
  //   console.log(d)
  // })

  console.log(teams[0].players)
  teams[0].players.forEach(p => {
    console.log(p.user.name)
  })


})