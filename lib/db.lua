DB = {}
local keyRoot = "wtf_characters"

local function key(id, ...)
    local args = {...}
    local s = args[1]
    for i=2, #args do
        s = s .. ':' .. args[i]
    end
    return string.format("%s:%s:%s", keyRoot, id, s)
end

function DB.HasUsers(steamid)
    local res = Redis.exists(key(steamid))
    return res
end

function DB.GetUser(steamid)
    local res, err = Redis.get(key(steamid))
    return res, err
end