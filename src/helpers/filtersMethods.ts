import filters from "./filters"

type methodOptions = "include" | "exclude" | "match" | "greaterThanEqual" | "greaterThan" | "lessThanEqual" | "lessThan" | "equals" | "not-equals" | "maxRange" | "minRange" | "boolean";

export function possibleFilterMethods(keyType:any):Array<any>{
    if(keyType === "string"){
        let methods = ["include","exclude","match"]
        return methods
    };
    if(keyType === "number"){
        let methods = ["greaterThanEqual","greaterThan","lessThanEqual","lessThan","equals","not-equals","include","exclude","maxRange","minRange"]
        return methods
    };
    if(keyType === "boolean"){
        let methods = ["boolean"]
        return methods
    };

    return []
};

export function useFilterMethod(method:methodOptions, data: Array<{[key:string]:any}>, searchTerm:string, searchKey: string){
    let parameters = {
        Key: searchKey,
        searchTerm: searchTerm}
    switch(method){
        case "include":
            return data = data.filter(filters.includeFilter,parameters)
        case "exclude":
            return data = data.filter(filters.excludeFilter,parameters)
        case "match":
            return data = data.filter(filters.matchFilter, parameters)
        case "greaterThanEqual":
            return data = data.filter(filters.greaterThanEqualsFilter, parameters)
        case "greaterThan":
            return data = data.filter(filters.greaterThanFilter, parameters)
        case "lessThanEqual":
            return data = data.filter(filters.lessThanEqualFilter, parameters)
        case "lessThan":
            return data = data.filter(filters.lessThanFilter, parameters)
        case "equals":
            return data = data.filter(filters.equalsFilter, parameters)
        case "not-equals":
            return data = data.filter(filters.notEqualsFilter, parameters)
        case "maxRange":
            return data
        case "minRange":
            return data
        case "boolean":
            return data
        default:
            return data
    };
};

export type {methodOptions}

