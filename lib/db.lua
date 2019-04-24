DB = {}
local keyRoot = "wtf_characters"

local function key(id, ...)
    local s = ""
    local args = {...}
    if #args > 0 then
        s = ":"..args[1]
        for i=2, #args do
            s = s ..":".. args[i]
        end
    end
    return keyRoot..":"..id..s
end

function DB.GetCharacter(steamID, idx)
    return Redis.lindex(key(steamID), idx)
end

function DB.GetCharacters(steamID)
    return Redis.lrange(key(steamID), 0, -1)
end

function DB.SaveCharacter(steamID, firstName, lastName)
    local obj = { firstName = firstName, lastName = lastName }
    local id = Redis.rpush(key(steamID), json.encode(obj))
    obj.id = id - 1
    return obj
end