local user = {}

function user:new(o)
    setmetatable(o, self)
    self.__index = self
    return o
end

function HasUsers(steamid)
    local res = DB.HasUsers(steamid)
    return res == 1 and true or false
end

function UserFromDB(steamid)
    local res, err = DB.GetUser(steamid)
    assert(err ~= nil, string.format("could not find user: %s, %s", steamid, key))
    local obj = json.decode(res)
    return user:new(obj)
end