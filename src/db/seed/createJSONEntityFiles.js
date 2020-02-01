const csv = require('csvtojson');
const fs = require('fs');

csv().fromFile('src/db/seed/playersRaw.csv').then(playersRaw => {
  // fs.writeFile("src/db/seed/players.json", JSON.stringify(players), function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("The file was saved!");
  // });

  const users = playersRaw.map(player => ({
    name: player.short_name,
    img: `https://cdn.sofifa.org/players/10/15/${player.sofifa_id}.png`,
    permissions: 'common',
    username: player.sofifa_id,
    password: player.sofifa_id,
    players: []
  }));


  const teams = [];
  playersRaw.forEach(player => {
    if (!teams.includes(player.club)) {
      teams.push(player.club);
    }
  });

  const players = playersRaw.map(p => ({ team: p.club, userId: p.sofifa_id, number: p.team_jersey_number }))

  fs.writeFile("src/db/seed/users.json", JSON.stringify(users), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The users file was saved!");
  });

  fs.writeFile("src/db/seed/teams.json", JSON.stringify(teams), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The teams file was saved!");
  });

  fs.writeFile("src/db/seed/players.json", JSON.stringify(players), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The players file was saved!");
  });


})