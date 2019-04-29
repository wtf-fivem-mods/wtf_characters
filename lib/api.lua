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

local characterSelectCbs = {}
function WTF.OnCharacterSelect(cb)
    table.insert(characterSelectCbs, cb)
end

AddEventHandler(
    "wtf_characters:receiveCharacter",
    function(c)
        character = c
        for _, cb in ipairs(characterSelectCbs) do
            cb(c)
        end
    end
)

-- TODO: clear if player changes and remove on server
local characterEventCbs = {}
function WTF.RegisterCharacterEvent(event, cb)
    if characterEventCbs[event] == nil then
        characterEventCbs[event] = {}
    end
    table.insert(characterEventCbs[event], cb)
    TriggerServerEvent("wtf_characters:registerEvent", character.uid, event)
end

RegisterNetEvent("wtf_characters:receiveEvent")
AddEventHandler(
    "wtf_characters:receiveEvent",
    function(event, data)
        local cbs = characterEventCbs[event]
        if cbs == nil then
            return
        end
        for _, cb in pairs(cbs) do
            cb(data)
        end
    end
)

function WTF.TriggerCharacterEvent(uid, event, data)
    TriggerServerEvent("wtf_characters:forwardEvent", uid, event, data)
end
