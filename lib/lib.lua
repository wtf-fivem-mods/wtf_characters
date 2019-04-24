local character = {}

function character:new(o)
    setmetatable(o, self)
    self.__index = self
    return o
end

function GetCharacter(data)
    local rawCharacter = DB.GetCharacter(data.steamID, data.id)
    if rawCharacter == nil then
        return nil
    end
    local obj = json.decode(rawCharacter)
    obj.id = data.id
    return character:new(obj)
end

function GetCharacters(steamID)
    local rawCharacters = DB.GetCharacters(steamID)
    if #rawCharacters == 0 then
        return nil
    end
    local characters = {}
    for i, v in ipairs(rawCharacters) do
        local obj = json.decode(v)
        obj.id = i - 1 -- js/redis is 0 index
        local c = character:new(obj)
        table.insert(characters, c)
    end
    return characters
end

function SaveCharacter(data)
    return DB.SaveCharacter(data.steamID, data.firstName, data.lastName)
end