WTF = WTF or {}
local character = nil

function WTF.GetCharacter()
    return character
end

function WTF.WaitForCharacter()
    local c = WTF.GetCharacter()
    if c ~= nil then
        return c
    end
    local p = promise.new()
    TriggerEvent(
        "wtf_characters:getCharacter",
        function(c1)
            p:resolve(c1)
        end
    )
    return Citizen.Await(p)
end

AddEventHandler(
    "wtf_characters:receiveCharacter",
    function(c)
        character = c
    end
)
