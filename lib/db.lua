DB = {}

local key = Redis.makeKeyFn("wtf_characters")

function DB.GenerateUID()
    local uid = Redis.incr(key("idg"))
    return uid
end

function DB.GetCharacter(uid)
    return Redis.hget(key("byid"), uid)
end

function DB.GetCharacters(steamID)
    local ids = Redis.lrange(key(steamID), 0, -1)
    return Redis.hmget(key("byid"), table.unpack(ids))
end

function DB.SaveCharacter(steamID, uid, firstName, lastName)
    local obj = {uid = uid, firstName = firstName, lastName = lastName}
    local json = json.encode(obj)
    Redis.multi({pipeline = false})
    Redis.rpush(key(steamID), uid)
    Redis.hsetnx(key("byid"), uid, json)
    local res = Redis.exec()
    assert(res[1][2] == 1, "attempted to overwrite user!")
    return obj
end
