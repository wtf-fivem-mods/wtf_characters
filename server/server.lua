RegisterNetEvent("wtf_characters:getSteamID")
AddEventHandler(
    "wtf_characters:getSteamID",
    function()
        local steamID = nil
        local source = source
        local identifiers = GetPlayerIdentifiers(source)

        for _, v in pairs(identifiers) do
            if string.find(v, "steam") then
                steamID = v
                break
            end
        end

        TriggerClientEvent("wtf_characters:receiveSteamID", source, steamID)
    end
)

local registeredEvents = {}
RegisterNetEvent("wtf_characters:registerEvent")
AddEventHandler(
    "wtf_characters:registerEvent",
    function(uid, event)
        local source = source
        if registeredEvents[event] == nil then
            registeredEvents[event] = {}
        end
        registeredEvents[event][uid] = source
    end
)

RegisterNetEvent("wtf_characters:forwardEvent")
AddEventHandler(
    "wtf_characters:forwardEvent",
    function(uid, event, data)
        local eventUids = registeredEvents[event]
        if eventUids == nil then
            return
        end
        local playerServerId = eventUids[uid]
        if playerServerId ~= nil then
            TriggerClientEvent("wtf_characters:receiveEvent", playerServerId, event, data)
        end
    end
)
