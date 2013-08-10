var params = [];

params["ID"] = "user1";
params["name"] = "Name";
params["top"] = "200";
params["left"] = "200";
params["life"] = "100";


HTMLGenerator.append("#test",character_ihm, params);


params["ID"] = "user2";
params["name"] = "Name2";
params["top"] = "200";
params["left"] = "200";
params["life"] = "100";

HTMLGenerator.append("#test",character_ihm, params);

params["ID"] = "user3";
params["name"] = "Name3";
params["top"] = "200";
params["left"] = "200";
params["life"] = "100";

HTMLGenerator.prepend("#test",character_ihm, params);


HTMLGenerator.html("#test",character_ihm, params);
