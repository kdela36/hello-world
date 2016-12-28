var controller = angular.module('ApiLolController', []);

controller.controller('ApiLolController', ['$http', '$scope', function ($http, $scope) {

    var apikey = "api_key=efab8ac7-f936-44f3-a4c5-577229d80da1";



    $scope.buscarMatchHistory = function () {
        $scope.cargando = true;
        getSummonerByName = "https://las.api.pvp.net/api/lol/las/v1.4/summoner/by-name/";
        getMatchHistory = "https://las.api.pvp.net/api/lol/las/v1.3/game/by-summoner/";
        getChampionById = "https://global.api.pvp.net/api/lol/static-data/las/v1.2/champion/";

        summonerName = $scope.summonerName;
        $scope.summonerData = [];
        matches = [];

        var URLSummonerByName = getSummonerByName + summonerName + "?" + apikey;
        console.log(URLSummonerByName);
        $http.get(URLSummonerByName).success(function (data) {

            for (i in data) {
                var userData = data[i];
                userID = userData.id;
                //console.log(userID);
            }

            var URLMatchHistory = getMatchHistory + userID + "/recent?" + apikey;
            console.log(URLMatchHistory);
            $http.get(URLMatchHistory).success(function (data) {

                for (i in data) {
                    matches = data[i];

                }
                //console.log(data);
                console.log(matches);

                for (i in matches) {

                    console.log(matches[i].createDate);
                    var date = new Date(matches[i].createDate);
                    console.log(date);
                    //matches[i].formatedDate = date;

                    console.log('Dia: ' + date.getDay());
                    console.log('Mes: ' + date.getMonth());
                    console.log('Año: ' + date.getYear());

                    console.log(matches[i].formatedDate);
                }

                for (i in matches) {
                    matches[i].campeon = buscarChampPorID(matches[i].championId);

                }
                for (i in matches) {
                    // console.log(matches[i].campeon);
                    var nombrecampeon = matches[i].campeon;
                    //console.log(nombrecampeon);
                    matches[i].fotoCampeon = buscarImagen(nombrecampeon);


                }
                for (i in matches) {

                    //Mira como estan estas validaciones papa
                    if (matches[i].stats.win) {
                        matches[i].colorDiv = "GameWon";
                    } else {
                        matches[i].colorDiv = "GameLost";
                    }
                    if (typeof matches[i].stats.championsKilled === 'undefined') {
                        matches[i].stats.championsKilled = 0;
                    }
                    if (typeof matches[i].stats.numDeaths === 'undefined') {
                        matches[i].stats.numDeaths = 0;
                    }
                    if (typeof matches[i].stats.assists === 'undefined') {
                        matches[i].stats.assists = 0;
                    }
                    if (matches[i].subType == 'NORMAL') {
                        matches[i].subType = 'Normal';
                    }
                    if (matches[i].subType == 'BOT') {
                        matches[i].subType = 'Co-op';
                    }
                    if (matches[i].subType == 'RANKED_SOLO_5x5') {
                        matches[i].subType = 'Ranked Solo';
                    }
                    if (matches[i].subType == 'RANKED_PREMADE_3x3') {
                        matches[i].subType = 'Team 3 VS 3';
                    }
                    if (matches[i].subType == 'ARAM_UNRANKED_5x5') {
                        matches[i].subType = 'Aram';
                    }
                    if (matches[i].subType == 'CAP_5x5') {
                        matches[i].subType = 'Team Builder';
                    }
                    if (matches[i].subType == 'BILGEWATER') {
                        matches[i].subType = 'Bilgewater';
                    }
                    if (matches[i].subType == 'RANKED_TEAM_5x5') {
                        matches[i].subType = 'Team 5 VS 5';
                    }
                    if (matches[i].subType == 'ODIN_UNRANKED') {
                        matches[i].subType = 'Dominion';
                    }
                    if (matches[i].subType == 'RANKED_FLEX_SR') {
                        matches[i].subType = 'Ranked Flex';
                    }
                    if (matches[i].subType == 'KING_PORO') {
                        matches[i].subType = 'Legend of the poro king';
                    }
                    

                }
                for (i in matches) {
                    /* console.log("entro a buscar los summoners");
                     console.log(buscarIconoSS(matches[i].spell1));
                     console.log(buscarIconoSS(matches[i].spell2));*/
                    matches[i].fotoSpell1 = buscarIconoSS(matches[i].spell1);
                    matches[i].fotoSpell2 = buscarIconoSS(matches[i].spell2);
                    matches[i].fotoitem0 = buscarIconoItem(matches[i].stats.item0);
                    matches[i].fotoitem1 = buscarIconoItem(matches[i].stats.item1);
                    matches[i].fotoitem2 = buscarIconoItem(matches[i].stats.item2);
                    matches[i].fotoitem3 = buscarIconoItem(matches[i].stats.item3);
                    matches[i].fotoitem4 = buscarIconoItem(matches[i].stats.item4);
                    matches[i].fotoitem5 = buscarIconoItem(matches[i].stats.item5);
                    matches[i].fotoitem6 = buscarIconoItem(matches[i].stats.item6);

                }
                $scope.summonerData = matches;
                // console.log($scope.summonerData);

            })
            $scope.cargando = false;
        })

    }

    $scope.buscarRankedStats = function () {
        $scope.cargando = true;

        getSummonerByName = "https://las.api.pvp.net/api/lol/las/v1.4/summoner/by-name/";
        getRankedStats = "https://las.api.pvp.net/api/lol/las/v1.3/stats/by-summoner/";
        season = "/ranked?season=SEASON2014";
        season = $scope.season;
        nombreSummoner = $scope.summonerName;
        console.log(nombreSummoner);

        var URLSummonerByName = getSummonerByName + nombreSummoner + "?" + apikey;
        console.log(URLSummonerByName);
        $http({
            method: 'GET',
            url: URLSummonerByName
        }).success(function (data) {
            console.log(data);
            for (i in data) {
                summonerId = data[i].id;
            }
            console.log(summonerId);
            var URLRankedStats = getRankedStats + summonerId + "/ranked?season=" + season + "&" + apikey;
            console.log(URLRankedStats);
            $http.get(URLRankedStats).success(function (data) {
                for (i in data) {
                    var stats = data[i];

                    console.log("los stats que devuelve son:");
                    console.log(stats);
                }
                for (i in stats) {
                    stats[i].nombreCampeon = buscarChampPorID(stats[i].id);
                }
                for (i in stats) {
                    if (stats[i].id == 0) {
                        stats.splice(i, 1);
                        console.log("encontro un id = 0 en la posicion " + i);
                    }
                }
                for (i in stats) {
                    console.log(100 / stats[i].stats.totalSessionsPlayed);

                    stats[i].promedioKills = (stats[i].stats.totalChampionKills / stats[i].stats.totalSessionsPlayed).toFixed(1);
                    stats[i].promedioMuertes = (stats[i].stats.totalDeathsPerSession / stats[i].stats.totalSessionsPlayed).toFixed(1);
                    stats[i].promedioAsistencas = (stats[i].stats.totalAssists / stats[i].stats.totalSessionsPlayed).toFixed(1);
                    stats[i].promedioFarm = (stats[i].stats.totalMinionKills / stats[i].stats.totalSessionsPlayed).toFixed(1);

                    stats[i].winRate = ((100 / stats[i].stats.totalSessionsPlayed) * stats[i].stats.totalSessionsWon).toFixed(1);
                    stats[i].fotoCampeon = buscarImagen(stats[i].nombreCampeon);
                }
                $scope.rankedStats = stats;
                console.log(stats);

                $scope.mostrarcabecera = true;
                $scope.cargando = false;

            })

        })

    }

    $scope.buscardatosSummoner = function () {

        getSummonerByName = "https://las.api.pvp.net/api/lol/las/v1.4/summoner/by-name/";
        getRankedStats = "https://las.api.pvp.net/api/lol/las/v1.3/stats/by-summoner/";
        season = "/ranked?season=SEASON2015";
        nombreSummoner = $scope.summonerName;
        console.log(nombreSummoner);

        $scope.datosSummoner;
        var URLSummonerByName = getSummonerByName + nombreSummoner + "?" + apikey;
        console.log(URLSummonerByName);
        $http.get(URLSummonerByName).success(function (data) {
            for (i in data) {
                summonerId = data[i].id;
            }
            var URLRankedStats = getRankedStats + summonerId + season + "&" + apikey;
            console.log(URLRankedStats);
            $http.get(URLRankedStats).success(function (data) {
                for (i in data) {
                    var stats = data[i];

                }
                for (i in stats) {
                    if (stats[i].id == 0) {

                        console.log(stats[i]);
                        $scope.datosSummoner = stats[i];


                    }
                }

            })

        })
    }

    $scope.buscarLigas = function () {

        getSummonerByName = "https://las.api.pvp.net/api/lol/las/v1.4/summoner/by-name/";
        getLeague = "https://las.api.pvp.net/api/lol/las/v2.5/league/by-summoner/";
        summonerName = $scope.summonerName;
        $scope.summonerLeagueData = [];

        var URLSummonerByName = getSummonerByName + summonerName + "?" + apikey;
        console.log(URLSummonerByName);

        $http.get(URLSummonerByName).success(function (data) {
            for (i in data) {
                var userData = data[i];
                userID = userData.id;
                console.log(userID);
            }
            var URLLigas = getLeague + userID + "/entry?" + apikey;
            $http.get(URLLigas).success(function (data) {

                for (i in data) {
                    // data[i].imagenLiga = "img/" + data[i].tier +"/" + data[i].tier + "_" + data[i].entries[0].division + ".png";
                    $scope.summonerLeagueData = data[i];
                }
                for (i in $scope.summonerLeagueData) {
                    $scope.summonerLeagueData[i].imagen = "img/" + $scope.summonerLeagueData[i].tier.toLowerCase() + "/" + $scope.summonerLeagueData[i].tier.toLowerCase() + "_" + $scope.summonerLeagueData[i].entries[0].division + ".png";
                }
                console.log($scope.summonerLeagueData);
            })

        })
    }

    $scope.buscarChampionMasteries = function () {
        $scope.cargando = true;

        getSummonerByName = "https://las.api.pvp.net/api/lol/las/v1.4/summoner/by-name/";
        getMasteries = "https://las.api.pvp.net/championmastery/location/LA2/player/";
        getChampionById = "https://global.api.pvp.net/api/lol/static-data/las/v1.2/champion/";


        summonerName = $scope.summonerName;
        var URLSummonerByName = getSummonerByName + summonerName + "?" + apikey;
        $http({
            method: 'GET',
            url: URLSummonerByName
        }).success(function (data) {
            console.log(data);
            for (i in data) {
                var userData = data[i];
                userID = userData.id;
                console.log(userID);

            }
            var URLGetMasteries = getMasteries + userID + "/champions?" + apikey;
            console.log(URLGetMasteries);

            $http({
                method: 'GET',
                url: URLGetMasteries,
                crossDomain: true

            }).success(function (data) {

                for (i in data) {
                    data[i].nombreCampeon = buscarChampPorID(data[i].championId);
                }
                for (i in data) {

                    switch (data[i].championLevel) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            data[i].colorDiv = "amarillo";
                            break;
                        case 5:
                            data[i].colorDiv = "rojo";
                            break;
                        case 6:
                            data[i].colorDiv = "violeta";
                            break;
                        case 7:
                            data[i].colorDiv = "celeste";
                            break;
                    }
                }
                for (i in data) {
                    data[i].fotoCampeon = buscarImagen(data[i].nombreCampeon);
                    
                }
                for (i in data) {
                    if (data[i].chestGranted) {
                        data[i].tieneCofre = "Si";
                        data[i].marco = "tieneCofre";
                    } else {
                        data[i].tieneCofre = "No";
                        data[i].marco = "notieneCofre";
                    }
                }
                for(i in data){
                    data[i].formatedChampionPoints = formatchampionPoints(data[i].championPoints);
                    
                }
                $scope.MasteriesData = data;
            })
            $scope.cargando = false;
        })
    }

    var formatchampionPoints = function (champPoints){
        var formatedPoints;
        if(champPoints >= 1000000){
            formatedPoints = (champPoints/1000000).toFixed(1) + " M";
        }else if(champPoints >= 10000){
            formatedPoints = (champPoints/1000).toFixed(1) + " K";    
            
        }else{
            formatedPoints = champPoints;
        }
        
        //console.log("Entraron; " + champPoints + " puntos, y formateados quedan como: "+ formatedPoints);
        return formatedPoints;
    }
    var buscarChampPorID = function (id) {

        for (i in champions) {
            if (id == champions[i].champion_id) {
                return champions[i].name;
            }
        }
    }

    var buscarImagen = function (nombrecampeon) {


        for (i in champions) {
            if (champions[i].name == nombrecampeon) {
                var URLImagenChamp = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/" + champions[i].file + ".png";
            }
        }
        //console.log(typeof URLImagenChamp);
        return URLImagenChamp;
    }

    var buscarIconoSS = function (id) {

        for (j in summonerSpells) {
            if (id == summonerSpells[j].id) {
                return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/" + summonerSpells[j].key + ".png";
            }
        }
    }

    var buscarIconoItem = function (id) {

        if (typeof id === 'undefined') {
            return "img/nada.png";
        }
        if (id == 3128 || id == 3257 || id == 3123)
            id = 2047;
        //console.log("entro a buscar el icono con el id:" + id);
        //console.log("http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + id + ".png");
        return "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/" + id + ".png";

    }
}]);



var champions = {
    "aatrox": {
        "name": "Aatrox",
        "file": "Aatrox",
        "champion_id": 266,
        "internal_name": "aatrox"
    },
    "ahri": {
        "name": "Ahri",
        "file": "Ahri",
        "champion_id": 103,
        "internal_name": "ahri"
    },
    "akali": {
        "name": "Akali",
        "file": "Akali",
        "champion_id": 84,
        "internal_name": "akali"
    },
    "alistar": {
        "name": "Alistar",
        "file": "Alistar",
        "champion_id": 12,
        "internal_name": "alistar"
    },
    "amumu": {
        "name": "Amumu",
        "file": "Amumu",
        "champion_id": 32,
        "internal_name": "amumu"
    },
    "anivia": {
        "name": "Anivia",
        "file": "Anivia",
        "champion_id": 34,
        "internal_name": "anivia"
    },
    "annie": {
        "name": "Annie",
        "file": "Annie",
        "champion_id": 1,
        "internal_name": "annie"
    },
    "ashe": {
        "name": "Ashe",
        "file": "Ashe",
        "champion_id": 22,
        "internal_name": "ashe"
    },
    "aurelionsol": {
        "name": "Aurelion Sol",
        "file": "AurelionSol",
        "champion_id": 136,
        "internal_name": "aurelionsol"
    },
    "azir": {
        "name": "Azir",
        "file": "Azir",
        "champion_id": 268,
        "internal_name": "azir"
    },
    "bard": {
        "name": "Bard",
        "file": "Bard",
        "champion_id": 432,
        "internal_name": "bard"
    },
    "blitzcrank": {
        "name": "Blitzcrank",
        "file": "Blitzcrank",
        "champion_id": 53,
        "internal_name": "blitzcrank"
    },
    "brand": {
        "name": "Brand",
        "file": "Brand",
        "champion_id": 63,
        "internal_name": "brand"
    },
    "braum": {
        "name": "Braum",
        "file": "Braum",
        "champion_id": 201,
        "internal_name": "braum"
    },
    "caitlyn": {
        "name": "Caitlyn",
        "file": "Caitlyn",
        "champion_id": 51,
        "internal_name": "caitlyn"
    },
    "cassiopeia": {
        "name": "Cassiopeia",
        "file": "Cassiopeia",
        "champion_id": 69,
        "internal_name": "cassiopeia"
    },
    "chogath": {
        "name": "Cho'Gath",
        "file": "Chogath",
        "champion_id": 31,
        "internal_name": "chogath"
    },
    "corki": {
        "name": "Corki",
        "file": "Corki",
        "champion_id": 42,
        "internal_name": "corki"
    },
    "darius": {
        "name": "Darius",
        "file": "Darius",
        "champion_id": 122,
        "internal_name": "darius"
    },
    "diana": {
        "name": "Diana",
        "file": "Diana",
        "champion_id": 131,
        "internal_name": "diana"
    },
    "drmundo": {
        "name": "Dr. Mundo",
        "file": "DrMundo",
        "champion_id": 36,
        "internal_name": "drmundo"
    },
    "draven": {
        "name": "Draven",
        "file": "Draven",
        "champion_id": 119,
        "internal_name": "draven"
    },
    "ekko": {
        "name": "Ekko",
        "file": "Ekko",
        "champion_id": 245,
        "internal_name": "ekko"
    },
    "elise": {
        "name": "Elise",
        "file": "Elise",
        "champion_id": 60,
        "internal_name": "elise"
    },
    "evelynn": {
        "name": "Evelynn",
        "file": "Evelynn",
        "champion_id": 28,
        "internal_name": "evelynn"
    },
    "ezreal": {
        "name": "Ezreal",
        "file": "Ezreal",
        "champion_id": 81,
        "internal_name": "ezreal"
    },
    "fiddlesticks": {
        "name": "Fiddlesticks",
        "file": "FiddleSticks",
        "champion_id": 9,
        "internal_name": "fiddlesticks"
    },
    "fiora": {
        "name": "Fiora",
        "file": "Fiora",
        "champion_id": 114,
        "internal_name": "fiora"
    },
    "fizz": {
        "name": "Fizz",
        "file": "Fizz",
        "champion_id": 105,
        "internal_name": "fizz"
    },
    "galio": {
        "name": "Galio",
        "file": "Galio",
        "champion_id": 3,
        "internal_name": "galio"
    },
    "gangplank": {
        "name": "Gangplank",
        "file": "Gangplank",
        "champion_id": 41,
        "internal_name": "gangplank"
    },
    "garen": {
        "name": "Garen",
        "file": "Garen",
        "champion_id": 86,
        "internal_name": "garen"
    },
    "gnar": {
        "name": "Gnar",
        "file": "Gnar",
        "champion_id": 150,
        "internal_name": "gnar"
    },
    "gragas": {
        "name": "Gragas",
        "file": "Gragas",
        "champion_id": 79,
        "internal_name": "gragas"
    },
    "graves": {
        "name": "Graves",
        "file": "Graves",
        "champion_id": 104,
        "internal_name": "graves"
    },
    "hecarim": {
        "name": "Hecarim",
        "file": "Hecarim",
        "champion_id": 120,
        "internal_name": "hecarim"
    },
    "heimerdinger": {
        "name": "Heimerdinger",
        "file": "Heimerdinger",
        "champion_id": 74,
        "internal_name": "heimerdinger"
    },
    "illaoi": {
        "name": "Illaoi",
        "file": "Illaoi",
        "champion_id": 420,
        "internal_name": "illaoi"
    },
    "irelia": {
        "name": "Irelia",
        "file": "Irelia",
        "champion_id": 39,
        "internal_name": "irelia"
    },
    "janna": {
        "name": "Janna",
        "file": "Janna",
        "champion_id": 40,
        "internal_name": "janna"
    },
    "jarvaniv": {
        "name": "Jarvan IV",
        "file": "JarvanIV",
        "champion_id": 59,
        "internal_name": "jarvaniv"
    },
    "jax": {
        "name": "Jax",
        "file": "Jax",
        "champion_id": 24,
        "internal_name": "jax"
    },
    "jayce": {
        "name": "Jayce",
        "file": "Jayce",
        "champion_id": 126,
        "internal_name": "jayce"
    },
    "jhin": {
        "name": "Jhin",
        "file": "Jhin",
        "champion_id": 202,
        "internal_name": "jhin"
    },
    "jinx": {
        "name": "Jinx",
        "file": "Jinx",
        "champion_id": 222,
        "internal_name": "jinx"
    },
    "kalista": {
        "name": "Kalista",
        "file": "Kalista",
        "champion_id": 429,
        "internal_name": "kalista"
    },
    "karma": {
        "name": "Karma",
        "file": "Karma",
        "champion_id": 43,
        "internal_name": "karma"
    },
    "karthus": {
        "name": "Karthus",
        "file": "Karthus",
        "champion_id": 30,
        "internal_name": "karthus"
    },
    "kassadin": {
        "name": "Kassadin",
        "file": "Kassadin",
        "champion_id": 38,
        "internal_name": "kassadin"
    },
    "katarina": {
        "name": "Katarina",
        "file": "Katarina",
        "champion_id": 55,
        "internal_name": "katarina"
    },
    "kayle": {
        "name": "Kayle",
        "file": "Kayle",
        "champion_id": 10,
        "internal_name": "kayle"
    },
    "kennen": {
        "name": "Kennen",
        "file": "Kennen",
        "champion_id": 85,
        "internal_name": "kennen"
    },
    "khazix": {
        "name": "Khazix",
        "file": "Khazix",
        "champion_id": 121,
        "internal_name": "khazix"
    },
    "kindred": {
        "name": "Kindred",
        "file": "Kindred",
        "champion_id": 203,
        "internal_name": "kindred"
    },
    "kogmaw": {
        "name": "Kog'Maw",
        "file": "KogMaw",
        "champion_id": 96,
        "internal_name": "kogmaw"
    },
    "leblanc": {
        "name": "Leblanc",
        "file": "Leblanc",
        "champion_id": 7,
        "internal_name": "leblanc"
    },
    "leesin": {
        "name": "Lee Sin",
        "file": "LeeSin",
        "champion_id": 64,
        "internal_name": "leesin"
    },
    "leona": {
        "name": "Leona",
        "file": "Leona",
        "champion_id": 89,
        "internal_name": "leona"
    },
    "lissandra": {
        "name": "Lissandra",
        "file": "Lissandra",
        "champion_id": 127,
        "internal_name": "lissandra"
    },
    "lucian": {
        "name": "Lucian",
        "file": "Lucian",
        "champion_id": 236,
        "internal_name": "lucian"
    },
    "lulu": {
        "name": "Lulu",
        "file": "Lulu",
        "champion_id": 117,
        "internal_name": "lulu"
    },
    "lux": {
        "name": "Lux",
        "file": "Lux",
        "champion_id": 99,
        "internal_name": "lux"
    },
    "malphite": {
        "name": "Malphite",
        "file": "Malphite",
        "champion_id": 54,
        "internal_name": "malphite"
    },
    "malzahar": {
        "name": "Malzahar",
        "file": "Malzahar",
        "champion_id": 90,
        "internal_name": "malzahar"
    },
    "maokai": {
        "name": "Maokai",
        "file": "Maokai",
        "champion_id": 57,
        "internal_name": "maokai"
    },
    "masteryi": {
        "name": "Master Yi",
        "file": "MasterYi",
        "champion_id": 11,
        "internal_name": "masteryi"
    },
    "missfortune": {
        "name": "Miss Fortune",
        "file": "MissFortune",
        "champion_id": 21,
        "internal_name": "missfortune"
    },
    "mordekaiser": {
        "name": "Mordekaiser",
        "file": "Mordekaiser",
        "champion_id": 82,
        "internal_name": "mordekaiser"
    },
    "morgana": {
        "name": "Morgana",
        "file": "Morgana",
        "champion_id": 25,
        "internal_name": "morgana"
    },
    "nami": {
        "name": "Nami",
        "file": "Nami",
        "champion_id": 267,
        "internal_name": "nami"
    },
    "nasus": {
        "name": "Nasus",
        "file": "Nasus",
        "champion_id": 75,
        "internal_name": "nasus"
    },
    "nautilus": {
        "name": "Nautilus",
        "file": "Nautilus",
        "champion_id": 111,
        "internal_name": "nautilus"
    },
    "nidalee": {
        "name": "Nidalee",
        "file": "Nidalee",
        "champion_id": 76,
        "internal_name": "nidalee"
    },
    "nocturne": {
        "name": "Nocturne",
        "file": "Nocturne",
        "champion_id": 56,
        "internal_name": "nocturne"
    },
    "nunu": {
        "name": "Nunu",
        "file": "Nunu",
        "champion_id": 20,
        "internal_name": "nunu"
    },
    "olaf": {
        "name": "Olaf",
        "file": "Olaf",
        "champion_id": 2,
        "internal_name": "olaf"
    },
    "orianna": {
        "name": "Orianna",
        "file": "Orianna",
        "champion_id": 61,
        "internal_name": "orianna"
    },
    "pantheon": {
        "name": "Pantheon",
        "file": "Pantheon",
        "champion_id": 80,
        "internal_name": "pantheon"
    },
    "poppy": {
        "name": "Poppy",
        "file": "Poppy",
        "champion_id": 78,
        "internal_name": "poppy"
    },
    "quinn": {
        "name": "Quinn",
        "file": "Quinn",
        "champion_id": 133,
        "internal_name": "quinn"
    },
    "rammus": {
        "name": "Rammus",
        "file": "Rammus",
        "champion_id": 33,
        "internal_name": "rammus"
    },
    "reksai": {
        "name": "Rek'Sai",
        "file": "RekSai",
        "champion_id": 421,
        "internal_name": "reksai"
    },
    "renekton": {
        "name": "Renekton",
        "file": "Renekton",
        "champion_id": 58,
        "internal_name": "renekton"
    },
    "rengar": {
        "name": "Rengar",
        "file": "Rengar",
        "champion_id": 107,
        "internal_name": "rengar"
    },
    "riven": {
        "name": "Riven",
        "file": "Riven",
        "champion_id": 92,
        "internal_name": "riven"
    },
    "rumble": {
        "name": "Rumble",
        "file": "Rumble",
        "champion_id": 68,
        "internal_name": "rumble"
    },
    "ryze": {
        "name": "Ryze",
        "file": "Ryze",
        "champion_id": 13,
        "internal_name": "ryze"
    },
    "sejuani": {
        "name": "Sejuani",
        "file": "Sejuani",
        "champion_id": 113,
        "internal_name": "sejuani"
    },
    "shaco": {
        "name": "Shaco",
        "file": "Shaco",
        "champion_id": 35,
        "internal_name": "shaco"
    },
    "shen": {
        "name": "Shen",
        "file": "Shen",
        "champion_id": 98,
        "internal_name": "shen"
    },
    "shyvana": {
        "name": "Shyvana",
        "file": "Shyvana",
        "champion_id": 102,
        "internal_name": "shyvana"
    },
    "singed": {
        "name": "Singed",
        "file": "Singed",
        "champion_id": 27,
        "internal_name": "singed"
    },
    "sion": {
        "name": "Sion",
        "file": "Sion",
        "champion_id": 14,
        "internal_name": "sion"
    },
    "sivir": {
        "name": "Sivir",
        "file": "Sivir",
        "champion_id": 15,
        "internal_name": "sivir"
    },
    "skarner": {
        "name": "Skarner",
        "file": "Skarner",
        "champion_id": 72,
        "internal_name": "skarner"
    },
    "sona": {
        "name": "Sona",
        "file": "Sona",
        "champion_id": 37,
        "internal_name": "sona"
    },
    "soraka": {
        "name": "Soraka",
        "file": "Soraka",
        "champion_id": 16,
        "internal_name": "soraka"
    },
    "swain": {
        "name": "Swain",
        "file": "Swain",
        "champion_id": 50,
        "internal_name": "swain"
    },
    "syndra": {
        "name": "Syndra",
        "file": "Syndra",
        "champion_id": 134,
        "internal_name": "syndra"
    },
    "tahmkench": {
        "name": "Tahm Kench",
        "file": "TahmKench",
        "champion_id": 223,
        "internal_name": "tahmkench"
    },
    "taliyah": {
        "name": "Taliyah",
        "file": "Taliyah",
        "champion_id": 163,
        "internal_name": "taliyah"
    },
    "talon": {
        "name": "Talon",
        "file": "Talon",
        "champion_id": 91,
        "internal_name": "talon"
    },
    "taric": {
        "name": "Taric",
        "file": "Taric",
        "champion_id": 44,
        "internal_name": "taric"
    },
    "teemo": {
        "name": "Teemo",
        "file": "Teemo",
        "champion_id": 17,
        "internal_name": "teemo"
    },
    "thresh": {
        "name": "Thresh",
        "file": "Thresh",
        "champion_id": 412,
        "internal_name": "thresh"
    },
    "tristana": {
        "name": "Tristana",
        "file": "Tristana",
        "champion_id": 18,
        "internal_name": "tristana"
    },
    "trundle": {
        "name": "Trundle",
        "file": "Trundle",
        "champion_id": 48,
        "internal_name": "trundle"
    },
    "tryndamere": {
        "name": "Tryndamere",
        "file": "Tryndamere",
        "champion_id": 23,
        "internal_name": "tryndamere"
    },
    "twistedfate": {
        "name": "Twisted Fate",
        "file": "TwistedFate",
        "champion_id": 4,
        "internal_name": "twistedfate"
    },
    "twitch": {
        "name": "Twitch",
        "file": "Twitch",
        "champion_id": 29,
        "internal_name": "twitch"
    },
    "udyr": {
        "name": "Udyr",
        "file": "Udyr",
        "champion_id": 77,
        "internal_name": "udyr"
    },
    "urgot": {
        "name": "Urgot",
        "file": "Urgot",
        "champion_id": 6,
        "internal_name": "urgot"
    },
    "varus": {
        "name": "Varus",
        "file": "Varus",
        "champion_id": 110,
        "internal_name": "varus"
    },
    "vayne": {
        "name": "Vayne",
        "file": "Vayne",
        "champion_id": 67,
        "internal_name": "vayne"
    },
    "veigar": {
        "name": "Veigar",
        "file": "Veigar",
        "champion_id": 45,
        "internal_name": "veigar"
    },
    "velkoz": {
        "name": "Vel'Koz",
        "file": "Velkoz",
        "champion_id": 161,
        "internal_name": "velkoz"
    },
    "vi": {
        "name": "Vi",
        "file": "Vi",
        "champion_id": 254,
        "internal_name": "vi"
    },
    "viktor": {
        "name": "Viktor",
        "file": "Viktor",
        "champion_id": 112,
        "internal_name": "viktor"
    },
    "vladimir": {
        "name": "Vladimir",
        "file": "Vladimir",
        "champion_id": 8,
        "internal_name": "vladimir"
    },
    "volibear": {
        "name": "Volibear",
        "file": "Volibear",
        "champion_id": 106,
        "internal_name": "volibear"
    },
    "warwick": {
        "name": "Warwick",
        "file": "Warwick",
        "champion_id": 19,
        "internal_name": "warwick"
    },
    "monkeyking": {
        "name": "Wukong",
        "file": "MonkeyKing",
        "champion_id": 62,
        "internal_name": "wukong"
    },
    "xerath": {
        "name": "Xerath",
        "file": "Xerath",
        "champion_id": 101,
        "internal_name": "xerath"
    },
    "xinzhao": {
        "name": "Xin Zhao",
        "file": "XinZhao",
        "champion_id": 5,
        "internal_name": "xinzhao"
    },
    "yasuo": {
        "name": "Yasuo",
        "file": "Yasuo",
        "champion_id": 157,
        "internal_name": "yasuo"
    },
    "yorick": {
        "name": "Yorick",
        "file": "Yorick",
        "champion_id": 83,
        "internal_name": "yorick"
    },
    "zac": {
        "name": "Zac",
        "file": "Zac",
        "champion_id": 154,
        "internal_name": "zac"
    },
    "zed": {
        "name": "Zed",
        "file": "Zed",
        "champion_id": 238,
        "internal_name": "zed"
    },
    "ziggs": {
        "name": "Ziggs",
        "file": "Ziggs",
        "champion_id": 115,
        "internal_name": "ziggs"
    },
    "zilean": {
        "name": "Zilean",
        "file": "Zilean",
        "champion_id": 26,
        "internal_name": "zilean"
    },
    "zyra": {
        "name": "Zyra",
        "file": "Zyra",
        "champion_id": 143,
        "internal_name": "zyra"
    },
    "Camille": {
        "name": "Camille",
        "file": "Camille",
        "champion_id": 164,
        "internal_name": "camille"
    },
    "Ivern": {
        "name": "Ivern",
        "file": "Ivern",
        "champion_id": 427,
        "internal_name": "ivern"
    }


};

var summonerSpells = {
    "SummonerBoost": {
        "id": 1,
        "description": "Elimina todas las debilitaciones y efectos de hechizos de invocador que afectan al campeón y reduce en un 65% la duración de las debilitaciones recibidas durante 3 segundos.",
        "name": "Limpiar",
        "key": "SummonerBoost",
        "summonerLevel": 6
    },
    "SummonerTeleport": {
        "id": 12,
        "description": "Después de 3,5 segundos de preparación, teleporta a tu campeón al súbdito, estructura o guardián aliados que hayas escogido.",
        "name": "Teleportar",
        "key": "SummonerTeleport",
        "summonerLevel": 6
    },
    "SummonerPoroRecall": {
        "id": 30,
        "description": "Viaja rápidamente al lado del Rey Poro.",
        "name": "¡Al Rey!",
        "key": "SummonerPoroRecall",
        "summonerLevel": 1
    },
    "SummonerDot": {
        "id": 14,
        "description": "Hace arder a un campeón enemigo durante 5 segundos, infligiéndole 70-410 (según el nivel del campeón) de daño verdadero, garantiza la visión del objetivo y reduce los efectos de curación que éste reciba.",
        "name": "Prender",
        "key": "SummonerDot",
        "summonerLevel": 10
    },
    "SummonerHaste": {
        "id": 6,
        "description": "Tu campeón puede moverse entre unidades y tiene un 27% más de Velocidad de movimiento durante 10 segundos.",
        "name": "Fantasmal",
        "key": "SummonerHaste",
        "summonerLevel": 1
    },
    "SummonerSnowball": {
        "id": 32,
        "description": "Lanza una bola de nieve en línea recta hacia tus enemigos. Si alcanzas a uno queda marcado y a continuación tu campeón puede desplazarse con rapidez hasta él.",
        "name": "Marca",
        "key": "SummonerSnowball",
        "summonerLevel": 1
    },
    "SummonerHeal": {
        "id": 7,
        "description": "Restaura 90-345 de Vida (según el nivel del campeón) y otorga un 30% de Velocidad de Movimiento adicional durante 1 segundo tanto a ti como al campeón aliado seleccionado. El efecto de curación se reduce a la mitad en el caso de unidades beneficiadas recientemente por este hechizo de Invocador.",
        "name": "Curar",
        "key": "SummonerHeal",
        "summonerLevel": 1
    },
    "SummonerSmite": {
        "id": 11,
        "description": "Causa entre 390 y 1000 de daño verdadero (dependiendo del nivel del campeón) a monstruos épicos o gigantes o súbditos enemigos.",
        "name": "Aplastar",
        "key": "SummonerSmite",
        "summonerLevel": 10
    },
    "SummonerExhaust": {
        "id": 3,
        "description": "Extenúa al campeón enemigo objetivo, reduciéndole un 30% de su Velocidad de Movimiento y Velocidad de Ataque, la Armadura y la Resistencia Mágica por 10 y un 40% de su capacidad total de daño durante 2,5 segundos.",
        "name": "Extenuación",
        "key": "SummonerExhaust",
        "summonerLevel": 4
    },
    "SummonerPoroThrow": {
        "id": 31,
        "description": "Lanza un poro a los enemigos. Si aciertas, a continuación puedes viajar rápidamente al objetivo.",
        "name": "Porolanzamiento",
        "key": "SummonerPoroThrow",
        "summonerLevel": 1
    },
    "SummonerMana": {
        "id": 13,
        "description": "Restaura el 40% del Maná máximo a tu campeón. También restaura a los aliados el 40% de su Maná máximo.",
        "name": "Claridad",
        "key": "SummonerMana",
        "summonerLevel": 1
    },
    "SummonerClairvoyance": {
        "id": 2,
        "description": "Muestra a tu equipo una pequeña zona del mapa durante 5 segundos.",
        "name": "Clarividente",
        "key": "SummonerClairvoyance",
        "summonerLevel": 8
    },
    "SummonerBarrier": {
        "id": 21,
        "description": "Protege a tu campeón, absorbiendo 115-455 de Daño (según el nivel del campeón) durante 2 segundos.",
        "name": "Barrera",
        "key": "SummonerBarrier",
        "summonerLevel": 4
    },
    "SummonerFlash": {
        "id": 4,
        "description": "Teleporta a tu campeón una corta distancia hacia la posición del cursor.",
        "name": "Destello",
        "key": "SummonerFlash",
        "summonerLevel": 8
    },
    "SummonerOdinGarrison": {
        "id": 17,
        "description": "Torreta aliada: concede una gran Regeneración durante 8 segundos. Torreta enemiga: reduce el Daño que inflige en un 80% durante 8 segundos.",
        "name": "Guarnición",
        "key": "SummonerOdinGarrison",
        "summonerLevel": 1
    }
};
