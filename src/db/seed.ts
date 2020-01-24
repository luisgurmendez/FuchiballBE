import "reflect-metadata";
import { createConnection, createQueryBuilder } from "typeorm";
import { User } from "./entity/User";
import { Player } from "./entity/Player";
import { Team } from "./entity/Team";
import { Permission } from "../core/permissions";

createConnection().then(async connection => {

  const userRepository = connection.getRepository(User);
  const teamRepository = connection.getRepository(Team);
  const playerRepository = connection.getRepository(Player);

  const luis = new User();
  luis.username = 'luis';
  luis.password = 'passowrd';
  luis.name = "Luis Gurmendez";
  luis.permissions = Permission.league;
  luis.players = [];

  const luisId = (await userRepository.save(luis)).id;

  const newLu = await userRepository.findOne(luisId);
  newLu.delete();
  await userRepository.save(newLu);

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

