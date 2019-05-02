local character = {}

function character:new(o)
    setmetatable(o, self)
    self.__index = self
    return o
end

function GetCharacter(uid)
    local rawCharacter = DB.GetCharacter(uid)
    if rawCharacter == nil then
        return nil
    end
    local obj = json.decode(rawCharacter)
    return character:new(obj)
end

function GetCharacters(steamID)
    local rawCharacters = DB.GetCharacters(steamID)
    if next(rawCharacters) == nil then
        return nil
    end
    local characters = {}
    for _, v in pairs(rawCharacters) do
        local obj = json.decode(v)
        local c = character:new(obj)
        table.insert(characters, c)
    end
    return characters
end

function SaveCharacter(data)
    local uid = DB.GenerateUID() + Config.IDOffset
    local c = DB.SaveCharacter(data.steamID, uid, data.firstName, data.lastName)
    return c
end
