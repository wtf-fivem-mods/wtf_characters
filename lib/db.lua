DB = {}

local key = Redis.makeKeyFn("wtf_characters")

function DB.GetCharacter(steamID, idx)
    return Redis.lindex(key(steamID), idx)
end

function DB.GetCharacters(steamID)
    return Redis.lrange(key(steamID), 0, -1)
end

function DB.SaveCharacter(steamID, firstName, lastName)
    local obj = { firstName = firstName, lastName = lastName }
    local idx = Redis.rpush(key(steamID), json.encode(obj))
    obj.idx = idx - 1
    return obj
end