DB = {}

local key = Redis.makeKeyFn("wtf_characters")

function DB.GenerateUID()
    local uid = Redis.incr(key("idg"))
    assert(type(uid) == "number", "id was not number")
    return uid
end

function DB.GetCharacter(steamID, uid)
    return Redis.hget(key(steamID), uid)
end

function DB.GetCharacters(steamID)
    return Redis.hgetall(key(steamID))
end

function DB.SaveCharacter(steamID, uid, firstName, lastName)
    local obj = {uid = uid, firstName = firstName, lastName = lastName}
    local ret = Redis.hset(key(steamID), uid, json.encode(obj))
    assert(ret == 1, "saved character in existing slot!")
    return obj
end
