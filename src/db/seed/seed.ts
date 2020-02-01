import "reflect-metadata";
import { createConnection, createQueryBuilder } from "typeorm";
import { User } from "../entity/User";
import { Player } from "../entity/Player";
import { Team } from "../entity/Team";
import { Permission } from "../../core/permissions";
import { League } from "../entity/League";
import { Division } from "../entity/Division";
const fs = require('fs');


createConnection().then(async connection => {

  const userRepository = connection.getRepository(User);
  const teamRepository = connection.getRepository(Team);
  const playerRepository = connection.getRepository(Player);
  const leagueRepository = connection.getRepository(League);
  const divisionRepository = connection.getRepository(Division);

  let divisionA = new Division();
  divisionA.name = "Division A";

  let liffa = new League();
  liffa.name = "Liffa";
  liffa.contact = "El villi";
  liffa.address = "San carlo";

  liffa = await leagueRepository.save(liffa);
  divisionA.league = liffa;

  divisionA = await divisionRepository.save(divisionA);
  liffa.divisions = [divisionA];
  liffa = await leagueRepository.save(liffa);

  const users: User[] = JSON.parse(fs.readFileSync('src/db/seed/users.json', 'utf8'));
  users.forEach(async user => {
    await userRepository.save(user)
  })

  const teams: string[] = JSON.parse(fs.readFileSync('src/db/seed/teams.json', 'utf8'));

  teams.forEach(async team => {
    const t = new Team();
    t.name = team;
    t.division = divisionA;
    await teamRepository.save(t)
  })

  const players: { team: string; userId: string; number: string }[] = JSON.parse(fs.readFileSync('src/db/seed/players.json', 'utf8'));


  setTimeout(async () => {
    players.forEach(async p => {
      const player = new Player();
      player.number = parseInt(p.number)
      player.user = await userRepository.findOne({ where: { username: p.userId } });
      player.team = await teamRepository.findOne({ where: { name: p.team } });
      await playerRepository.save(player);
    });
  }, 2000)


  // const team = new Team();
  // team.name = "Trouville";
  // team.division = divisionA;
  // team.players = [];

  // await teamRepository.save(team);


  // const team2 = new Team()
  // team2.name = "La banda del chori";
  // team2.division = divisionA;
  // team2.players = [];
  // await teamRepository.save(team2);



  // const luis = new User();
  // luis.username = 'luis';
  // luis.password = 'passowrd';
  // luis.name = "Luis Gurmendez";
  // luis.permissions = Permission.league;
  // luis.players = [];

  // const luisId = (await userRepository.save(luis)).id;

  // const newLu = await userRepository.findOne(luisId);
  // newLu.delete();
  // await userRepository.save(newLu);

  // await userRepository.update(luisId, { isDeleted: true });

  // let trouville = new Team();
  // trouville.name = 'Trouvile FC';
  // trouville = await teamRepository.save(trouville);

  // const luisTrouville = new Player();
  // luisTrouville.number = 3;
  // luisTrouville.team = trouville;
  // luisTrouville.user = luis;

  // await playerRepository.save(luisTrouville);

}).catch(error => console.log(error));

