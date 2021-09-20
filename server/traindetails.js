module.exports = {
    TRAIN_DETAILS: [
        {
            TRAIN_NAME: "Victor",
            STATION_DEPARTURES: [
                {
                    STATION: "Broklehurst",
                    TIMES: [ {h: 10, m: 0}, {h: 11, m: 0}, {h: 12, m: 0}, {h: 13, m: 0}, {h: 14, m: 0}, {h: 15, m: 0}, {h:16, m: 0}],
                    DURATION: {h: 0, m: 20},
                    DESTINATION: "Ivelhurst"
                },
                {
                    STATION: "Ivelhurst",
                    TIMES: [ {h: 10, m: 30}, {h: 11, m: 30}, {h: 12, m: 30}, {h: 13, m: 30}, {h: 14, m: 30}, {h: 15, m: 30}, {h:16, m: 30}],
                    DURATION: {h: 0, m: 20},
                    DESTINATION: "Broklehurst"
                }
            ]
        },
        {
            TRAIN_NAME: "Nancy",
            STATION_DEPARTURES: [
                {
                    STATION: "Broklehurst",
                    TIMES: [ {h: 10, m: 30}, {h: 11, m: 30}, {h: 12, m: 30}, {h: 13, m: 30}, {h: 14, m: 30}, {h: 15, m: 30}, {h:16, m: 30}],
                    DURATION: {h: 0, m: 20},
                    DESTINATION: "Ivelhurst"
                },
                {
                    STATION: "Ivelhurst",
                    TIMES: [ {h: 11, m: 0}, {h: 12, m: 0}, {h: 13, m: 0}, {h: 14, m: 0}, {h: 15, m: 0}, {h:16, m: 0}, {h: 17, m: 0}],
                    DURATION: {h: 0, m: 20},
                    DESTINATION: "Broklehurst"
                }
            ]
        }
    ]
}