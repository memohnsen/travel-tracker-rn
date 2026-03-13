func isEarned(_ badge: Badge) -> Bool {
    switch badge.id {
    case "fifty_percent":
        return visitedStates.count >= 25
    case "all_states":
        return visitedStates.count == 50
    case "continental":
        let nonContinental = Set(["HI", "AK"])
        let continentalStates = Set(states.map { $0.id }).subtracting(nonContinental)
        return continentalStates.isSubset(of: visitedStates)
    case "east_coast":
        let eastCoastStates = ["ME", "NH", "MA", "RI", "CT", "NY", "NJ", "PA", "DE", "MD", "VA", "NC", "SC", "GA", "FL"]
        return Set(eastCoastStates).isSubset(of: visitedStates)
    case "west_coast":
        let westCoastStates = ["CA", "OR", "WA", "AK"]
        return Set(westCoastStates).isSubset(of: visitedStates)
    case "gulf_coast":
        let gulfStates = ["FL", "AL", "MS", "LA", "TX"]
        return Set(gulfStates).isSubset(of: visitedStates)
    case "great_lakes":
        let greatLakesStates = ["MN", "WI", "IL", "IN", "MI", "OH", "PA", "NY"]
        return Set(greatLakesStates).isSubset(of: visitedStates)
    case "midwest":
        let midwestStates = ["ND", "SD", "NE", "KS", "MN", "IA", "MO", "WI", "IL", "IN", "MI", "OH"]
        return Set(midwestStates).isSubset(of: visitedStates)
    case "new_england":
        let newEnglandStates = ["ME", "NH", "VT", "MA", "RI", "CT"]
        return Set(newEnglandStates).isSubset(of: visitedStates)
    case "mountain":
        let mountainStates = ["MT", "ID", "WY", "NV", "UT", "CO", "AZ", "NM"]
        return Set(mountainStates).isSubset(of: visitedStates)
    case "southwest":
        let southwestStates = ["AZ", "NM", "TX", "OK"]
        return Set(southwestStates).isSubset(of: visitedStates)
    case "south":
        let southernStates = ["AR", "LA", "MS", "AL", "GA", "SC", "NC", "TN", "KY", "VA", "WV"]
        return Set(southernStates).isSubset(of: visitedStates)
    case "four_corners":
        let cornerStates = ["UT", "CO", "AZ", "NM"]
        return Set(cornerStates).isSubset(of: visitedStates)
    case "hawaii_alaska":
        return visitedStates.contains("HI") && visitedStates.contains("AK")
    default:
        return false
    }
}