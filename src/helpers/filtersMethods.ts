export function possibleFilterMethods(keyType:any):Array<any>{
    if(keyType === "string"){
        let methods = ["include", "exclude", "match"]
        return methods
    };
    if(keyType === "number"){
        let methods = ["greaterThanEqual", "greaterThan", "lessThanEqual", "lessThan", "equals", "not-equals", "include", "exclude", "maxRange", "minRange"]
        return methods
    };
    if(keyType === "boolean"){
        let methods = ["boolean"]
        return methods
    };

    return []
};

export function useFilterMethod(method:string){
    switch(method){
        case "include":
            return
        case "exclude":
            return
        case "match":
            return
        case "greaterThanEqual":
            return
        case "greaterThan":
            return
        case "lessThanEqual":
            return
        case "lessThan":
            return
        case "equals":
            return
        case "not-equals":
            return
        case "maxRange":
            return
        case "minRange":
            return
        case "boolean":
            return
    };
};